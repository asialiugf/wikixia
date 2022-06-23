import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import { resolve } from 'path';

export default {
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    // vue({ script: { refSugar: true } }),
    vue({ reactivityTransform: resolve(__dirname, 'src') }),
    vueJsx(),
    unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()]
    }),
    dts({
      include: ['./src/index.ts', './src/index.vue'],
      beforeWriteFile(filePath, content) {
        return {
          filePath: filePath.replace('/dist/src/', '/dist/'),
          content
        };
      }
    })
  ]
};
