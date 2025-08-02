import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    server: {
        port: 5173,
        proxy: {
            '/Activity': {
                target: 'https://localhost:7050',
                changeOrigin: true,
                secure: false
            }
        }
    }
});
