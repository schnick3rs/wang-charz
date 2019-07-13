const colors = require('vuetify/es5/util/colors').default;

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    titleTemplate: '%s - Doctors of Doom',
    title: 'Doctors of Doom' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'robots', name: 'robots', content: 'index,follow' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'keywords', name: 'keywords', content: 'Wrath ang Glory,Wrath & Glory,W&G,Hombrew,40k,Warhammer,Roleplaying Game' },
      { hid: 'google-site-verification', name: 'google-site-verification', content: '5Eig5Vs_1-k3HAZdkGwTDu4Tu94AM9H-xny9n80IgJ0' },
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      {
        rel: 'shortcut icon', type: 'image/x-icon', sizes: '192x192', href: '/android-chrome-192x192.png',
      },
      {
        rel: 'icon', type: 'image/x-icon', sizes: '32x32', href: '/favicon-32x32.png',
      },
      {
        rel: 'icon', type: 'image/x-icon', sizes: '16x16', href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/vuetify',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/eslint-module'
    // Simple usage
    ['@nuxtjs/google-analytics', {
      id: 'UA-141676237-2',
      disabled: false,
      set: [
        { field: 'anonymizeIp', value: true },
      ],
      debug: {
        sendHitTask: process.env.NODE_ENV === 'production',
      },
    }],
    // create a dynamic sitemap
    '@nuxtjs/sitemap',
  ],
  /*
   * Sitemap module configuration
   */
  sitemap: {
    hostname: 'https://www.doctors-of-doom.com',
    gzip: true,
    exclude: [
      '/builder/char/**',
    ],
    routes() {
      return [
        '/vault/agents-of-the-golden-throne',
        '/vault/expanded-voidship-combat-rules',
        '/vault/god-engines',
        '/vault/hesperaxs-vault',
        '/vault/legacy-of-the-necrontyr',
        '/vault/let-the-galaxy-burn',
        '/vault/the-deathwatch---slayers-of-the-alien-horde',
        '/vault/the-emperors-angels',
        '/vault/the-high-altar-of-technology',
        '/vault/tome-of-glory',
        '/vault/tyranids',
      ];
    },
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    theme: {
      primary: colors.blue.darken2,
      accent: colors.grey.darken3,
      secondary: colors.amber.darken3,
      info: colors.teal.lighten1,
      warning: colors.amber.base,
      error: colors.deepOrange.accent4,
      success: colors.green.accent3,
    },
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
  },
  serverMiddleware: [
    'redirect-ssl',
    // '~/api/index.js'
  ],
};
