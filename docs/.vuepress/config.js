import { viteBundler } from '@vuepress/bundler-vite'
import customTheme from './theme'
import { path } from 'vuepress/utils'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: customTheme({
    hostname: process.env.NODE_ENV === 'production' || 'b2b.gbtgeek.com',
    seo: true
  }),

  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',

  alias: {
    '@': path.resolve(__dirname, '../../src'),
  }
})