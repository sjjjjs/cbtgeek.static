import comp from "/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/post/index.html.vue"
const data = JSON.parse("{\"path\":\"/post/\",\"title\":\"foobar\",\"lang\":\"en-US\",\"frontmatter\":{\"layout\":\"LayoutArticle\",\"description\":\"foobar\"},\"headers\":[],\"autoDesc\":true}")
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
