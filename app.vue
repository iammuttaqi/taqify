<script setup lang="ts">
useSeoMeta({
  title: 'Taqify - Your Personalized Spotify Experience',
  description: 'Discover your top tracks, artists, albums, and genres with Taqify. Your music, your stats, your way.',
  ogTitle: 'Taqify - Your Personalized Spotify Experience',
  ogDescription: 'Explore your Spotify stats and enjoy music insights tailored for you.',
  ogImage: '/android-chrome-512x512.png',
  ogUrl: useRequestURL().href,
  twitterTitle: 'Taqify - Your Personalized Spotify Experience',
  twitterDescription: 'Dive into your favorite tracks and artists with Taqify.',
  twitterImage: '/android-chrome-512x512.png',
  twitterCard: 'summary_large_image'
})

// useColorMode().preference = 'light'
</script>

<template>
  <UContainer class="space-y-4">
    <Header />
    <NuxtPage />
  </UContainer>
</template>