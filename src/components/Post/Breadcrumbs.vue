<template>
    <div v-if="breadcrumbs && breadcrumbs.length" class="text-sm breadcrumbs">
        <ul class="ml-0">
            <li v-for="(item, i) in props.breadcrumbs">
                <span v-if="props.breadcrumbs.length - 1 === i">{{ item.name }}</span>
                <a class="link link-hover" v-else :href="item.path">{{ item.name }}</a>
            </li>
        </ul>
    </div>
</template>
<script setup>

const props = defineProps({
    breadcrumbs: {
        type: Array,
        default: () => []
    }
});
</script>