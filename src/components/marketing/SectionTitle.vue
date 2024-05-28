<template>
    <div :class="{
        cta: true,
        'text-center': center
    }">
        <h2 class="max-w-4xl mx-auto sm:text-6xl text-4xl font-bold tracking-tight text-gray-900">
        {{ props.title }}</h2>
    <p class=" max-w-4xl mx-auto text-lg mt-2 leading-9 text-gray-600">{{ props.subTitle }}</p>
    </div>
</template>
<script setup>
const props = defineProps({
    center: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        default: ''
    },
    subTitle: {
        type: String,
        default: ''
    }
});
</script>