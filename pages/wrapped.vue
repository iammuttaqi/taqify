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

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
    <div class="bg-yellow-200 col-span-full p-4 rounded-lg">
      <strong>Attention:</strong> Please note that the contents displayed on this page are subject
      to change as the year progresses. Additionally, Spotify does not offer specific API endpoints
      for retrieving yearly-based tracks and artists, so the information provided reflects the top
      tracks and artists as determined by Spotify's overall metrics.
    </div>

    <div class="space-y-8 border border-purple-500 p-4 rounded-lg">
      <h2 class="text-2xl font-bold">Top Tracks of the Year</h2>

      <!-- Top Tracks -->
      <div class="overflow-x-auto" v-if="spotify_top_tracks">
        <div class="min-w-full inline-block align-middle">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 text-left">
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Track Name</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(track, index) in spotify_top_tracks" :key="index">
                  <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                    <img :src="track.album.images[0].url" alt="Track Cover" class="w-12" />
                  </td>
                  <td class="p-2 whitespace-nowrap text-sm text-gray-800">{{ track.name }}</td>
                  <td class="p-2 whitespace-nowrap text-sm text-gray-800">
                    <a :href="track.external_urls.spotify" target="_blank"
                      class="text-blue-500 hover:underline">Link</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Skeleton v-else />
    </div>

    <div class="space-y-8 border border-purple-500 p-4 rounded-lg">
      <h2 class="text-2xl font-bold">Top Artists of the Year</h2>

      <!-- Top Artists -->
      <div class="overflow-x-auto" v-if="spotify_top_artists">
        <div class="min-w-full inline-block align-middle">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 text-left">
              <thead>
                <tr>
                  <th>Artist Picture</th>
                  <th>Artist Name</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(artist, index) in spotify_top_artists" :key="index">
                  <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                    <img :src="artist.images[0].url" alt="Artist Picture" class="w-12" />
                  </td>
                  <td class="p-2 whitespace-nowrap text-sm text-gray-800">{{ artist.name }}</td>
                  <td class="p-2 whitespace-nowrap text-sm text-gray-800">
                    <a :href="artist.external_urls.spotify" target="_blank"
                      class="text-blue-500 hover:underline">Link</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Skeleton v-else />
    </div>
  </div>
</template>