import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(process.env.VITE_VERCEL_ENV), // Vercel environment variable
      'process.env.VITE_CLOUDINARY_CLOUD_NAME': JSON.stringify(process.env.VITE_CLOUDINARY_CLOUD_NAME),
      'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
    },
  };
});
