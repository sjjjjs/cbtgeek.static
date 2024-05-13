<template>
  <p :style="{ color }">
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: "test-container",
  props: {
    color: {
      type: String,
      default: "blue",
    },
  },
};
</script>

<style>
</style>