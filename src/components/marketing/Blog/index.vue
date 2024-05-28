<template>
    <div class="bg-white py-8">
        <div class="container mx-auto">
            <h3 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">From the blog</h3>
            <p class="text-lg mt-2 leading-8 text-gray-600">Learn how to grow your business with our expert advice.</p>
            <div class="grid grid-cols-1 xl:gap-8 py-8 xl:grid-cols-3 py-2">
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
        </div>
    </div>
</template>
<script setup>
import Card from '@/components/marketing/Blog/Card.vue';
</script>