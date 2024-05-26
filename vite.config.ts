import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log(process.env);

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS_BASE ?? '/',
  plugins: [react()],
})
