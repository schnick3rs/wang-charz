// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
  ],

  css: ['~/assets/css/main.css'],

  supabase: {
    types: './types/database.types.ts',
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/forge(/.*)?'],
    },
  },

  runtimeConfig: {
    ctfSpaceId: process.env.CTF_SPACE_ID,
    ctfCdAccessToken: process.env.CTF_CD_ACCESS_TOKEN,
  },
})