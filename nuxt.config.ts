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
        { property: 'og:title', content: 'Taqify - Your Personalized Spotify Experience' }, 
        { property: 'og:description', content: 'Explore your Spotify stats and enjoy music insights tailored for you.' }, 
        { property: 'og:image', content: '/android-chrome-512x512.png' }, 
        { property: 'og:url', content: 'https://taqify.netlify.app' }, 
        { property: 'twitter:title', content: 'Taqify - Your Personalized Spotify Experience' }, 
        { property: 'twitter:description', content: 'Dive into your favorite tracks and artists with Taqify.' }, 
        { property: 'twitter:image', content: '/android-chrome-512x512.png' }, 
        { property: 'twitter:card', content: 'summary_large_image ' } 
      ]
    },
  },
  compatibilityDate: "2024-10-17"
})