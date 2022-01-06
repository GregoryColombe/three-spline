import WebGL from './WebGL/WebGL.js'

export default ({ query, store }, inject) => {
  inject('WebGL', new WebGL(
    document.querySelector('#webgl'),
    query.debug || query.debug === null,
    ({ action, value }) => {
      action &&
        store.dispatch(`webgl/${action}`, value)
    }
  ))
}
