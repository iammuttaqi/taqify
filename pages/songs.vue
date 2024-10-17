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
                  <a :href="item.album.images[0].url" target="_blank">
                    <img v-if="item.album?.images?.[2]?.url" :src="item.album.images[2].url" alt="Album cover"
                      class="w-12" />
                  </a>
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