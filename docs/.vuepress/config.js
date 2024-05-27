import { viteBundler } from '@vuepress/bundler-vite'
import customTheme from './theme'
import { path } from 'vuepress/utils'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler({
    // 配置需要与 vite.config.js 同步
  }),
  theme: customTheme({
    hostname: process.env.NODE_ENV === 'production' || 'b2b.gbtgeek.com',
    seo: true
  }),

  title: 'CBT Geek',
  description: 'Empowering Global Trade with Technology',

  alias: {
    '@': path.resolve(__dirname, '../../src'),
  }
})