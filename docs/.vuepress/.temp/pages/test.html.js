import comp from "/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/test.html.vue"
const data = JSON.parse("{\"path\":\"/test.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[]}")
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
