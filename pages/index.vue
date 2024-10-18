<script setup lang="ts">
interface SpotifyUser {
  display_name: string
  external_urls: { spotify: string }
  followers: { total: number }
  images: Array<{ url: string }>
}

const spotify_data = ref<SpotifyUser | null>(null)
const error = ref<Error | null>(null)

const access_token = useCookie('access_token')

if (access_token) {
  const { data, error: fetchError } = await useFetch<SpotifyUser>('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${access_token.value}` }
  })

  spotify_data.value = data.value
  error.value = fetchError.value
} else {
  error.value = new Error('Access token not found')
}
</script>

<template>
  <div class="space-y-4">
    <AuthorizeSpotifyButton v-if="error" />

    <UCard v-else-if="spotify_data">
      <template #header>
        <h1 class="font-bold">Profile</h1>
      </template>

      <div class="flex flex-col">
        <div class="overflow-x-auto">
          <div class="min-w-full inline-block align-middle">
            <div class="overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <tbody class="divide-y divide-gray-200">
                  <tr>
                    <td class="p-2 whitespace-nowrap text-sm text-gray-800">Image</td>
                    <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                      <img :src="spotify_data?.images[0].url" alt="" />
                    </td>
                  </tr>
                  <tr>
                    <td class="p-2 whitespace-nowrap text-sm text-gray-800">Name</td>
                    <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                      {{ spotify_data?.display_name }}
                    </td>
                  </tr>
                  <tr>
                    <td class="p-2 whitespace-nowrap text-sm text-gray-800">Link</td>
                    <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                      {{ spotify_data?.external_urls.spotify }}
                    </td>
                  </tr>
                  <tr>
                    <td class="p-2 whitespace-nowrap text-sm text-gray-800">Followers</td>
                    <td class="p-2 whitespace-nowrap text-sm font-bold text-gray-800">
                      {{ spotify_data?.followers.total }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <Skeleton v-else />
  </div>
</template>