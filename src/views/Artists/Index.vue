<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'

const spotify_data = ref(null)
const error = ref(null)

const fetchTopArtists = async () => {
  const access_token = localStorage.getItem('access_token')

  fetch('https://api.spotify.com/v1/me/top/artists?limit=50', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`, // Add the access token here
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      spotify_data.value = data
    })
    .catch((error) => {
      error.value = error
      console.error('Error fetching user shows:', error)
    })
}
fetchTopArtists()

const refreshToken = () => {
  const url =
    'https://accounts.spotify.com/authorize?client_id=63cfca9112974961abac8f8008e8a989&redirect_uri=http://localhost:5173/callback&response_type=token&scope=user-top-read'
  window.open(url, '_blank')
}

console.log(spotify_data.value)
</script>

<template>
  <!-- <pre>{{ spotify_data }}</pre> -->

  <button
    v-if="error"
    v-on:click="refreshToken()"
    type="button"
    class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
  >
    Refresh Token
  </button>

  <div class="flex flex-col" v-else-if="spotify_data">
    <div class="overflow-x-auto">
      <div class="min-w-full inline-block align-middle">
        <div class="overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(item, index) in spotify_data.items" :key="index">
                <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                  <img :src="item.images[0].url" alt="" class="w-12" />
                </td>
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">{{ item.name }}</td>
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">
                  <a
                    :href="item.external_urls.spotify"
                    target="_blank"
                    class="text-blue-500 hover:underline"
                    >Link</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
