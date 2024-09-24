<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const menu = ref(false)
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-4 px-4 sm:px-0">
    <header
      class="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3"
    >
      <nav class="w-full mx-auto sm:flex sm:items-center sm:justify-between">
        <div class="flex items-center justify-between">
          <RouterLink
            class="flex-none text-xl font-semibold focus:outline-none focus:opacity-80"
            to="/"
            aria-label="Brand"
          >
            Taqify
          </RouterLink>
          <div class="sm:hidden">
            <button
              v-on:click="menu = !menu"
              type="button"
              class="hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              id="hs-navbar-example-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-example"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-example"
            >
              <svg
                class="hs-collapse-open:hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                class="hs-collapse-open:block hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span class="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>

        <div
          v-bind:class="menu ? 'block' : 'hidden'"
          id="hs-navbar-example"
          class="hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
          aria-labelledby="hs-navbar-example-collapse"
        >
          <div
            class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5"
          >
            <RouterLink
              class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              to="/"
              >Profile</RouterLink
            >
            <RouterLink
              class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              :to="{ name: 'songs' }"
              >Top Songs</RouterLink
            >
            <RouterLink
              class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              :to="{ name: 'artists' }"
              >Top Artists</RouterLink
            >
            <RouterLink
              class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              :to="{ name: 'albums' }"
              >Top Albums</RouterLink
            >
          </div>
        </div>
      </nav>
    </header>

    <!-- <header class="relative flex flex-wrap w-full bg-white text-sm py-3">
      <nav class="max-w-[85rem] w-full mx-auto">
        <div class="flex items-center justify-between">
          <RouterLink
            class="flex-none text-xl font-semibold focus:outline-none focus:opacity-80"
            to="/"
            aria-label="Taqify"
            >Taqify</RouterLink
          >

          <div class="">
            <button
              v-on:click="menu = !menu"
              type="button"
              class="hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              id="hs-navbar-example-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-example"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-example"
            >
              <svg
                class="hs-collapse-open:hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                class="hs-collapse-open:block hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span class="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>

        <div
          v-if="menu"
          id="hs-navbar-example"
          class="hs-collapse overflow-hidden transition-all duration-300 basis-full grow"
          aria-labelledby="hs-navbar-example-collapse"
        >
          <div class="flex flex-col gap-5 mt-5">
            <RouterLink
              class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              to="/"
              >Profile</RouterLink
            >
            <RouterLink
              class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              :to="{ name: 'songs' }"
              >Top Songs</RouterLink
            >
            <RouterLink
              class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              :to="{ name: 'artists' }"
              >Top Artists</RouterLink
            >
            <a
              class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              href="#"
              >Top Albums</a
            >
          </div>
        </div>
      </nav>
    </header> -->

    <main>
      <RouterView />
    </main>
  </div>
</template>
