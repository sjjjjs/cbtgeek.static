<template>
    <article class="max-w-xl mx-auto">
        <div class="w-full relative">
            <img class=" aspect-video"
                :src="image"
                alt="cover">
        </div>
        <div class="flex items-center text-xs px-4 pt-2">
            <time datetime="2024-05-27" class="text-gray-500">May 27, 2024</time>
        </div>
        <div class="group relative px-4">
            <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a href="#" class="inset-0"> Boost your conversion rate </a>
            </h3>
            <p class="mt-5 line-camp-3 text-sm leading-6 text-gray-600">Illo sint voluptas. Error voluptates culpa
                eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem
                placeat consectetur nulla deserunt vel. Iusto corrupti dicta.</p>
        </div>
        <div class="relative mt-8 flex items-center gap-x-4 px-4 pb-2">
            <img :src="avatar"
                alt="avatar" class="h-10 w-10 rounded-full bg-gray-50">
            <div class="text-sm leading-6">
                <p class="font-semibold text-gray-900">Michael Foster</p>
                <p class="text-gray-600">Co-Founder / CTO</p>
            </div>
        </div>
    </article>
</template>

<script setup>
import image from './image.png'
import avatar from './avatar.png'
</script>
