import {defineConfig} from 'vite';
export default defineConfig({build:{sourcemap:false,minify:'esbuild',target:'es2020'},server:{host:'0.0.0.0'}});
