<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import RefreshTokenButton from '@/components/RefreshTokenButton.vue'
import Skeleton from '@/components/Skeleton.vue'
import { ref } from 'vue'

interface SpotifyArtist {
  genres: string[]
}

interface SpotifyTopArtistsResponse {
  items: SpotifyArtist[]
}

const top_genres = ref<string[] | null>(null)
const error = ref<string | null>(null)

const fetchTopArtistsAndGenres = async () => {
  const access_token = localStorage.getItem('access_token')

  if (!access_token) {
    error.value = 'No access token found'
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
      throw new Error('Error fetching data: ' + response.statusText)
    }

    const data: SpotifyTopArtistsResponse = await response.json()

    if (data?.items?.length) {
      const genres = Array.from(
        new Set(
          data.items.flatMap((artist) =>
            artist.genres.filter(Boolean).map((genre) =>
              genre
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')
            )
          )
        )
      )
      top_genres.value = genres
    } else {
      error.value = 'No items found in the response'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    console.error('Error fetching top artists:', err)
  }
}

fetchTopArtistsAndGenres()
</script>

<template>
  <RefreshTokenButton v-if="error" />

  <div v-else-if="top_genres" class="flex flex-col">
    <h3 class="text-lg font-bold mb-4">Top Genres</h3>

    <div class="overflow-x-auto">
      <div class="min-w-full inline-block align-middle">
        <div class="overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200 text-left">
            <thead>
              <tr>
                <th class="p-2">Genre</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="genre in top_genres" :key="genre">
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">{{ genre }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <Skeleton v-else />
</template>
