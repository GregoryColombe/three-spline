import { CineonToneMapping, PCFSoftShadowMap, sRGBEncoding, WebGLRenderer } from 'three'

import WebGL from '../WebGL'

export default class Renderer {
  get _webgl () { return new WebGL() }
  get _canvas () { return this._webgl.canvas }
  get _sizes () { return this._webgl.sizes }
  get _scene () { return this._webgl.scene }
  get _camera () { return this._webgl.camera }

  constructor () {
    this._setInstance()
  }

  _setInstance () {
    this.instance = new WebGLRenderer({
      canvas: this._canvas,
      antialias: true
    })

    this.instance.physicallyCorrectLights = true
    this.instance.outputEncoding = sRGBEncoding
    this.instance.toneMapping = CineonToneMapping
    this.instance.toneMappingExposure = 1.75
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = PCFSoftShadowMap
    this.instance.setClearColor('#202020')
    this.instance.setSize(this._sizes.width, this._sizes.height)
    this.instance.setPixelRatio(this._sizes.pixelRatio)
  }

  update () {
    this.instance.render(this._scene, this._camera.instance)
  }

  resize () {
    this.instance.setSize(this._sizes.width, this._sizes.height)
    this.instance.setPixelRatio(this._sizes.pixelRatio)
  }
}
