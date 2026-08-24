import { defineConfig, type Plugin, type PreviewServer, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const HOME_PAYLOAD = {
  headings: [
    'Built For Agents Like You.',
    "Here's the deal… Great Marketing is Just the Start.",
    'Hundreds',
    'Marketing that stops the scroll',
    'A custom business dashboard and a personalized AI advisor built into every plan.',
    'Stunning marketing',
    'in three simple steps',
    'Hand-designed by our creative team. Personalized by AI to your market. Ready to post in minutes.',
    'New agents, team leaders, and large brokerages are using Agentwise to spend less time marketing and more time closing without sacrificing quality.',
  ],
  links: [
    { label: 'About', href: '/about' },
    { label: 'Content', href: '/content' },
    { label: 'Blog', href: '/blog' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Learn More', href: '/learn-more' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Get Started', href: '/signup' },
    { label: 'Log in', href: '/signin' },
    { label: 'Join', href: '/signup' },
  ],
  marketing: [
    {
      title: 'Stunning marketing, in three simple steps',
      description: 'Browse the continuously updated collection.',
      image: '/assets/figma/frame-2147227816-2270-14191.png',
    },
  ],
};

function visitorHomeHandler(
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: Error) => void,
) {
  const url = req.url?.split('?')[0] ?? '';
  if (req.method === 'GET' && url === '/api/visitor/home') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.statusCode = 200;
    res.end(JSON.stringify(HOME_PAYLOAD));
    return;
  }
  next();
}

function visitorHomeMock(): Plugin {
  const attach = (server: ViteDevServer | PreviewServer) => {
    server.middlewares.use(visitorHomeHandler);
  };

  return {
    name: 'visitor-home-mock',
    enforce: 'pre',
    configureServer: attach,
    configurePreviewServer: attach,
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist/api/visitor');
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(
        path.join(outDir, 'home'),
        JSON.stringify(HOME_PAYLOAD, null, 2),
        'utf-8',
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), visitorHomeMock()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    strictPort: true,
  },
  preview: {
    port: 4173,
    host: true,
    strictPort: true,
  },
});
