<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
});
</script>


<template>
    <div class="flex flex-col cursor-pointer group">
        <div class="overflow-hidden inline-block rounded-md w-full h-[200px]">
            <img :srcset="img" alt="News placeholder" class="w-full h-[200px] object-cover rounded-md group-hover:scale-[105%] duration-700" />
        </div>
        <h2 class="text-primary">{{ title }}</h2>
        <p class="text-xs">{{ description }}</p>
    </div>
</template>