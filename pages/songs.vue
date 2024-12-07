<script setup lang="ts">
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

const access_token = useCookie('access_token')

if (!access_token.value) {
  error.value = 'Access token is missing'
}

onMounted(async () => {
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

    spotify_data.value = data.value
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    console.error('Error fetching top tracks:', err)
  }
})


useSeoMeta({
  title: 'Top Songs on Spotify',
  description: 'Top Songs on Spotify',
  ogTitle: 'Top Songs on Spotify',
  ogDescription: 'Top Songs on Spotify',
  ogImage: '/android-chrome-512x512.png',
  ogUrl: useRequestURL().href,
  twitterTitle: 'Top Songs on Spotify',
  twitterDescription: 'Top Songs on Spotify',
  twitterImage: '/android-chrome-512x512.png',
  twitterCard: 'summary'
})
</script>

<template>
  <AuthorizeSpotifyButton v-if="error" />

  <UCard v-else-if="spotify_data">
    <template #header>
      <h1 class="font-bold">Top Songs</h1>
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
          <tr class="hover:bg-primary-100 transition-all" v-for="(item, index) in spotify_data.items" :key="index">
            <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">
              <a :href="item.album.images[0].url" target="_blank">
                <img v-if="item.album?.images?.[2]?.url" :src="item.album.images[2].url" alt="Album cover"
                  class="w-12" />
              </a>
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">
              {{ item.name }}
            </td>
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