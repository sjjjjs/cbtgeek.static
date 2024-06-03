<template>
  <div :class="{
    'navbar backdrop-blur bgm': true,
    'sticky top-0 z-50': props.fixed
  }">
    <div class="container mx-auto flex items-center">
      <!-- brand -->
      <div class="flex-1 flex items-center">
        <img class="h-[40px] mr-12 select-none" src="@/assets/logo.svg"></img>
        <div class="hidden lg:flex flex-none space-x-2">
          <NavLinkItem name="Product">
            <div class=" space-y-4">
              <div class="item p-12 text-center bg-primary text-primary-content rounded-md">lala</div>
              <div class="item p-12 text-center bg-primary text-primary-content rounded-md">lala</div>
              <div class="item p-12 text-center bg-primary text-primary-content rounded-md">lala</div>
            </div>
          </NavLinkItem>
          <NavLinkItem name="Post" href="/full">
            <div class="space-y-4">
              foo
            </div>
          </NavLinkItem>
          <NavLinkItem name="Knowledge"></NavLinkItem>
          <NavLinkItem name="About"></NavLinkItem>
          <NavLinkItem name="Contact"></NavLinkItem>
        </div>
      </div>
      <!-- < lg menu -->
      <div class="lg:hidden flex-none">
        <button class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            class="inline-block w-5 h-5 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <div v-if="showTopMenu" class="top-menu">
            <ul class="menu menu-lg fixed top-0 left-0 w-screen z-10 bg-slate-300">
              <li><a href="/product">Product</a></li>
              <li><a href="/posts">Posts</a></li>
              <li><a href="/support">Support</a></li>
              <li><a href="/knowledge">Knowledge</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </div>
        </button>
      </div>
      <!-- >= lg menu -->
      <div v-if="false" class="hidden lg:flex flex-none">
        <ul class="menu menu-horizontal px-1 font-semibold space-x-2 tracking-wide">
          <li tabindex="0" :class="{
            'dropdown': true,
            'dropdown-open': true
          }">
            <a role="button" href="/product">
              Product
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4 stroke-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
            <div tabindex="0"
              class="dropdown-content z-[1] p-2 shadow rounded w-[340px] h-[200px] bg-base-100 hover:bg-base-100">foo
            </div>
          </li>
          <li><a href="/posts">
              Posts
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4 stroke-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </a></li>
          <li><a href="/support">Support</a></li>
          <li><a href="/knowledge">Knowledge</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
      <div class="hidden flex-none lg:flex">
        <LanguageSwitch></LanguageSwitch>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import NavLinkItem from './NavLinkItem.vue';
import LanguageSwitch from './LanguageSwitch.vue';
import loggIcon from '@/assets/hash-icon.svg';
import Version from '@/components/Version.vue';

const productDropdownVisible = ref(false);


const props = defineProps({
  fixed: {
    type: Boolean,
    default: false
  }
});

const brandText = 'CBT Geek!'

</script>