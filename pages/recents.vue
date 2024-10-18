<script setup lang="ts">
interface SpotifyTrack {
  name: string
  external_urls: { spotify: string }
  album: { images: Array<{ url: string }> }
}

interface SpotifyRecentlyPlayedResponse {
  items: Array<{ track: SpotifyTrack }>
}

const spotify_data = ref<SpotifyTrack[] | null>(null)
const error = ref<string | null>(null)

const access_token = useCookie('access_token')

if (!access_token.value) {
  error.value = 'Access token not found'
}

try {
  const { data, error: fetchError } = await useFetch<SpotifyRecentlyPlayedResponse>(
    'https://api.spotify.com/v1/me/player/recently-played?limit=50',
    {
      headers: {
        Authorization: `Bearer ${access_token.value}`,
        'Content-Type': 'application/json'
      }
    }
  )

  if (fetchError?.value) {
    throw new Error(fetchError.value.message)
  }

  spotify_data.value = data.value?.items.map(item => item.track) || []
} catch (err) {
  error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  console.error('Error fetching recently played tracks:', err)
}

useSeoMeta({
  title: 'Recently Played on Spotify',
  description: 'Check out the tracks you recently played on Spotify.',
  ogTitle: 'Recently Played on Spotify',
  ogDescription: 'Check out the tracks you recently played on Spotify.',
  ogImage: '/android-chrome-512x512.png',
  ogUrl: useRequestURL().href,
  twitterTitle: 'Recently Played on Spotify',
  twitterDescription: 'Check out the tracks you recently played on Spotify.',
  twitterImage: '/android-chrome-512x512.png',
  twitterCard: 'summary'
})
</script>

<template>
  <AuthorizeSpotifyButton v-if="error" />

  <UCard v-else-if="spotify_data">
    <template #header>
      <h1 class="font-bold">Recently Played</h1>
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

        <tbody class="divide-y divide-gray-200">
          <tr class="hover:bg-primary-100 transition-all" v-for="(item, index) in spotify_data" :key="index">
            <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">
              <a :href="item.album.images[0].url" target="_blank">
                <img v-if="item.album.images?.[2]?.url" :src="item.album.images[2].url" alt="Album Image"
                  class="w-12" />
              </a>
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">{{ item.name }}</td>
            <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">
              <UButton :to="item.external_urls.spotify" target="_blank" color="primary" variant="ghost" size="2xs"
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