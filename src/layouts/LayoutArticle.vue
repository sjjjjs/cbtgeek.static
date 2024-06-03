<template>
    <div class="min-h-screen flex flex-col bg-slate-100 dark:bg-black">
        <PageHeader></PageHeader>
        <Post><Content></Content></Post>
        <PageFooter></PageFooter>
    </div>
</template>
<script setup>
import PageHeader from '@/components/PageHeader/index.vue';
import PageFooter from '@/components/PageFooter/index.vue';
import Post from '@/components/Post/index.vue';
</script>