<script setup lang="ts">
useHead({
  title: 'Wrapped'
})

interface SpotifyTrack {
  name: string
  album: {
    images: Array<{
      url: string
    }>
  }
  external_urls: {
    spotify: string
  }
}

interface SpotifyArtist {
  name: string
  external_urls: {
    spotify: string
  }
  images: Array<{
    url: string
  }>
}

interface SpotifyTopTracksResponse {
  items: SpotifyTrack[]
}

interface SpotifyTopArtistsResponse {
  items: SpotifyArtist[]
}

const spotify_top_tracks = ref<SpotifyTopTracksResponse | null>(null)
const spotify_top_artists = ref<SpotifyTopArtistsResponse | null>(null)
const error = ref<string | null>(null)

const fetchTopTracksOfYear = async () => {
  const access_token = localStorage.getItem('access_token')

  if (!access_token) {
    error.value = 'No access token found'
    return
  }

  try {
    const response = await fetch(
      'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', // For the past 6 months, change this to `long_term` for 1 year.
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    if (!response.ok) {
      throw new Error('Error fetching top tracks: ' + response.statusText)
    }

    const data: SpotifyTopTracksResponse = await response.json()
    spotify_top_tracks.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  }
}

const fetchTopArtistsOfYear = async () => {
  const access_token = localStorage.getItem('access_token')

  if (!access_token) {
    error.value = 'No access token found'
    return
  }

  try {
    const response = await fetch(
      'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    if (!response.ok) {
      throw new Error('Error fetching top artists: ' + response.statusText)
    }

    const data: SpotifyTopArtistsResponse = await response.json()
    spotify_top_artists.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  }
}

fetchTopTracksOfYear()
fetchTopArtistsOfYear()
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
                <tr v-for="(track, index) in spotify_top_tracks.items" :key="index">
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
                <tr v-for="(artist, index) in spotify_top_artists.items" :key="index">
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