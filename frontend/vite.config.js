import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration to define environment variables and plugins
export default defineConfig({
  plugins: [react()],
  define: {
    // Define your environment variables for the frontend code
    'process.env.VITE_CLOUDINARY_CLOUD_NAME': JSON.stringify(process.env.VITE_CLOUDINARY_CLOUD_NAME),
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
});
