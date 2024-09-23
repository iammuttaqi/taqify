<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import RefreshTokenButton from '@/components/RefreshTokenButton.vue'
import Skeleton from '@/components/Skeleton.vue'
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
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        error.value = data
      } else {
        spotify_data.value = data
      }
    })
    .catch((error) => {
      error.value = error
      console.error('Error fetching user shows:', error)
    })
}
fetchTopArtists()

console.log(spotify_data.value)
</script>

<template>
  <!-- <pre>{{ spotify_data }}</pre> -->

  <RefreshTokenButton v-if="error" />

  <div class="flex flex-col" v-else-if="spotify_data">
    <div class="overflow-x-auto">
      <div class="min-w-full inline-block align-middle">
        <div class="overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Name</th>
                <th>Link</th>
              </tr>
            </thead>
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

  <Skeleton v-else />
</template>
