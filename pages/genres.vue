<script setup lang="ts">
interface SpotifyArtist {
  genres: string[]
}

interface SpotifyTopArtistsResponse {
  items: SpotifyArtist[]
}

const top_genres = ref<string[] | null>(null)
const error = ref<string | null>(null)

const access_token = useCookie('access_token')

if (!access_token.value) {
  error.value = 'No access token found'
}

try {
  const { data, error: fetchError } = await useFetch<SpotifyTopArtistsResponse>(
    'https://api.spotify.com/v1/me/top/artists?limit=50',
    {
      headers: {
        Authorization: `Bearer ${access_token.value}`,
        'Content-Type': 'application/json',
      }
    }
  )

  if (fetchError.value) {
    throw new Error(fetchError.value.message)
  }

  if (data.value?.items?.length) {
    const genres = Array.from(
      new Set(
        data.value.items.flatMap(artist =>
          artist.genres
            .filter(Boolean)
            .map(genre =>
              genre
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')
            )
        )
      )
    )
    top_genres.value = genres
  } else {
    error.value = 'No genres found in the response.'
  }
} catch (err) {
  error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  console.error('Error fetching top artists:', err)
}

useSeoMeta({
  title: 'Top Genres on Spotify',
  description: 'Top Genres on Spotify',
  ogTitle: 'Top Genres on Spotify',
  ogDescription: 'Top Genres on Spotify',
  ogImage: '/android-chrome-512x512.png',
  ogUrl: useRequestURL().href,
  twitterTitle: 'Top Genres on Spotify',
  twitterDescription: 'Top Genres on Spotify',
  twitterImage: '/android-chrome-512x512.png',
  twitterCard: 'summary'
})
</script>

<template>
  <AuthorizeSpotifyButton v-if="error" />

  <div v-else-if="top_genres" class="flex flex-col">
    <h3 class="text-lg font-bold mb-4">Top Genres</h3>

    <div class="overflow-x-auto">
      <div class="min-w-full inline-block align-middle">
        <div class="overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200 text-left">
            <thead>
              <tr>
                <th class="p-2">Genre</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="genre in top_genres" :key="genre">
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">{{ genre }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <Skeleton v-else />
</template>