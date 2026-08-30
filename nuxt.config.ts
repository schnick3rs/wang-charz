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
      include: ['/forge/characters(/.*)?'],
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

  // SEO and META
  app: {

    head: {
      title: 'Doctors of Doom',
      titleTemplate: '%s | A Wrath & Glory fan page',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: 'Within the Warhammer 40k Universe, the Doctors of Doom are serving the Wrath & Glory roleplaying game community. Here you find homebrews and a character creator & manager.' },

        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'index,follow' },
        { name: 'keywords', content: 'Wrath and Glory,Wrath & Glory,W&G,Homebrew,40k,Warhammer,Roleplaying Game' },
        { name: 'theme-color', content: '#4caf50' },
        { name: 'google-site-verification', content: '5Eig5Vs_1-k3HAZdkGwTDu4Tu94AM9H-xny9n80IgJ0' },

        /**
         *  Open Graph, used in facebook
         */
        { name: 'og:site_name', content: 'Doctors of Doom' },
        { name: 'og:image', content: 'https://www.doctors-of-doom.com/img/background_abstract_green.jpg' },
        { name: 'og:type', content: 'website' },

        /**
         * Twitter Card, used in Twitter, Discord
         * @see https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary-card-with-large-image
         * @see https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary
         */
        { name: 'twitter:site', content: '@doctors_of_doom' },
        { name: 'twitter:creator', content: '@doctors_of_doom' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'shortcut icon', type: 'image/x-icon', sizes: '192x192', href: '/android-chrome-192x192.png' },
        { rel: 'icon', type: 'image/x-icon', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/x-icon', sizes: '16x16', href: '/favicon-16x16.png' },
      ],
    },
  }
})