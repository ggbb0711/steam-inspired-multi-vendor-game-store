import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import http from "https";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:3000,
    host:true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080/',
    //     changeOrigin: true,
    //     secure: false,
    //     // agent: new http.Agent(),
    //     ws:true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   },
    // }
  }
})
