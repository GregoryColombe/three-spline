export default {
  target: 'static',
  head: {
    title: 'The Green Door - N01',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/assets/styles/main.scss'
  ],
  styleResources: {
    scss: [
      '~/assets/styles/config/_variables.scss',
      '~/assets/styles/config/_fonts.scss',
      '~/assets/styles/config/_breakpoints.scss',
      '~/assets/styles/config/_mixins.scss'
    ]
  },
  stylelint: {
    files: ['**/*.scss'],
    failOnError: false
  },
  plugins: [
    // '~/plugins/contentful.js',
    '~/plugins/webgl.client.js'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/stylelint-module'
  ],
  modules: [
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.js' }
    ],
    lazy: true,
    langDir: 'i18n',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    vueI18n: {
      fallbackLocale: 'en',
      fallbackRoot: true,
      silentFallbackWarn: true
    }
  },
  build: {
    transpile: ['three'],
    postcss: false,
    extend (config) {
      /**
       * GLSL loader
       */
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader']
      })
    }
  },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_TOKEN: process.env.CTF_TOKEN
  }
}
