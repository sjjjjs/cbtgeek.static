<template>
    <div class="min-h-screen">
        <PageHeader></PageHeader>
        <div class="container mx-auto">
            <Content></Content>
        </div>
        <PageFooter></PageFooter>
    </div>
</template>
<script setup>
import PageHeader from '@/components/PageHeader/index.vue';
import PageFooter from '@/components/PageFooter/index.vue';
</script>