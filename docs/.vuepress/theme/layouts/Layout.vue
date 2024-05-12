<template>
  <BlogPage v-if="contentType === 'blog'"> <Content /> </BlogPage>
  <ProductPage v-else-if="contentType === 'product'"> <Content /> </ProductPage>
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
      const path = this.$page.regularPath.toLowerCase();
      if (path.match(/^\/product\/.*/)) {
        // 产品
        return "product";
      } else if (path.match(/^\/blog\/.*/)) {
        // 博客
        return "blog";
      } else {
        // 其他
        return "other";
      }
    },
  },
};
</script>