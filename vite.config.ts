import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
// https://vite.dev/config/
  plugins: [react(),tailwindcss()],  server: {
    hmr: {
      clientPort: 5173,
      port: 5173,
      host: 'localhost',
      protocol: 'ws'
    },
    watch: {
      usePolling: true
    }
  }
})