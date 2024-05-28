<template>
  <div class="navbar bg-base-100 sticky top-0 shadow backdrop-blur z-50">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost text-xl">
        <img class="w-[20px]" :src="loggIcon" />
        <span>CBT Geek</span>
        <sup class="text-slate-500 font-thin">
          <Version></Version>
        </sup>
      </a>
    </div>
    <div class="lg:hidden flex-none">
      <button class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          class="inline-block w-5 h-5 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <!-- <div v-if="showTopMenu" class="top-menu">
          <ul class="menu menu-lg fixed top-0 left-0 w-screen z-10 bg-slate-300">
            <li><a href="/product">Product</a></li>
            <li><a href="/posts">Posts</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/knowledge">Knowledge</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div> -->
      </button>
    </div>
    <div class="hidden lg:flex flex-none">
      <ul class="menu menu-horizontal px-1 font-semibold">
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