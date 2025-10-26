import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Base path for GitHub Pages. Change to your repo name if different.
  base: '/projeto-linkes/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
