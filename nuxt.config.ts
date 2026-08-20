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

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', icon: 'us', name: 'English' },
      { code: 'fr', language: 'fr-FR', file: 'fr.json', icon: 'fr', name: 'Français' },
      { code: 'de', language: 'de-DE', file: 'de.json', icon: 'de', name: 'Deutsch' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  runtimeConfig: {
    ctfSpaceId: process.env.CTF_SPACE_ID,
    ctfCdAccessToken: process.env.CTF_CD_ACCESS_TOKEN,
  },
})