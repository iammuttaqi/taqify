// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  ssr: false,
  colorMode: {
    preference: 'light',
  },
  app: {
    head: {
      title: 'Taqify - Your Personalized Spotify Experience',
      meta: [
        { property: 'title', content: 'Taqify - Your Personalized Spotify Experience' },
        { property: 'description', content: 'Taqify - Your Personalized Spotify Experience' },
        { property: 'ogTitle', content: 'Taqify - Your Personalized Spotify Experience' }, 
        { property: 'ogDescription', content: 'Explore your Spotify stats and enjoy music insights tailored for you.' }, 
        { property: 'ogImage', content: '/android-chrome-512x512.png' }, 
        { property: 'ogUrl', content: 'https://taqify.netlify.app' }, 
        { property: 'twitterTitle', content: 'Taqify - Your Personalized Spotify Experience' }, 
        { property: 'twitterDescription', content: 'Dive into your favorite tracks and artists with Taqify.' }, 
        { property: 'twitterImage', content: '/android-chrome-512x512.png' }, 
        { property: 'twitterCard', content: 'summary_large_image ' } 
      ]
    },
  },
  compatibilityDate: "2024-10-17"
})