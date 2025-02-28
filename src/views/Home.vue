<script setup lang="ts">
import { inject, reactive } from "vue";
import { INewsFetchService } from "../services/INewsFetchService";
import type News from "@/types/News";
import NewsPreview from "@/components/NewsPreview.vue";

const newsFetchService: INewsFetchService | undefined = inject("newsFetchService");
const state = reactive({
    news: [] as News[],
});

const fetchNews = async () => {
    state.news = await newsFetchService?.fetchNews() || [];
};

fetchNews();
</script>

<template>
    <div class="flex flex-col items-start px-5 sm:px-10 md:px-20 mb-10">
        <h1 class="text-4xl font-semibold text-primary mt-10">News</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
            <NewsPreview v-for="(newsItem, index) in state.news" :key="index" :title="newsItem.title" :description="newsItem.description" :img="newsItem.thumbnail" />
        </div>
    </div>
</template>