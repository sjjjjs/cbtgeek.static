import comp from "/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/product/index.html.vue"
const data = JSON.parse("{\"path\":\"/product/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"description\":\"foobar\"},\"headers\":[],\"autoDesc\":true}")
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
