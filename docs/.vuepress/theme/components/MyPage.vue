<template>
  <el-container class="theme-container">
    <el-header>
      <MyNavigator />
    </el-header>
    <el-main>
      <slot></slot>
    </el-main>
    <el-footer>
      <MyFooter />
    </el-footer>
  </el-container>
</template>
  <script>
import MyNavigator from "@theme/components/MyNavigator.vue";
import MyFooter from "@theme/components/MyFooter.vue";
export default {
  components: {
    MyNavigator,
    MyFooter,
  },
};
</script>