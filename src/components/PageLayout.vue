<template>
    <PageHeader></PageHeader>
    <div class="page-content">
        <slot></slot>
    </div>
</template>
<script setup>
import PageHeader from '@/components/PageHeader/index.vue';
</script>