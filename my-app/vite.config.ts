import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { generateTailwindThemeBlock } from './tailwind.theme.ts'

function tailwindThemeFromTokens(): Plugin {
  const themeBlock = generateTailwindThemeBlock()
  return {
    name: 'tailwind-theme-from-tokens',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('/src/index.css')) return null
      if (!code.includes('/* TAILWIND_THEME_FROM_TOKENS */')) return null
      return code.replace('/* TAILWIND_THEME_FROM_TOKENS */', themeBlock)
    },
  }
}

export default defineConfig({
  plugins: [tailwindThemeFromTokens(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
