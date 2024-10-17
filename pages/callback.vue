<script setup lang="ts">
const setAccessToken = () => {
  const url = window.location.href
  const parsedUrl = new URL(url)
  const hash = parsedUrl.hash.substring(1)
  const params = new URLSearchParams(hash)

  const accessToken = params.get('access_token')
  if (accessToken) {
    localStorage.setItem('access_token', accessToken)
  }
}

onMounted(() => {
  setAccessToken();
  navigateTo('/')
})
</script>

<template>
  <div>Redirecting...</div> <!-- Optional if you want a brief message -->
</template>
