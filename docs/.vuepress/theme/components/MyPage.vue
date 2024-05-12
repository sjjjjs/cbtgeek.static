<template>
  <el-container class="theme-container">
    <el-header>
      <div class="page-head-wrap">
        <MyNavigator />
      </div>
    </el-header>

    <div v-if="expand" class="expand-content">
      <slot></slot>
    </div>
    <div v-else class="limit-content">
      <slot></slot>
    </div>
    <el-footer>
      <MyFooter />
    </el-footer>
  </el-container>
</template>
  <script>
import MyNavigator from "@theme/components/MyNavigator.vue";
import MyFooter from "@theme/components/MyFooter.vue";
export default {
  props: {
    expand: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    MyNavigator,
    MyFooter,
  },
};
</script>
<style scoped>
.page-head-wrap {
  width: 1170px;
  position: relative;
  margin: auto;
}
.limit-content {
  width: 1170px;
  padding: 32px;
  margin: 10px auto;
  position: relative;
  overflow: hidden;
}
</style>