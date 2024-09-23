<script setup lang="ts">
const refreshToken = () => {
  const url =
    'https://accounts.spotify.com/authorize?client_id=63cfca9112974961abac8f8008e8a989&redirect_uri=http://localhost:5173/callback&response_type=token&scope=user-top-read'
  window.open(url, '_blank')
}
</script>

<template>
  <button
    v-on:click="refreshToken()"
    type="button"
    class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
  >
    Refresh Token
  </button>
</template>
