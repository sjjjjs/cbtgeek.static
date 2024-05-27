export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/about.html", { loader: () => import(/* webpackChunkName: "about.html" */"/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/about.html.js"), meta: {"title":""} }],
  ["/blog/", { loader: () => import(/* webpackChunkName: "blog_index.html" */"/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/blog/index.html.js"), meta: {"title":""} }],
  ["/product/", { loader: () => import(/* webpackChunkName: "product_index.html" */"/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/product/index.html.js"), meta: {"title":""} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
