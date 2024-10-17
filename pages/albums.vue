<script setup lang="ts">
useHead({
  title: 'Top Albums'
})

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
const error = ref<string | null>(null)

const fetchTopAlbums = async () => {
  const access_token = localStorage.getItem('access_token')

  if (!access_token) {
    error.value = 'No access token found'
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
      throw new Error(`Error fetching data: ${response.statusText}`)
    }

    const data: SpotifyTopTracksResponse = await response.json()

    if (data.items) {
      const uniqueAlbums = Array.from(
        new Map(
          data.items
            .filter((track) => track.album.album_type === 'ALBUM')
            .map((track) => [track.album.name, track.album])
        ).values()
      )
      spotify_data.value = uniqueAlbums
    } else {
      error.value = 'No items found in the response'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    console.error('Error fetching top albums:', err)
  }
}

fetchTopAlbums()
</script>

<template>
  <AuthorizeSpotifyButton v-if="error" :errorMessage="error" />

  <div class="flex flex-col" v-else-if="spotify_data">
    <h3 class="text-lg font-bold mb-4">Top Albums</h3>

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
              <tr v-for="(album, index) in spotify_data" :key="index">
                <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                  <!-- Ensure album image exists before displaying -->
                  <img v-if="album.images?.[0]?.url" :src="album.images[0].url" alt="Album Cover" class="w-12" />
                </td>
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">{{ album.name }}</td>
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">
                  <a :href="album.external_urls.spotify" target="_blank" class="text-blue-500 hover:underline">Link</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Display skeleton loader when data is not yet available -->
  <Skeleton v-else />
</template>