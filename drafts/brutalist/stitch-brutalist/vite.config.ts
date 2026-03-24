import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
  },
});
