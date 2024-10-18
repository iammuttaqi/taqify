<script setup lang="ts">
const menu = ref(false)
</script>

<template>
  <header class="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
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
  </header>
</template>

<style scoped></style>
