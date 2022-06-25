import * as path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // outDir: path.resolve(__dirname, 'ttt'),
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'editor',
      formats: ['es', 'umd'],
      fileName: format => `editor.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', /primevue\/.+/, 'ant-design-vue'],
      output: {
        // disable warning on src/index.ts using both default and named export
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    },
    emptyOutDir: false // to retain the types folder generated by tsc
  }
});