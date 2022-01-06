const contentful = require('contentful')

const client = contentful.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_TOKEN
})

module.exports = (lang = 'en-US') => ({
  lang,
  setLanguage (lang) {
    this.lang = lang
  },
  getEntries () {
    return new Promise((resolve, reject) => (
      client
        .getEntries({
          locale: this.lang,
          limit: 10
        })
        .then(resolve)
        .catch(reject)
    ))
  },
  getEntryByID (id) {
    return new Promise((resolve, reject) => (
      client
        .getEntry(id, {
          locale: this.lang,
          limit: 10
        })
        .then(resolve)
        .catch(reject)
    ))
  },
  getEntriesByType (type) {
    return new Promise((resolve, reject) => (
      client
        .getEntries({
          locale: this.lang,
          content_type: type,
          limit: 10
        })
        .then(resolve)
        .catch(reject)
    ))
  }
})
