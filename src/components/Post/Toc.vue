<template>
    <ul
        :class="{
            'menu': props.root,
            'overflow-hidden': true
        }"
    >
        <li class="block w-full" v-for="(item, idx) in props.data" :key="idx">
            <a @click="props.onClick(item)" class="block w-full overflow-hidden text-ellipsis whitespace-nowrap">{{ item.title }}</a>
            <Toc    
                v-if="item.children && item.children.length"
                :root="false"
                :data="item.children"
                :onClick="(evt) => props.onClick(evt)"
            ></Toc>
        </li>
    </ul>
</template>
<script setup>
import { animateScrollTo } from '@/utils/index';


defineOptions({
    name: 'Toc'
});

const props = defineProps({
    root: {
        type: Boolean,
        default: true
    },
    data: {
        type: Array,
        default: () => []
    },
    onClick: {
        type: Function,
        default: item => animateScrollTo(item?.slug)
    }
});

</script>