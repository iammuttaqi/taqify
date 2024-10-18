<script setup lang="ts">
const menu = ref(false)
</script>

<template>
  <nav class="bg-white border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
      <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/apple-touch-icon.png" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap">Taqify</span>
      </NuxtLink>
      <UButton v-on:click="menu = !menu" :icon="!menu ? 'i-heroicons-bars-3' : 'i-heroicons-x-mark'" size="xl"
        color="primary" square variant="ghost" class="md:hidden" />

      <div class="w-full md:block md:w-auto" v-bind:class="menu ? 'block' : 'hidden'">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border-2 border-primary-500 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
          <li>
            <NuxtLink to="/"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0"
              active-class="bg-primary-100 md:bg-transparent text-primary-500">
              Profile</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/songs"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0"
              active-class="bg-primary-100 md:bg-transparent text-primary-500">
              Top Songs</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/artists"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0"
              active-class="bg-primary-100 md:bg-transparent text-primary-500">
              Top Artists</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/albums"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0"
              active-class="bg-primary-100 md:bg-transparent text-primary-500">
              Top Albums</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/genres"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0"
              active-class="bg-primary-100 md:bg-transparent text-primary-500">
              Top Genres</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/recents"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0"
              active-class="bg-primary-100 md:bg-transparent text-primary-500">
              Recently Played</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/wrapped"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0"
              active-class="bg-primary-100 md:bg-transparent text-primary-500">
              Wrapped</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- <header class="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
    <nav class="w-full mx-auto sm:flex sm:items-center sm:justify-between">
      <div class="flex items-center justify-between">
        <NuxtLink class="flex-none text-xl font-semibold focus:outline-none focus:opacity-80" to="/" aria-label="Brand">
          Taqify
        </NuxtLink>
        <UButton class="sm:hidden" v-on:click="menu = !menu" icon="i-heroicons-bars-3" size="sm" color="primary" square
          variant="solid" />
      </div>

      <div v-bind:class="menu ? 'block' : 'hidden'" id="hs-navbar-example"
        class="hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
        aria-labelledby="hs-navbar-example-collapse">
        <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
          <NuxtLink class="font-medium text-gray-600 hover:underline transition-all" active-class="!text-primary-600"
            to="/">
            Profile</NuxtLink>
          <NuxtLink class="font-medium text-gray-600 hover:underline transition-all" active-class="!text-primary-600"
            :to="{ name: 'songs' }">Top Songs</NuxtLink>
          <NuxtLink class="font-medium text-gray-600 hover:underline transition-all" active-class="!text-primary-600"
            :to="{ name: 'artists' }">Top Artists</NuxtLink>
          <NuxtLink class="font-medium text-gray-600 hover:underline transition-all" active-class="!text-primary-600"
            :to="{ name: 'albums' }">Top Albums</NuxtLink>
          <NuxtLink class="font-medium text-gray-600 hover:underline transition-all" active-class="!text-primary-600"
            :to="{ name: 'genres' }">Top Genres</NuxtLink>
          <NuxtLink class="font-medium text-gray-600 hover:underline transition-all" active-class="!text-primary-600"
            :to="{ name: 'recents' }">Recently Played</NuxtLink>
          <NuxtLink class="font-medium text-gray-600 hover:underline border-2 p-1 rounded-lg border-primary-500"
            :to="{ name: 'wrapped' }">Wrapped
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header> -->
</template>

<style scoped></style>
