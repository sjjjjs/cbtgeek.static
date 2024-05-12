
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