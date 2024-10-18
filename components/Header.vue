<script setup lang="ts">
const menu = ref(false)
</script>

<template>
  <header class="sticky top-0 z-10">
    <nav class="bg-primary-100 border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/apple-touch-icon.png" class="h-8" alt="Taqify Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap">Taqify</span>
        </NuxtLink>
        <UButton v-on:click="menu = !menu" :icon="!menu ? 'i-heroicons-bars-3' : 'i-heroicons-x-mark'" size="xl"
          color="primary" square variant="ghost" class="md:hidden" />

        <div class="w-full md:block md:w-auto" v-bind:class="menu ? 'block' : 'hidden'">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border-2 border-primary-500 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <NuxtLink to="/"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0 transition-all"
                active-class="bg-primary-100 md:bg-transparent text-primary-500">
                Profile</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/songs"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0 transition-all"
                active-class="bg-primary-100 md:bg-transparent text-primary-500">
                Top Songs</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/artists"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0 transition-all"
                active-class="bg-primary-100 md:bg-transparent text-primary-500">
                Top Artists</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/albums"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0 transition-all"
                active-class="bg-primary-100 md:bg-transparent text-primary-500">
                Top Albums</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/genres"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0 transition-all"
                active-class="bg-primary-100 md:bg-transparent text-primary-500">
                Top Genres</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/recents"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0 transition-all"
                active-class="bg-primary-100 md:bg-transparent text-primary-500">
                Recently Played</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/wrapped"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0 transition-all"
                active-class="bg-primary-100 md:bg-transparent text-primary-500">
                Wrapped</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
