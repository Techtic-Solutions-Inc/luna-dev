import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// Local ESM plugin; types live beside the implementation in this repo.
// @ts-expect-error -- .mjs plugin is loaded by Vite directly
import { agentwiseApiPlugin } from './server/agentwise-api.mjs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiBaseUrl = env.API_BASE_URL || env.VITE_API_BASE_URL || env.VITE_API_URL || '';

  return {
    plugins: [react(), agentwiseApiPlugin(8001)],
    define: {
      'process.env.API_BASE_URL': JSON.stringify(apiBaseUrl),
      'process.env.API_TOKEN': JSON.stringify(env.API_TOKEN || env.VITE_API_TOKEN || ''),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
