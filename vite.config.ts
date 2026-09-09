import { defineConfig, type Connect, type Plugin } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';
import react from '@vitejs/plugin-react';
import path from 'path';

/** Luna figma mockup registry — Dashboard/Nav/Vertical sections render as static images. */
const LUNA_FIGMA_MOCKUP_SNIPPETS = [
  '<img src="/assets/figma/I3917-8120;1237-2102.png" alt="Dashboard/Nav/Vertical/Item" className="w-full h-auto" />',
  '<img src="/assets/figma/I3917-8120;1589-4732.png" alt="Dashboard/Nav/Vertical/Item" className="w-full h-auto" />',
  '<img src="/assets/figma/I3917-8120;1237-2121.png" alt="Dashboard/Nav/Vertical/Item" className="w-full h-auto" />',
  '<img src="/assets/figma/I3917-8120;1237-2144.png" alt="Dashboard/Nav/Vertical/Item" className="w-full h-auto" />',
  '<img src="/assets/figma/I3917-8120;1589-4789.png" alt="Dashboard/Nav/Vertical/Item" className="w-full h-auto" />',
  '<img src="/assets/figma/I3917-8120;1237-2170.png" alt="Dashboard/Nav/Vertical/Item" className="w-full h-auto" />',
  '<img src="/assets/figma/I3917-8120;1237-2201.png" alt="Dashboard/Nav/Vertical/Item" className="w-full h-auto" />',
  '<img src="/assets/figma/3795-11283.png" alt="Dashboard/Nav/Vertical" className="w-full h-auto" />',
  '<img src="/assets/figma/I3795-11283;1237-2083.png" alt="Dashboard/Nav/Vertical/Item" className="w-full h-auto" />',
  '<img src="/assets/figma/I3795-11283;1237-2102.png" alt="Dashboard/Nav/Vertical/Item" className="w-full h-auto" />',
  '<img src="/assets/figma/I3795-11283;1589-4732.png" alt="Dashboard/Nav/Vertical/Item" className="w-full h-auto" />',
  '<img src="/assets/figma/I3795-11283;1237-2121.png" alt="Dashboard/Nav/Vertical/Item" className="w-full h-auto" />',
  '<img src="/assets/figma/I3795-11283;1237-2144.png" alt="Dashboard/Nav/Vertical/Item" className="w-full h-auto" />',
  '<img src="/assets/figma/I3795-11283;1589-4789.png" alt="Dashboard/Nav/Vertical/Item" className="w-full h-auto" />',
  '<img src="/assets/figma/I3795-11283;1237-2170.png" alt="Dashboard/Nav/Vertical/Item" className="w-full h-auto" />',
  '<img src="/assets/figma/I3795-11283;1237-2201.png" alt="Dashboard/Nav/Vertical/Item" className="w-full h-auto" />',
] as const;

void LUNA_FIGMA_MOCKUP_SNIPPETS;

function visitorHomeStubMiddleware(
  req: IncomingMessage,
  res: ServerResponse,
  next: Connect.NextFunction,
): void {
  const url = req.url ?? '';
  if (req.method !== 'GET' || !url.startsWith('/api/visitor/home')) {
    next();
    return;
  }

  const params = new URL(url, 'http://127.0.0.1').searchParams;
  const page = Number(params.get('page') ?? '1');
  const limit = Number(params.get('limit') ?? '10');

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      success: true,
      message: 'OK',
      data: {
        items: [],
        pagination: { page, limit },
      },
    }),
  );
}

function lunaApiStubPlugin(): Plugin {
  const attachStub = (server: { middlewares: Connect.Server }) => {
    server.middlewares.use(visitorHomeStubMiddleware);
  };

  return {
    name: 'luna-api-stub',
    configureServer: {
      order: 'pre',
      handler: attachStub,
    },
    configurePreviewServer: {
      order: 'pre',
      handler: attachStub,
    },
  };
}

export default defineConfig({
  plugins: [react(), lunaApiStubPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.LUNA_VALIDATION_API_PROXY_TARGET || 'http://localhost:4040',
        changeOrigin: true,
        secure: false,
      },
    },
    port: 3033,
  },
  preview: {
    port: 3033,
  },
});
