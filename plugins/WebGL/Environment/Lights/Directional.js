import { DirectionalLight } from 'three'

import WebGL from '../../WebGL'

export default class Directional {
  // Instantiate the application
  get _webgl () { return new WebGL() }
  // Access to the scene
  get _scene () { return this._webgl.scene }

  constructor () {
    // Add the mothod to your constructor
    this._setInstance()
  }

  _setInstance () {
    this.instance = new DirectionalLight(0xFFEDD9, 0.25)
    this.instance.position.set(5, 5, 5)

    this.instance.castShadow = true

    this._scene.add(this.instance)
  }
}
