<template>
    <div style="color: #fff; background-color: rgba(255, 0, 0, 0.1);">
        <slot></slot>
        <ul v-if="cities.length">
            <li v-for="city in cities">{{ city.province }}{{ city.name }}</li>
        </ul>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getCities } from '@/utils/firebase'

const cities = ref([])

async function fetchData() {
    try {
        const data = await getCities()
        cities.value = data
    } catch (err) {
        console.error(err)
    }
}

// onMounted(() => {
//     fetchData()
// })
</script>