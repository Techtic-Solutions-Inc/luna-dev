import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { readFileSync, existsSync } from 'node:fs';

const HOME_JSON = path.resolve(__dirname, 'public/api/visitor/home.json');

function visitorHomeApi(): Plugin {
  const serve = (req: { url?: string; method?: string }, res: { setHeader: (k: string, v: string) => void; end: (b: string) => void }, next: () => void) => {
    const url = req.url?.split('?')[0];
    if (req.method === 'GET' && (url === '/api/visitor/home' || url === '/api/visitor/home/')) {
      const file = existsSync(HOME_JSON) ? HOME_JSON : path.resolve(__dirname, 'public/api/visitor/home');
      const body = existsSync(file) ? readFileSync(file, 'utf8') : '{}';
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      res.end(body);
      return;
    }
    next();
  };

  return {
    name: 'visitor-home-api',
    configureServer(server) {
      server.middlewares.use(serve);
    },
    configurePreviewServer(server) {
      server.middlewares.use(serve);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiTarget = env.VITE_API_BASE_URL || 'http://localhost:8001';

  return {
    plugins: [react(), visitorHomeApi()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 5173,
      proxy: {
        '/auth': {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 4173,
    },
  };
});
