<script setup lang="ts">
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import { provide } from "vue";
import { useFakeNewsFetchService } from "./services/FakeNewsFetchService";
import { useNewsFetchService } from "./services/NewsFetchService";
import type { INewsFetchService } from "./services/INewsFetchService";

const newsFetchService: INewsFetchService = useNewsFetchService();
provide("newsFetchService", newsFetchService);
</script>

<template>
  <Header />
  <div class="mt-[72px] min-h-screen">
    <router-view />
  </div>
  <Footer />
</template>