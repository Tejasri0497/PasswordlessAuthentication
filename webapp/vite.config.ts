import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


// https://vitejs.dev/config/
export default defineConfig({
  // ...(process.env.NODE_ENV === 'development'
  //   ? {
  //     define: {
  //       global: {},
  //     },
  //   }
  //   : {}),
  plugins: [react()],
  server: {
    port: 8080
  },
  preview: {
    port: 8080
  },
})



