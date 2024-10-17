<script setup lang="ts">
useHead({
  title: 'Top Songs'
})

interface SpotifyAlbum {
  images: Array<{ url: string }>
}

interface SpotifyTrack {
  name: string
  external_urls: { spotify: string }
  album: SpotifyAlbum
}

interface SpotifyTopTracksResponse {
  items: SpotifyTrack[]
}

const spotify_data = ref<SpotifyTopTracksResponse | null>(null)
const error = ref<string | null>(null)

const fetchTopTracks = async () => {
  const access_token = localStorage.getItem('access_token')

  if (!access_token) {
    error.value = 'Access token is missing'
    return
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Error fetching tracks: ${response.statusText}`)
    }

    const data: SpotifyTopTracksResponse = await response.json()

    spotify_data.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    console.error('Error fetching top tracks:', err)
  }
}

onMounted(() => {
  fetchTopTracks()
})
</script>

<template>
  <AuthorizeSpotifyButton v-if="error" />

  <div class="flex flex-col" v-else-if="spotify_data">
    <h3 class="text-lg font-bold mb-4">Top Songs</h3>

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
              <tr v-for="(item, index) in spotify_data.items" :key="index">
                <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                  <img v-if="item.album?.images?.[0]?.url" :src="item.album.images[0].url" alt="Album cover"
                    class="w-12" />
                </td>
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">{{ item.name }}</td>
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">
                  <a :href="item.external_urls.spotify" target="_blank" class="text-blue-500 hover:underline">Link</a>
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