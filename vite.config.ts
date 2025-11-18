import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // ¡Esta es la clave para GitHub Pages!
  base: '/Re-Entry-Level/',  // Nombre exacto de tu repo (case-sensitive)

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Para dev local
        changeOrigin: true,
      }
    }
  }
})