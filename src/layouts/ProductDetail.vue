<template>
    <div class="min-h-screen flex flex-col">
        <div class=" flex-shrink-0">
            <PageHeader></PageHeader>
        </div>
        <div class=" flex-grow container mx-auto py-8">
            <article class="prose prose-slate mx-auto">
                <Content></Content>
            </article>
        </div>
        <div class=" flex-shrink-0">
            <PageFooter></PageFooter>
        </div>
    </div>
</template>
<script setup>
import PageHeader from '@/components/PageHeader/index.vue';
import PageFooter from '@/components/PageFooter/index.vue';
</script>