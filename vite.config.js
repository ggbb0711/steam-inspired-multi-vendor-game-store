import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   'process.env.VITE_API_PORT': process.env.VITE_API_PORT,
  //   'process.env.VITE_BASE_URL':process.env.VITE_BASE_URL
  // }
})
