<template>
    <a v-if="!$slots.default" class="btn btn-ghost" v-bind="$attrs">
        {{ name }}
    </a>
    <div v-else tabindex="0" class="dropdown dropdown-start dropdown-hover">
        <a class="btn btn-ghost">
            {{ name }}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="size-4 stroke-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </a>
        <div
            class="dropdown-content z-[1] p-4 shadow rounded w-[640px] bg-base-100">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    name: {
        type: String,
        default: ''
    }
});
</script>