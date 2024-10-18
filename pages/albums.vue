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
  ogImage: '/android-chrome-512x512.png',
  ogUrl: useRequestURL().href,
  twitterTitle: 'Top Albums on Spotify',
  twitterDescription: 'Top Albums on Spotify',
  twitterImage: '/android-chrome-512x512.png',
  twitterCard: 'summary'
})
</script>

<template>
  <AuthorizeSpotifyButton v-if="error" :errorMessage="error" />

  <UCard v-else-if="spotify_data">
    <template #header>
      <h1 class="font-bold">Top Albums</h1>
    </template>

    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-primary-500">

        <thead class="text-xs text-primary-700 uppercase bg-primary-50">
          <tr>
            <th scope="col" class="px-6 py-3">Cover</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Link</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-primary-200">
          <tr class="hover:bg-primary-100 transition-all" v-for="(album, index) in spotify_data" :key="index">
            <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">
              <a :href="album.images[0].url" target="_blank">
                <img v-if="album.images?.[2]?.url" :src="album.images[2].url" alt="Album Cover" class="w-12" />
              </a>
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">{{ album.name }}</td>
            <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">
              <UButton :to="album.external_urls.spotify" target="_blank" color="primary" variant="ghost" size="2xs"
                :ui="{ rounded: 'rounded-full' }" icon="i-heroicons-arrow-top-right-on-square" trailing>Open on Spotify
              </UButton>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </UCard>

  <Skeleton v-else />
</template>