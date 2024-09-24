<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import RefreshTokenButton from '@/components/RefreshTokenButton.vue'
import Skeleton from '@/components/Skeleton.vue'
import { ref } from 'vue'

interface SpotifyArtist {
  name: string
  external_urls: {
    spotify: string
  }
  images: Array<{
    url: string
  }>
}

interface SpotifyTopArtistsResponse {
  items: SpotifyArtist[]
}

const spotify_data = ref<SpotifyArtist[] | null>(null)
const error = ref<string | null>(null)

const fetchTopArtists = async () => {
  const access_token = localStorage.getItem('access_token')

  if (!access_token) {
    error.value = 'Access token not found.'
    return
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`)
    }

    const data: SpotifyTopArtistsResponse = await response.json()
    spotify_data.value = data.items
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    console.error('Error fetching top artists:', err)
  }
}

fetchTopArtists()
</script>

<template>
  <RefreshTokenButton v-if="error" :errorMessage="error" />

  <div class="flex flex-col" v-else-if="spotify_data">
    <h3 class="text-lg font-bold mb-4">Top <Article></Article></h3>

    <div class="overflow-x-auto">
      <div class="min-w-full inline-block align-middle">
        <div class="overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200 text-left">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Name</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(artist, index) in spotify_data" :key="index">
                <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                  <img
                    v-if="artist.images?.[0]?.url"
                    :src="artist.images[0].url"
                    alt="Artist Image"
                    class="w-12"
                  />
                </td>
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">{{ artist.name }}</td>
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">
                  <a
                    :href="artist.external_urls.spotify"
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
