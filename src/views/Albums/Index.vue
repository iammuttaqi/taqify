<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import RefreshTokenButton from '@/components/RefreshTokenButton.vue'
import Skeleton from '@/components/Skeleton.vue'
import { ref } from 'vue'

interface SpotifyAlbum {
  name: string
  album_type: string
  images: Array<{
    url: string
  }>
  external_urls: {
    spotify: string
  }
}

interface SpotifyTrack {
  album: SpotifyAlbum
}

interface SpotifyTopTracksResponse {
  items: SpotifyTrack[]
}

const spotify_data = ref<SpotifyAlbum[] | null>(null)
const error = ref<Error | null>(null)

const fetchTopAlbums = async () => {
  const access_token = localStorage.getItem('access_token')

  fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data: SpotifyTopTracksResponse) => {
      if (data.items) {
        // Extract unique albums
        const uniqueAlbums = Array.from(
          new Map(
            data.items
              .filter((track) => track.album.album_type == 'ALBUM')
              .map((track) => [track.album.name, track.album]) // Map by album name to ensure uniqueness
          ).values()
        )
        spotify_data.value = uniqueAlbums
        console.log(spotify_data.value)
      } else {
        error.value = new Error('Error fetching top albums')
      }
    })
    .catch((err) => {
      error.value = err
      console.error('Error fetching top tracks:', err)
    })
}
fetchTopAlbums()
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
              <tr v-for="(album, index) in spotify_data" :key="index">
                <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                  <img :src="album.images[0].url" alt="" class="w-12" />
                </td>
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">{{ album.name }}</td>
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">
                  <a
                    :href="album.external_urls.spotify"
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
