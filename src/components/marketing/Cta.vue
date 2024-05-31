<template>
    <div class=" bg-slate-50">
        <div class="mx-auto">
            <div class="relative isolate overflow-hidden px-6 pt-16 sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                <div class="mx-auto max-w-lg text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                    <SectionTitle
                        :center="false"
                        title="Boost Your Trade Performance Today!"
                        subTitle="Effortlessly achieve sales growth with our all-in-one technical"
                    ></SectionTitle>
                    <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <button class=" hover:scale-110 btn btn-primary">Get started</button>
                        <a class=" transition-all hover:scale-110 link link-neutral">Learn more <span aria-hidden="true">→</span></a>
                    </div>
                </div>
                <div class=" relative mt-16 h-60 lg:mt-8">
                    <img class=" absolute left-0 top-0 w-[57rem] max-w-none  bg-white/5 ring-1 ring-white/10 border rounded shadow-lg" src="@/assets/growth.png" alt="Business conference">
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import SectionTitle from '@/components/marketing/SectionTitle.vue'
</script>