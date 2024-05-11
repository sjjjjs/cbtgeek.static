
<template>
  <MyPage>
    <div class="blog-content">
      <slot></slot>
    </div>
  </MyPage>
</template>

<script>
import MyPage from "./MyPage.vue";

export default {
  components: {
    MyPage,
  },
};
</script>

<style>
.blog-content {
  width: 1312px;
  padding: 32px;
  margin: 10px auto;
  position: relative;
  overflow: hidden;
}
</style>