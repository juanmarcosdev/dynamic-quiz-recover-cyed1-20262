import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Proyecto servido en https://<usuario>.github.io/dynamic-quiz-recover-cyed1-20262/
  base: '/dynamic-quiz-recover-cyed1-20262/',
})
