<template>
  <div class="product-detail">
    <div class="product-card">
      <el-card shadow="always">
        <el-image
          :src="thumbnail"
          style="width: 400px; height: 400px"
          fit="contain"
        ></el-image>
        <p>{{ description }}</p>
      </el-card>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed: {
    thumbnail() {
      return this.$page.frontmatter.product?.thumbnail || "";
    },
    description() {
      return this.$page.frontmatter.product?.description || "n/a";
    },
  },
};
</script>

<style scoped>
.product-card {
  padding: 32px;
  display: flex;
  justify-content: center;
}
</style>