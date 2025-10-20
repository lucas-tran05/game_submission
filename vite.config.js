import { defineConfig } from 'vite'

export default defineConfig({
  root: 'game_app',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: true
  }
  // Vite tự động load các biến môi trường có prefix VITE_ từ file .env
})
