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
const redirect_uri = new URL(window.location.href).origin + '/callback'
const scope = 'user-read-private user-read-email user-top-read user-read-recently-played'
const state = generateRandomString(16)

const authorizeSpotify = async () => {
  const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
    response_type: 'token',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  })}`

  window.location.href = authUrl
}
</script>

<template>
  <button v-on:click="authorizeSpotify()" type="button"
    class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
    Authorize Spotify
  </button>
</template>