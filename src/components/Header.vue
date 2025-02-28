<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { onMounted, onUnmounted, reactive, watch } from "vue";
import HeaderLink from "../types/HeaderLink";

const route = useRoute();

const router = useRouter();

const links: Array<HeaderLink> = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "Studium",
    link: "/studium",
  },
  {
    id: 3,
    title: "Weiterbildung",
    link: "/Weiterbildung",
    sublinks: [
      {
        id: 1,
        title: "CAS",
        link: "/Weiterbildung/CAS",
      },
      {
        id: 2,
        title: "DAS",
        link: "/Weiterbildung/DAS",
      },
      {
        id: 3,
        title: "MAS",
        link: "/Weiterbildung/MAS",
      },
    ],
  },
  {
    id: 4,
    title: "Forschung",
    link: "/Forschung",
  },
  {
    id: 5,
    title: "Über uns",
    link: "/Über-uns",
  },
];

const state = reactive({
  isMenuOpen: false,
  lastScrollTop: 0,
  delta: 5,
  navbarHeight: 72,
  interval: 0,
  didScroll: false,
  changedRoute: false,
});

function changeState() {
  state.isMenuOpen = !state.isMenuOpen;
}

function goTo(route: any) {
  if (state.isMenuOpen) changeState();
  router.push(route);
}

function hasScrolled() {
  const st = window.scrollY;
  const header = document.querySelector("header");

  if (Math.abs(state.lastScrollTop - st) <= state.delta) return;

  if (header) {
    if (
      st > state.lastScrollTop &&
      st > state.navbarHeight &&
      !state.changedRoute
    ) {
      header.style.transition = "top 0.5s ease-out 0s";
      header.style.top = `-${state.navbarHeight}px`;
    } else {
      if (
        st + window.innerHeight < document.body.clientHeight ||
        state.changedRoute
      ) {
        header.style.transition = "top 1s cubic-bezier(0, 0.97, 0.58, 1) 0s";
        header.style.top = "0px";
      }
    }
  }

  state.lastScrollTop = st;
}

watch(
  () => route.fullPath,
  async () => {
    state.changedRoute = true;
    hasScrolled();
  }
);

onMounted(() => {
  window.addEventListener("scroll", function () {
    state.didScroll = true;
  });

  state.changedRoute = true;
  state.interval = setInterval(function () {
    if (state.didScroll) {
      hasScrolled();
      state.didScroll = false;
      state.changedRoute = false;
    }
  }, 250);
});

onUnmounted(() => {
  window.removeEventListener("scroll", hasScrolled);
  clearInterval(state.interval);
});
</script>

<template>
  <header
    class="bg-white w-full z-20 top-0 shadow-lg"
    :class="state.isMenuOpen ? '' : 'fixed'"
  >
    <div
      class="flex flex-wrap justify-between h-[72px] normal-spacing py-4 items-center"
    >
      <div @click="goTo('/')" class="cursor-pointer">
        <img src="/icons/phlu-logo.svg" class="h-10" />
      </div>
      <div class="sm:hidden flex" @click="changeState">
        <img
          src="/icons/menu.svg"
          class="h-6"
          v-motion-pop
          v-if="!state.isMenuOpen"
        />
      </div>
      <div class="sm:flex hidden flex-row items-center">
        <div class="mx-4" v-for="link in links" :key="link.id">
          <router-link
            :to="link.link"
            class="inline-block text-[0] cursor-pointer"
          >
            <p
              class="text-primary font-phlu font-semibold text-lg hover:text-black duration-300"
            >
              {{ link.title }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
    <div
      v-if="state.isMenuOpen"
      class="flex fixed top-0 left-0 w-screen h-full bg-white duration-400 z-40 p-5 overflow-x-hidden"
    >
      <div class="absolute top-[16px] right-[20px]" @click="changeState">
        <img
          src="/icons/close.svg"
          class="h-8"
          v-motion-pop
          v-if="state.isMenuOpen"
        />
      </div>

      <div
        @click="goTo('/')"
        class="absolute top-[16px] left-[20px] cursor-pointer"
      >
        <img src="/icons/phlu-logo.svg" class="h-10" />
      </div>

      <div class="flex flex-col justify-center">
        <div class="flex flex-col">
          <div class="my-4" v-for="link in links" :key="link.id">
            <div
              @click="goTo(link.link)"
              class="inline-block text-[0] cursor-pointer"
            >
              <p
                class="text-primary font-phlu font-semibold text-[27px] hover:text-black duration-300"
                :title="link.title"
              >
                {{ link.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
