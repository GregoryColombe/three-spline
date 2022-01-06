export default ({ app }, inject) => {
  const getDatasLanguage = lang => app.i18n.locales.find(x => x.code === lang)

  const endpoints = require('./contentful/endpoints.js')
  const methods = require('./contentful/methods.js')(getDatasLanguage(app.i18n.locale).iso)

  app.i18n.onLanguageSwitched = (oldLocale, newLocale, isInitialSetup, context) => {
    app.$contentful.setLanguage(getDatasLanguage(newLocale).iso)
  }

  inject('contentful', {
    ...endpoints,
    ...methods
  })
}
