<template>
    <div class="min-h-screen">
        <PageHeader></PageHeader>
        <div class="container mx-auto">
            <article class="prose prose-slate mx-auto">
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