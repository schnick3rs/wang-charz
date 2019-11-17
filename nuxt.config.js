const colors = require('vuetify/es5/util/colors').default;

const axios = require('axios');

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    titleTemplate: '%s',
    title: 'Doctors of Doom' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'robots', name: 'robots', content: 'index,follow' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'keywords', name: 'keywords', content: 'Wrath and Glory,Wrath & Glory,W&G,Homebrew,40k,Warhammer,Roleplaying Game' },
      { hid: 'theme-color', name: 'theme-color', content: '#4caf50' },
      { hid: 'google-site-verification', name: 'google-site-verification', content: '5Eig5Vs_1-k3HAZdkGwTDu4Tu94AM9H-xny9n80IgJ0' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Doctors of Doom' },
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'shortcut icon', type: 'image/x-icon', sizes: '192x192', href: '/android-chrome-192x192.png' },
      { rel: 'icon', type: 'image/x-icon', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/x-icon', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'stylesheet', href: '/css/materialdesignicons.min.css' },
      { rel: 'preload', href: '/fonts/Material-Icons.woff2', as: 'font', type: 'font/woff2', crossorigin: 'crossorigin' },
      { rel: 'preload', href: '/fonts/Roboto-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: 'crossorigin', },
      { rel: 'preload', href: '/fonts/Roboto-Medium.woff2', as: 'font', type: 'font/woff2', crossorigin: 'crossorigin', },
      { rel: 'preload', href: '/fonts/Roboto-Bold.woff2', as: 'font', type: 'font/woff2', crossorigin: 'crossorigin', },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: colors.green.base },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/config/_fonts.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false },
    '~plugins/filters.js',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    ['@nuxtjs/vuetify', {
      /* @see https://github.com/nuxt-community/vuetify-module#defaultassets */
      defaultAssets: false
    }],
    '@nuxtjs/sitemap',
    '@nuxtjs/axios',
    //'@nuxtjs/auth',
    ['@nuxtjs/redirect-module', [
        { from: '^/builder.*', to: '/forge/my-characters', statusCode: 301 },
        { from: '^/vault/the-emperors-angles', to: '/vault/the-emperors-angels', statusCode: 301 },
    ]],
    // https://github.com/nuxt-community/redirect-module
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
    ['@nuxtjs/pwa', {
      manifest: false
    }],
  ],

  /*
   * Sitemap module configuration
   */
  sitemap: {
    hostname: 'https://www.doctors-of-doom.com',
    gzip: true,
    exclude: [
      // dynamic and user specific parts should not be sitemaped
      '/forge/characters/**',
    ],
    routes: async () => {
      const base = process.env.NODE_ENV === 'production' ? 'https://www.doctors-of-doom.com' : 'http://localhost:3000';

      const homebrewResponse = await axios.get(`${base}/api/homebrews/`);
      const homebrewRoutes = homebrewResponse.data.map( (vaultItem) => `/vault/${vaultItem.slug}`);

      const threatResponse = await axios.get(`${base}/api/threats/`);
      const threatRoutes = threatResponse.data
        .filter( (vaultItem) => vaultItem.source.key !== 'core' )
        .map( (vaultItem) => {
          const slug = vaultItem.key.replace(/([a-z][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase() })
          return `/bestiary/${slug}`;
        })
      ;

      return [
        ...homebrewRoutes,
        ...threatRoutes
      ];
    },
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
      lastmodrealtime: true,
    },
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    //baseURL: process.env.NODE_ENV === 'production' ? 'https://www.doctors-of-doom.com' : 'http://localhost:3000',
    baseURL: 'https://www.doctors-of-doom.com',
    //baseURL: 'http://localhost:3000',
    browserBaseURL: '/',
    // debug: process.env.NODE_ENV !== 'production',
  },
  proxy: {
    //'/api/': 'https://www.doctors-of-doom.com', // only for development
  },

  /*auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'api/users/login', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: 'api/users/me', mthod: 'get', propertyName: 'data'},
        },
        // tokenRequired: true,
        // tokenType: 'Bearer'
      },
    },
    plugins: [
      '~/plugins/auth.js'
    ]
  },*/

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
      success: colors.green.base,
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
    '~/api/express', // handles /api/** calls
  ],
};
