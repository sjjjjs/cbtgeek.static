<template>
  <el-container class="page-container">
    <el-header :height="headerHeight" class="page-header">
      <slot name="header">
        <MyNavigator />
      </slot>
    </el-header>
    <el-main
      :class="{
        'page-content': true,
        'no-padding': noPadding,
      }"
    >
      <div v-if="expand" class="expand-content">
        <slot></slot>
      </div>
      <div v-else class="limit-content">
        <slot></slot>
      </div>
    </el-main>
    <el-footer :height="footerHeight" class="page-footer">
      <slot name="footer">
        <MyFooter />
      </slot>
    </el-footer>
  </el-container>
</template>
  <script>
import MyNavigator from "@theme/components/MyNavigator.vue";
import MyFooter from "@theme/components/MyFooter.vue";
export default {
  props: {
    headerHeight: {
      type: Number,
      default: "60px",
    },
    footerHeight: {
      type: Number,
      default: "60px",
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
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
<style scoped lang="stylus">
.page-container {
  min-height: 100vh;
}

.page-content, .page-head-wrap {
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

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  color: main-color;
}
</style>