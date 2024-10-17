<script setup lang="ts">
interface SpotifyUser {
  display_name: string
  external_urls: {
    spotify: string
  }
  followers: {
    total: number
  }
  images: Array<{
    url: string
  }>
}

const spotify_data = ref<SpotifyUser | null>(null)
const error = ref<Error | null>(null)

const fetchSpotifyData = async () => {
  try {
    const access_token = localStorage.getItem('access_token')

    fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`
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
        console.error('Error fetching Spotify data:', error)
        error.value = error
      })
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err
      console.error('Error:', err.message)
    } else {
      console.error('Unknown error:', err)
    }
  }
}
fetchSpotifyData()
</script>

<template>
  <div class="space-y-4">
    <AuthorizeSpotifyButton v-if="error" />

    <div class="flex flex-col" v-else-if="spotify_data">
      <div class="overflow-x-auto">
        <div class="min-w-full inline-block align-middle">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="p-2 whitespace-nowrap text-sm text-gray-800">Image</td>
                  <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                    <img :src="spotify_data.images[0].url" alt="" />
                  </td>
                </tr>
                <tr>
                  <td class="p-2 whitespace-nowrap text-sm text-gray-800">Name</td>
                  <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                    {{ spotify_data.display_name }}
                  </td>
                </tr>
                <tr>
                  <td class="p-2 whitespace-nowrap text-sm text-gray-800">Link</td>
                  <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                    {{ spotify_data.external_urls.spotify }}
                  </td>
                </tr>
                <tr>
                  <td class="p-2 whitespace-nowrap text-sm text-gray-800">Followers</td>
                  <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                    {{ spotify_data.followers.total }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <Skeleton v-else />
  </div>
</template>