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

onMounted(async () => {
  if (access_token) {
    const { data, error: fetchError } = await useFetch<SpotifyUser>('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token.value}` }
    })

    spotify_data.value = data.value
    error.value = fetchError.value
  } else {
    error.value = new Error('Access token not found')
  }
})
</script>

<template>
  <div class="space-y-4">
    <AuthorizeSpotifyButton v-if="error" />

    <UCard v-else-if="spotify_data">
      <template #header>
        <h1 class="font-bold">Profile</h1>
      </template>

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <tbody>
            <tr class="border-b">
              <td class="px-6 py-4">Avatar</td>
              <td class="px-6 py-4">
                <a :href="spotify_data?.images[0].url" target="_blank">
                  <img v-if="spotify_data?.images[1].url" :src="spotify_data?.images[1].url"
                    :alt="spotify_data?.display_name" class="w-12" />
                </a>
              </td>
            </tr>

            <tr class="border-b">
              <td scope="row" class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">Name</td>
              <td scope="row" class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">{{
                spotify_data?.display_name
              }}</td>
            </tr>

            <tr class="border-b">
              <td scope="row" class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">Link</td>
              <td scope="row" class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">{{
                spotify_data?.external_urls.spotify }}</td>
            </tr>

            <tr>
              <td scope="row" class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">Followers</td>
              <td scope="row" class="px-6 py-4 font-medium text-gray-900 break-words max-w-xs">{{
                spotify_data?.followers.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <Skeleton v-else />
  </div>
</template>