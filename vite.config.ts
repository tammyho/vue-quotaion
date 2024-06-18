import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // 允许IP访问
    host: "localhost",
    // 应用端口 (默认:3000)
    port: Number(env.VITE_APP_PORT),
    // 运行是否自动打开浏览器
    open: true,
    proxy: {
      
      /** 代理前缀为 /dev-api 的请求  */
      [env.VITE_APP_BASE_API]: {
        changeOrigin: true,
        // 接口地址
        target: env.VITE_APP_API_URL,
        rewrite: (path) =>
          path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
          secure: true,
      },
      '^/SysUser': {
        changeOrigin: true,
        // 接口地址
        target: "https://localhost:44314/",
          secure: true,
      },
    },
  },
}
})
