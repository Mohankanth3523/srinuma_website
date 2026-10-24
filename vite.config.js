import { cpSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    {
      name: 'copy-wedding-invitation',
      closeBundle() {
        cpSync(
          resolve(projectRoot, 'Manikanda_prabu_harishma'),
          resolve(projectRoot, 'dist', 'manikanda_prabu_harishma'),
          { recursive: true },
        );
      },
    },
  ],
  build: { sourcemap: false, minify: 'esbuild', target: 'es2020' },
  server: { host: '0.0.0.0' },
});
