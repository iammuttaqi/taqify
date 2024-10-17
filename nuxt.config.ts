// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  ssr: false,
  colorMode: {
    preference: 'light',
  },
  compatibilityDate: "2024-10-17"
})