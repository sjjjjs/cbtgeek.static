<template>
    <div class="min-h-screen flex flex-col bg-slate-100">
        <PageHeader></PageHeader>
        <div class="flex-grow">
            <Content></Content>
        </div>
        <PageFooter></PageFooter>
    </div>
</template>
<script setup>
import PageHeader from '@/components/PageHeader/index.vue';
import PageFooter from '@/components/PageFooter/index.vue';
</script>