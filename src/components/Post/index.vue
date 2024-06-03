<template>
    <div class="post-head bg-base-300 px-8 py-8 lg:py-16">
        <div class="mx-auto max-w-[1280px]">
            <div class="block">
                <div class="text-sm breadcrumbs">
                    <Breadcrumbs :breadcrumbs="data"></Breadcrumbs>
                </div>
                <h1 class="text-3xl leading-snug font-semibold sm:text-4xl lg:my-4">How to Install Avada Via WordPress</h1>
                <p class="text-sm text-neutral py-4">Last update: February 19, 2024</p>
            </div>
        </div>
    </div>
    <div class="post-body bg-base-100 p-8">
        <div class="mx-auto max-w-[1280px] lg:column flex justify-between items-start">
            <div class="prose lg:max-w-[720px] xl:max-w-[800px] mr-4 xl:mr-16">
                <slot></slot>
            </div>
            <div class="toc sticky top-4 z-10 overflow-hidden hidden w-[340px] lg:block">
                <p class="text-xl my-2">Table of Content</p>
                <Toc :data="$page.headers"></Toc>
            </div>
        </div>
    </div>
    <!-- <div class="post-foot bg-base-300 p-8"> </div> -->
</template>
<script setup>
import { getCurrentInstance } from 'vue';
import Toc from './Toc.vue';
import Breadcrumbs from './Breadcrumbs.vue';
import { parseBreadcrumb } from '@/utils';

const { proxy } = getCurrentInstance();


const data = parseBreadcrumb(proxy.$page.path);

</script>