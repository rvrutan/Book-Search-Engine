import { defineConfig, loadEnv } from 'vite'
 import react from '@vitejs/plugin-react'
 
 // https://vitejs.dev/config/
 
 export default ({ mode }) => {
   process.env = {...process.env, ...loadEnv(mode, process.cwd())};
 
 return defineConfig({
   plugins: [react()],
   server: {
     allowedHosts: ["library-6iwq.onrender.com"],
     port: process.env.PORT || 3000,
     open: true,
     proxy: {
       '/graphql': {
         target: 'http://localhost:3001',
         secure: false,
         changeOrigin: true
       }
     }
   }
 })}