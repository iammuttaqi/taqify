<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import { ref } from 'vue'

const spotify_data = ref(null)
const error = ref(null)

const fetchSpotifyData = async () => {
  try {
    const access_token = localStorage.getItem('access_token')

    fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status && data.message) {
          error.value = data
        } else {
          spotify_data.value = data
        }
      })
      .catch((error) => {
        console.error('Error fetching Spotify data:', error)
        error.value = error
      })
  } catch (error) {
    error.value = error
    console.error('Error:', error)
  }
}
fetchSpotifyData()

const refreshToken = () => {
  const url =
    'https://accounts.spotify.com/authorize?client_id=63cfca9112974961abac8f8008e8a989&redirect_uri=http://localhost:5173/callback&response_type=token&scope=user-top-read'
  window.open(url, '_blank')
}
</script>

<template>
  <div class="space-y-4">
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
                <tr>
                  <td class="p-2 whitespace-nowrap text-sm text-gray-800">Image</td>
                  <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                    <img :src="spotify_data.images[0].url" alt="" />
                  </td>
                </tr>
                <tr>
                  <td class="p-2 whitespace-nowrap text-sm text-gray-800">Name</td>
                  <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                    {{ spotify_data.display_name }}
                  </td>
                </tr>
                <tr>
                  <td class="p-2 whitespace-nowrap text-sm text-gray-800">Link</td>
                  <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                    {{ spotify_data.external_urls.spotify }}
                  </td>
                </tr>
                <tr>
                  <td class="p-2 whitespace-nowrap text-sm text-gray-800">Followers</td>
                  <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                    {{ spotify_data.followers.total }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
