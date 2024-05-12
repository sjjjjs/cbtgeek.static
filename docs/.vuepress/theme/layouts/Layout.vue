<template>
  <BlogPage v-if="contentType === 'blog'">
    <Content />
  </BlogPage>
  <ProductPage v-else-if="contentType === 'product'">
    <Content />
  </ProductPage>
  <MyPage v-else> <Content /> </MyPage>
</template>
<script>
import MyPage from "@theme/components/MyPage.vue";
import BlogPage from "@theme/components/BlogPage.vue";
import ProductPage from "@theme/components/ProductPage.vue";

export default {
  components: {
    MyPage,
    BlogPage,
    ProductPage,
  },
  computed: {
    contentType() {
      if (this.$page.regularPath.toLowerCase() === "/markdown.md") {
        return "home";
      } else if (this.$page.regularPath.match(/^\/product\/.*/)) {
        return "product";
      } else if (this.$page.regularPath.match(/^\/blog\/.+/)) {
        return "blog";
      } else {
        return "other";
      }
    },
  },
};
</script>