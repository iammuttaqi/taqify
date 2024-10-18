<script setup lang="ts">
interface SpotifyTrack {
  name: string
  album: { images: Array<{ url: string }> }
  external_urls: { spotify: string }
}

interface SpotifyArtist {
  name: string
  external_urls: { spotify: string }
  images: Array<{ url: string }>
}

interface SpotifyTopTracksResponse {
  items: SpotifyTrack[]
}

interface SpotifyTopArtistsResponse {
  items: SpotifyArtist[]
}

// State variables
const spotify_top_tracks = ref<SpotifyTrack[] | null>(null)
const spotify_top_artists = ref<SpotifyArtist[] | null>(null)
const error = ref<string | null>(null)

// Access token from cookies
const access_token = useCookie('access_token')

if (!access_token.value) {
  error.value = 'Access token not found'
}

try {
  const { data, error: fetchError } = await useFetch<SpotifyTopTracksResponse>(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term',
    {
      headers: {
        Authorization: `Bearer ${access_token.value}`,
        'Content-Type': 'application/json'
      }
    }
  )
  if (fetchError?.value) throw new Error(fetchError.value.message)

  spotify_top_tracks.value = data.value?.items || []
} catch (err) {
  error.value = err instanceof Error ? err.message : 'Unknown error occurred'
}

try {
  const { data, error: fetchError } = await useFetch<SpotifyTopArtistsResponse>(
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term',
    {
      headers: {
        Authorization: `Bearer ${access_token.value}`,
        'Content-Type': 'application/json'
      }
    }
  )
  if (fetchError?.value) throw new Error(fetchError.value.message)

  spotify_top_artists.value = data.value?.items || []
} catch (err) {
  error.value = err instanceof Error ? err.message : 'Unknown error occurred'
}

useSeoMeta({
  title: 'Your Spotify Wrapped',
  description: 'Discover your most played tracks and artists of the year.',
  ogTitle: 'Spotify Wrapped',
  ogDescription: 'Check out your top tracks and artists of the year.',
  ogImage: '/android-chrome-512x512.png',
  ogUrl: useRequestURL().href,
  twitterTitle: 'Spotify Wrapped',
  twitterDescription: 'Discover your most played tracks and artists of the year.',
  twitterImage: '/android-chrome-512x512.png',
  twitterCard: 'summary'
})
</script>

<template>
  <AuthorizeSpotifyButton v-if="error" :errorMessage="error" />

  <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
    <UAlert class="col-span-full" icon="i-heroicons-command-line" color="yellow" variant="subtle" title="Heads up!"
      description="You can add components to your app using the cli.">
      <template #title="{ title }">
        Attention
      </template>

      <template #description>
        Please note that the contents displayed on this page are subject
        to change as the year progresses. Additionally, Spotify does not offer specific API endpoints
        for retrieving yearly-based tracks and artists, so the information provided reflects the top
        tracks and artists as determined by Spotify's overall metrics.
      </template>
    </UAlert>

    <div>
      <UCard v-if="spotify_top_tracks">
        <template #header>
          <h1 class="font-bold">Top Tracks of the Year</h1>
        </template>

        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-primary-500">

            <thead class="text-xs text-primary-700 uppercase bg-primary-50">
              <tr>
                <th scope="col" class="px-6 py-3">Cover</th>
                <th scope="col" class="px-6 py-3">Track Name</th>
                <th scope="col" class="px-6 py-3">Link</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <tr class="hover:bg-primary-100 transition-all" v-for="(track, index) in spotify_top_tracks" :key="index">
                <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">
                  <a :href="track.album.images[0].url" target="_blank">
                    <img v-if="track.album.images?.[2]?.url" :src="track.album.images[2].url" alt="Track Image"
                      class="w-12" />
                  </a>
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-4">{{ track.name }}</td>
                <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">
                  <UButton :to="track.external_urls.spotify" target="_blank" color="primary" variant="ghost" size="2xs"
                    :ui="{ rounded: 'rounded-full' }" icon="i-heroicons-arrow-top-right-on-square" trailing>Open on
                    Spotify
                  </UButton>
                </td>
              </tr>
            </tbody>

          </table>
        </div>
      </UCard>

      <Skeleton v-else />
    </div>

    <div>
      <UCard v-if="spotify_top_artists">
        <template #header>
          <h1 class="font-bold">Top Artists of the Year</h1>
        </template>

        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-primary-500">

            <thead class="text-xs text-primary-700 uppercase bg-primary-50">
              <tr>
                <th scope="col" class="px-6 py-3">Cover</th>
                <th scope="col" class="px-6 py-3">Artist Name</th>
                <th scope="col" class="px-6 py-3">Link</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-primary-200">
              <tr class="hover:bg-primary-100 transition-all" v-for="(artist, index) in spotify_top_artists"
                :key="index">
                <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">
                  <a :href="artist.images[0].url" target="_blank">
                    <img v-if="artist.images?.[2]?.url" :src="artist.images[2].url" alt="Artist Image" class="w-12" />
                  </a>
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">{{ artist.name }}</td>
                <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">
                  <UButton :to="artist.external_urls.spotify" target="_blank" color="primary" variant="ghost" size="2xs"
                    :ui="{ rounded: 'rounded-full' }" icon="i-heroicons-arrow-top-right-on-square" trailing>Open on
                    Spotify
                  </UButton>
                </td>
              </tr>
            </tbody>

          </table>
        </div>

      </UCard>

      <Skeleton v-else />
    </div>

  </div>
</template>