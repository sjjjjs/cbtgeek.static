<template>
    <div class="min-h-screen">
        <PageHeader></PageHeader>
        <div class="container mx-auto py-8">
            <article class="prose prose-slate mx-auto">
                <div class="text-sm breadcrumbs">
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>Documents</a></li>
                        <li>Add Document</li>
                    </ul>
                </div>
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