import {defineConfig, Plugin} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';


import {vitePluginIconSvg} from './src/components/IconSvg/plugin';


// https://vitejs.dev/config/
export default defineConfig(({mode, command}) => {

  const plugins: (Plugin | Plugin[])[] = [
    vue(),
    vitePluginIconSvg()
  ]

  return {
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      },
    },
    // server: {
    //   host: true,
    //   port:9528,
    // },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true
        }
      }
    }
  }
})
