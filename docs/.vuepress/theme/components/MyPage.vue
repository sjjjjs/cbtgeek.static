<template>
  <el-container class="page-container">
    <el-header :height="headerHeight" class="page-header">
      <slot name="header">
        <div class="page-header-wrap">
          <MyNavigator />
        </div>
      </slot>
    </el-header>
    <el-main class="page-content">
      <div v-if="expand" class="expand-content">
        <slot></slot>
      </div>
      <div v-else class="page-content-wrap">
        <slot></slot>
      </div>
    </el-main>
    <el-footer :height="footerHeight" class="page-footer">
      <slot name="footer">
        <div class="page-footer-wrap">
          <MyFooter />
        </div>
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

.page-content, .page-header, .page-footer {
  padding: 0;
}

.page-header-wrap, .page-content-wrap, .page-footer-wrap {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.page-header {
  background-color: #fff;
  border-bottom: solid 1px #e6e6e6;
  overflow: hidden;
}

.page-content {
  padding: 40px 0;

  .page-content-wrap {
    padding: 60px 40px;
    box-sizing: border-box;
    border: 1px solid #ececec;
  }
}

.page-footer {
  background-color: #fff;
}
</style>