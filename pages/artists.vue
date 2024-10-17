<script setup lang="ts">
interface SpotifyArtist {
  name: string
  external_urls: { spotify: string }
  images: Array<{ url: string }>
}

interface SpotifyTopArtistsResponse {
  items: SpotifyArtist[]
}

// State variables
const spotify_data = ref<SpotifyArtist[] | null>(null)
const error = ref<string | null>(null)

// Use cookies to retrieve the access token for SSR and client use
const access_token = useCookie('access_token')

if (!access_token.value) {
  error.value = 'Access token not found.'
}

try {
  const { data, error: fetchError } = await useFetch<SpotifyTopArtistsResponse>(
    'https://api.spotify.com/v1/me/top/artists?limit=50',
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

  spotify_data.value = data.value?.items ?? []
} catch (err) {
  error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  console.error('Error fetching top artists:', err)
}

useSeoMeta({
  title: 'Top Artists on Spotify',
  description: 'Top Artists on Spotify',
  ogTitle: 'Top Artists on Spotify',
  ogDescription: 'Top Artists on Spotify',
  ogImage: '/favicon.ico',
  ogUrl: useRequestURL().href,
  twitterTitle: 'Top Artists on Spotify',
  twitterDescription: 'Top Artists on Spotify',
  twitterImage: '/favicon.ico',
  twitterCard: 'summary'
})
</script>

<template>
  <AuthorizeSpotifyButton v-if="error" :errorMessage="error" />

  <div class="flex flex-col" v-else-if="spotify_data">
    <h3 class="text-lg font-bold mb-4">Top Artists</h3>

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
                  <img v-if="artist.images?.[0]?.url" :src="artist.images[0].url" alt="Artist Image" class="w-12" />
                </td>
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">{{ artist.name }}</td>
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">
                  <a :href="artist.external_urls.spotify" target="_blank" class="text-blue-500 hover:underline">Link</a>
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