<template>
  <article class="article-section">
    <slot></slot>
  </article>
</template>

<script>
export default {
  name: "article-section",
};
</script>

<style scoped lang="stylus">
article.article-section {
  page-content-box();
  article-content-padding();
  box-sizing: border-box;
  border: 1px solid #ececec;
}
</style>