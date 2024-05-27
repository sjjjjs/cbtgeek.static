// only for storybook

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: require('./package.json').verion
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        tailwindcss()
      ]
    }
  }
})
