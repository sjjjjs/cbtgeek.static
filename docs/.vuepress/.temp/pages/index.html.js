import comp from "/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Hello VuePress\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"Hello VuePress\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://b2b.gbtgeek.com/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"你好， VuePress ！\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Hello VuePress\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Hello VuePress\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Hello VuePress\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[],\"autoDesc\":true}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
