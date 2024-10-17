<script setup lang="ts">
useHead({
  title: 'Recently Played'
})

interface SpotifyTrack {
  name: string
  external_urls: {
    spotify: string
  }
  album: {
    images: Array<{
      url: string
    }>
  }
}

interface SpotifyRecentlyPlayedResponse {
  items: Array<{
    track: SpotifyTrack
  }>
}

const spotify_data = ref<SpotifyRecentlyPlayedResponse | null>(null)
const error = ref<Error | null>(null)

const fetchRecentlyPlayed = async () => {
  const access_token = localStorage.getItem('access_token')

  fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        error.value = data
      } else {
        spotify_data.value = data
      }
    })
    .catch((error) => {
      error.value = error
      console.error('Error fetching recently played tracks:', error)
    })
}

onMounted(() => {
  fetchRecentlyPlayed()
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
              <tr v-for="(item, index) in spotify_data.items" :key="index">
                <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                  <img :src="item.track.album.images[0].url" alt="" class="w-12" />
                </td>
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">{{ item.track.name }}</td>
                <td class="p-2 whitespace-nowrap text-sm text-gray-800">
                  <a :href="item.track.external_urls.spotify" target="_blank"
                    class="text-blue-500 hover:underline">Link</a>
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