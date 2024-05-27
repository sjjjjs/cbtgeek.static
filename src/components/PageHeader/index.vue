<template>
  <div class="navbar bg-base-100 sticky top-0 shadow backdrop-blur z-50">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost text-xl">
        <img class="w-[20px]" :src="loggIcon" />
        <span>CBT Geek</span>
        <sup><Version></Version></sup>
      </a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/product">Product</a></li>
        <li><a href="/posts">Posts</a></li>
        <li><a href="/support">Support</a></li>
        <li><a href="/knowledge">Knowledge</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import loggIcon from '@/assets/hash-icon.svg';
import Version from '@/components/Version.vue';

const brandText = 'CBT Geek!'
</script>