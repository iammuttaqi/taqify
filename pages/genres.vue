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

  <UCard v-else-if="top_genres">
    <template #header>
      <h1 class="font-bold">Top Genres</h1>
    </template>

    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-primary-500">

        <thead class="text-xs text-primary-700 uppercase bg-primary-50">
          <tr>
            <th scope="col" class="px-6 py-3">Cover</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-primary-200">
          <tr class="hover:bg-primary-100 transition-all" v-for="genre in top_genres" :key="genre">
            <td class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">{{ genre }}</td>
          </tr>
        </tbody>
      </table>

    </div>
  </UCard>

  <Skeleton v-else />
</template>