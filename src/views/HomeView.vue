<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import { ref } from 'vue'

const getAccessToken = () => {
  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: '63cfca9112974961abac8f8008e8a989',
      client_secret: '608681b3a13f427aaae1cfa75f39133f'
    })
  })
    .then((response) => response.json())
    .then((data) => {
      return data.access_token
    })
    .catch((error) => {
      console.error('Error fetching access token:', error)
    })
}

const spotify_data = ref([])

const fetchSpotifyData = async () => {
  try {
    // const access_token = await getAccessToken()
    const access_token =
      'BQCFNfFxk4H01LxhHHoXvV9C9JGyjRq4G6p5M49BUiCvACYSOcjJOr99-ILb4mplpydapeLj-9i-8IfjhKF3T0Imi-V-hsr81hh760ANMKpqQd9U2yr41a36wLEYvl2HGjUJHNCadlxjeUUlSxiKxZjYXyf6o-X2Iv_rJpwSO5SbueBwUmIVBN1rj8Pc5cFqIKDFVOO8S4s'
    fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Spotify User Data:', data)
        spotify_data.value = data
      })
      .catch((error) => {
        console.error('Error fetching Spotify data:', error)
      })
  } catch (error) {
    console.error('Error:', error)
  }
}
fetchSpotifyData()
</script>

<template>
  <!-- <pre>{{ spotify_data }}</pre> -->

  <div class="flex flex-col">
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
</template>
