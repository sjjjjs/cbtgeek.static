<template>
  <el-menu
    router
    :default-active="'Product'"
    class="el-menu-demo"
    mode="horizontal"
  >
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item index="/product">Product</el-menu-item>
    <el-menu-item index="/blog">Blog</el-menu-item>
    <el-menu-item index="/about">About</el-menu-item>
    <el-menu-item index="/contact">Contact</el-menu-item>
  </el-menu>
</template>
<script>
export default {};
</script>