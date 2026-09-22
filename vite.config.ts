import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves this repository from /flores/.
  base: '/flores/',
  plugins: [react()],
})
