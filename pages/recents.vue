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

  <div class="flex flex-col" v-else-if="spotify_data">
    <h3 class="text-lg font-bold mb-4">Recently Played</h3>

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
              <tr v-for="(item, index) in spotify_data" :key="index">
                <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                  <!-- <pre>{{ item.album.images }}</pre> -->
                  <a :href="item.album.images[0].url" target="_blank">
                    <img :src="item.album.images[2].url" :alt="item.album.images[2].url" class="w-12" />
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