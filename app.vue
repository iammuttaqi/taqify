<script setup lang="ts">
useHead({
  title: 'Taqify'
})

useSeoMeta({
  title: 'Taqify',
  description: 'Taqify',
  ogTitle: 'Taqify',
  ogDescription: 'Taqify',
  ogImage: '/favicon.ico',
  ogUrl: useRequestURL().href,
  twitterTitle: 'Taqify',
  twitterDescription: 'Taqify',
  twitterImage: '/favicon.ico',
  twitterCard: 'summary'
})

// useColorMode().preference = 'light'
</script>

<template>
  <UContainer>
    <Header />
    <NuxtPage />
  </UContainer>
</template>