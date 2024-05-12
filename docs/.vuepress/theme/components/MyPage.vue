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
      <template v-if="full">
        <slot></slot>
      </template>
      <article-section v-else>
        <slot></slot>
      </article-section>
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
      type: String,
      default: "60px",
    },
    footerHeight: {
      type: String,
      default: "60px",
    },
    full: {
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
  page-content-box();
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
}

.page-footer {
  background-color: #fff;
}
</style>