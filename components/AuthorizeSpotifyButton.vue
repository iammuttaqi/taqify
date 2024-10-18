<script setup lang="ts">
const generateRandomString = (length: number) => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const client_id = '63cfca9112974961abac8f8008e8a989'
const redirect_uri = ref('')
const scope = 'user-read-private user-read-email user-top-read user-read-recently-played'
const state = generateRandomString(16)

const loading = ref(false)
const authorizeSpotify = () => {
  loading.value = true
  const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
    response_type: 'token',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri.value,
    state: state
  })}`

  window.location.href = authUrl
}

onMounted(() => {
  redirect_uri.value = new URL(window.location.href).origin + '/callback'
})
</script>

<template>
  <UButton v-on:click="authorizeSpotify()" block size="xl" type="button" :loading="loading">Authorize Spotify</UButton>
</template>