<template>
  <div :class="{
    'navbar backdrop-blur bgm': true,
    'sticky top-0 z-50': props.fixed
  }">
    <div class="container mx-auto flex items-center">
      <!-- brand -->
      <div class="flex-1 flex items-center">
        <a href="/" class="btn btn-ghost text-xl mr-8">
          <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
            clip-rule="evenodd" class="fill-current w-[20px]">
            <path
              d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z">
            </path>
          </svg>
          <span>CBT Geek</span>
        </a>
        <div class="hidden lg:flex flex-none space-x-2">
          <div tabindex="0" class="dropdown dropdown-start dropdown-hover">
            <a class="btn btn-ghost">
              Product
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4 stroke-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
            <div class="dropdown-content z-[1] p-4 shadow rounded w-[640px] bg-base-100 hover:bg-base-100">
              <div class=" space-y-4">
                <div class="item p-12 text-center bg-primary text-primary-content rounded-md">lala</div>
                <div class="item p-12 text-center bg-primary text-primary-content rounded-md">lala</div>
                <div class="item p-12 text-center bg-primary text-primary-content rounded-md">lala</div>
              </div>
            </div>
          </div>
          <div tabindex="0" class="dropdown dropdown-start dropdown-hover">
            <a class="btn btn-ghost">
              Post
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4 stroke-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
            <div class="dropdown-content z-[1] p-2 shadow rounded w-[340px] h-[200px] bg-base-100 hover:bg-base-100">
              <div class="space-y-4">
                foo
              </div>
            </div>
          </div>
          <a class="btn btn-ghost"> Knowledge </a>
          <a class="btn btn-ghost"> About </a>
          <a class="btn btn-ghost"> Contact </a>
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
        <button class="btn btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>

        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
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