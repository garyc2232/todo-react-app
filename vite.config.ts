import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // @ts-ignore
  test: {
    environment: 'jsdom',
    globals: true,
    threads: false,
    watch: true,
    // include: ['src/**/*.{js,tsx,ts}'],
    setupFiles: './tests/setup.ts',
  },
});
