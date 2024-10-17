<script setup lang="ts">
const loading_message = ref('Fetching...');

const setAccessToken = async () => {
  const url = useRequestURL()
  const access_token = new URLSearchParams(url.hash.substring(1)).get('access_token');

  if (access_token) {
    const access_token_cookie = useCookie('access_token')
    access_token_cookie.value = access_token
  }
}

onMounted(async () => {
  await setAccessToken();
  loading_message.value = 'Redirecting...';
  navigateTo('/')
})
</script>

<template>
  <div>{{ loading_message }}</div>
</template>
