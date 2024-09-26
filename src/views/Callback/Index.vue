<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// import { useRouter } from 'vue-router'

// const router = useRouter()

const setAccessToken = () => {
  const url = window.location.href
  const parsedUrl = new URL(url)
  const hash = parsedUrl.hash.substring(1)
  const params = new URLSearchParams(hash)

  const accessToken = params.get('access_token')
  if (accessToken) {
    localStorage.setItem('access_token', accessToken)
    // router.push({ name: 'home' })
  }
}
setAccessToken()
</script>

<template>
  <RouterLink
    to="/"
    class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
  >
    Visit Profile
  </RouterLink>
</template>
