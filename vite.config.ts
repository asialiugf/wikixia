import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import unocss from 'unocss/vite';

export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, `.env.${configEnv.mode}`);

  const isVercel = viteEnv.VITE_IS_VERCEL === '1';

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      unocss({ include: ['src/App.vue'] }),
      dts({
        include: ['./src/index.ts', './src/index.vue'],
        beforeWriteFile(filePath, content) {
          return {
            filePath: filePath.replace('/dist/src/', '/dist/'),
            content
          };
        }
      })
    ],
    optimizeDeps: {
      exclude: ['vue-demi']
    },
    build: isVercel
      ? {
          brotliSize: false
        }
      : {
          lib: {
            entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
            name: 'wikixiaAdminLayout',
            fileName: 'index'
          },
          rollupOptions: {
            external: ['vue'],
            output: {
              globals: {
                vue: 'Vue'
              }
            }
          }
        }
  };
});
