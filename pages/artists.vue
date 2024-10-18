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
  ogImage: '/android-chrome-512x512.png',
  ogUrl: useRequestURL().href,
  twitterTitle: 'Top Artists on Spotify',
  twitterDescription: 'Top Artists on Spotify',
  twitterImage: '/android-chrome-512x512.png',
  twitterCard: 'summary'
})
</script>

<template>
  <AuthorizeSpotifyButton v-if="error" :errorMessage="error" />

  <UCard v-else-if="spotify_data">
    <template #header>
      <h1 class="font-bold">Top Artists</h1>
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
          <tr class="hover:bg-primary-100 transition-all" v-for="(artist, index) in spotify_data" :key="index">
            <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">
              <a :href="artist.images[0].url" target="_blank">
                <img v-if="artist.images?.[2]?.url" :src="artist.images[2].url" alt="Artist Image" class="w-12" />
              </a>
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">{{ artist.name }}</td>
            <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">
              <UButton :to="artist.external_urls.spotify" target="_blank" color="primary" variant="ghost" size="2xs"
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