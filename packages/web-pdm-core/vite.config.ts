import { defineConfig } from 'vite';
import packageJson from './package.json';

const external = new Set([
  ...Object.keys(packageJson.dependencies ?? {}),
  'react',
  'react-dom',
]);

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      cssFileName: 'style',
    },
    rollupOptions: {
      external: (id) =>
        external.has(id) ||
        [...external].some((dep) => id.startsWith(`${dep}/`)),
    },
    sourcemap: true,
  },
});
