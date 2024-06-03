export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/about.html", { loader: () => import(/* webpackChunkName: "about.html" */"/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/about.html.js"), meta: {"title":"About CBT Geek"} }],
  ["/privacy-policy.html", { loader: () => import(/* webpackChunkName: "privacy-policy.html" */"/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/privacy-policy.html.js"), meta: {"title":"PRIVACY POLICY"} }],
  ["/post/", { loader: () => import(/* webpackChunkName: "post_index.html" */"/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/post/index.html.js"), meta: {"title":"foobar"} }],
  ["/product/", { loader: () => import(/* webpackChunkName: "product_index.html" */"/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/product/index.html.js"), meta: {"title":""} }],
  ["/product/Wallbox%20Station%20Home%20EV%20Chargers.html", { loader: () => import(/* webpackChunkName: "product_Wallbox Station Home EV Chargers.html" */"/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/product/Wallbox Station Home EV Chargers.html.js"), meta: {"title":"Wallbox Station Home EV Chargers"} }],
  ["/post/blog/Mode%202%20Portable%20Ev%20Charger%20FAQ.html", { loader: () => import(/* webpackChunkName: "post_blog_Mode 2 Portable Ev Charger FAQ.html" */"/Users/sunjunjie/projects/cbtgeek.static/docs/.vuepress/.temp/pages/post/blog/Mode 2 Portable Ev Charger FAQ.html.js"), meta: {"title":"Mode 2 Portable Ev Charger FAQ"} }],
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
