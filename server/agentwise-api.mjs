import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const HOME_SEARCH_ITEMS = [
  {
    id: 'scroll-1',
    title: 'Listing story template',
    image: '/assets/figma/home-scroll-1.png',
    caption: '',
  },
  {
    id: 'scroll-2',
    title: 'Address and showing times template',
    image: '/assets/figma/home-scroll-2.png',
    caption: '[address + times]',
  },
  {
    id: 'scroll-3',
    title: 'Lifestyle story template',
    image: '/assets/figma/home-scroll-3.png',
    caption: 'Phone’s busy, I’m doing the best I ever have',
  },
  {
    id: 'scroll-4',
    title: 'Neighborhood showing template',
    image: '/assets/figma/home-scroll-4.png',
    caption: 'Doing showings in [insert neighborhood and city]!',
  },
  {
    id: 'scroll-5',
    title: 'Local city guide template',
    image: '/assets/figma/home-scroll-5.png',
    caption: 'If I was moving to [City Name], here’s where I’d visit first (as a local)',
  },
  {
    id: 'scroll-6',
    title: 'Workday story template',
    image: '/assets/figma/home-scroll-6.png',
    caption: 'here’s what I’m working on today',
  },
  {
    id: 'scroll-7',
    title: 'Market insight template',
    image: '/assets/figma/home-scroll-7.png',
    caption: 'What You Need To Know',
  },
];

function applyCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
}

function sendJson(res, status, body) {
  applyCors(res);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function readJsonBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) {
        resolve({});
        return;
      }
      try {
        const parsed = JSON.parse(raw);
        resolve(parsed && typeof parsed === 'object' ? parsed : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

function stringField(body, key) {
  const value = body[key];
  return typeof value === 'string' ? value : '';
}

function resolveRoute(method, pathname, body) {
  if (method === 'GET' && pathname === '/api/visitor/home/search') {
    return {
      status: 200,
      body: {
        success: true,
        message: 'Home content loaded.',
        data: HOME_SEARCH_ITEMS,
      },
    };
  }

  if (method === 'POST' && pathname === '/api/visitor/home/subscribe') {
    return {
      status: 200,
      body: { success: true, message: 'Thanks — you are on the list.' },
    };
  }

  if (method === 'POST' && pathname === '/api/visitor/home/terms-acceptance') {
    return {
      status: 200,
      body: { success: true, message: 'Preferences saved.' },
    };
  }

  if (method === 'POST' && pathname === '/auth/login') {
    const email = stringField(body, 'email') || 'agent@agentwise.com';
    const token = 'agentwise-access-token';
    return {
      status: 200,
      body: {
        success: true,
        message: 'You are signed in.',
        data: {
          id: '1',
          name: 'Agent Wise',
          first_name: 'Agent',
          last_name: 'Wise',
          email,
          token,
          accessToken: token,
          refreshToken: 'agentwise-refresh-token',
          tokenType: 'Bearer',
        },
      },
    };
  }

  if (method === 'POST' && pathname === '/api/auth/signup') {
    return { status: 200, body: { success: true, message: 'Account created.' } };
  }

  if (method === 'POST' && pathname === '/api/auth/forgot-password') {
    return { status: 200, body: { success: true, message: 'Reset link sent.' } };
  }

  if (method === 'POST' && pathname === '/api/email/verify') {
    return { status: 200, body: { success: true, message: 'Email verified.' } };
  }

  return null;
}

async function handleAgentwiseRequest(req, res) {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const pathname = url.pathname;
  const method = (req.method ?? 'GET').toUpperCase();

  if (method === 'OPTIONS' && (pathname.startsWith('/api') || pathname === '/auth/login')) {
    applyCors(res);
    res.statusCode = 204;
    res.end();
    return true;
  }

  const needsBody = method === 'POST' || method === 'PUT' || method === 'PATCH';
  const body = needsBody ? await readJsonBody(req) : {};
  const result = resolveRoute(method, pathname, body);

  if (!result) {
    return false;
  }

  sendJson(res, result.status, result.body);
  return true;
}

export function agentwiseApiMiddleware(req, res, next) {
  void handleAgentwiseRequest(req, res).then((handled) => {
    if (!handled) {
      next();
    }
  });
}

let sidecarStarted = false;

function startSidecar(port, server) {
  if (sidecarStarted) {
    return;
  }

  sidecarStarted = true;
  const sidecar = createServer((req, res) => {
    void handleAgentwiseRequest(req, res).then((handled) => {
      if (!handled) {
        sendJson(res, 404, { success: false, message: 'Not Found' });
      }
    });
  });

  sidecar.on('error', () => {
    sidecarStarted = false;
  });

  sidecar.listen(port, '0.0.0.0');
  server?.httpServer?.once('close', () => {
    sidecar.close();
    sidecarStarted = false;
  });
}

export function agentwiseApiPlugin(port = 8001) {
  return {
    name: 'agentwise-api',
    configureServer(server) {
      server.middlewares.use(agentwiseApiMiddleware);
      startSidecar(port, server);
    },
    configurePreviewServer(server) {
      server.middlewares.use(agentwiseApiMiddleware);
      startSidecar(port, server);
    },
  };
}

const isDirectRun =
  Boolean(process.argv[1]) && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isDirectRun) {
  const port = Number(process.env.PORT || 8001);
  startSidecar(port);
}
