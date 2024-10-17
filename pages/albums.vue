<script setup lang="ts">
interface SpotifyAlbum {
  name: string
  album_type: string
  images: Array<{ url: string }>
  external_urls: { spotify: string }
}

interface SpotifyTrack {
  album: SpotifyAlbum
}

interface SpotifyTopTracksResponse {
  items: SpotifyTrack[]
}

// State variables
const spotify_data = ref<SpotifyAlbum[] | null>(null)
const error = ref<string | null>(null)

// Retrieve access token from cookies (for SSR and client)
const access_token = useCookie('access_token')

if (!access_token.value) {
  error.value = 'No access token found'
}

try {
  const { data, error: fetchError } = await useFetch<SpotifyTopTracksResponse>(
    'https://api.spotify.com/v1/me/top/tracks?limit=50',
    {
      headers: {
        Authorization: `Bearer ${access_token.value}`,
        'Content-Type': 'application/json'
      }
    }
  )

  if (fetchError.value) {
    throw new Error(fetchError.value.message)
  }

  if (data.value?.items) {
    // Extract unique albums from the tracks
    const uniqueAlbums = Array.from(
      new Map(
        data.value.items
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

useSeoMeta({
  title: 'Top Albums on Spotify',
  description: 'Top Albums on Spotify',
  ogTitle: 'Top Albums on Spotify',
  ogDescription: 'Top Albums on Spotify',
  ogImage: '/favicon.ico',
  ogUrl: useRequestURL().href,
  twitterTitle: 'Top Albums on Spotify',
  twitterDescription: 'Top Albums on Spotify',
  twitterImage: '/favicon.ico',
  twitterCard: 'summary'
})
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