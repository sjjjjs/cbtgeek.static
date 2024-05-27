<template>
    <div class="min-h-screen flex flex-col bg-slate-100">
        <PageHeader></PageHeader>
        <div class=" flex-grow container mx-auto py-4">
            <article class="prose prose-slate mx-auto bg-white p-4">
                <Content></Content>
            </article>
        </div>
        <PageFooter></PageFooter>
    </div>
</template>
<script setup>
import PageHeader from '@/components/PageHeader/index.vue';
import PageFooter from '@/components/PageFooter/index.vue';
</script>