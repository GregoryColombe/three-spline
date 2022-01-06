import { HemisphereLight } from 'three'

import WebGL from '../../WebGL'

export default class Hemisphere {
  // Instantiate the application
  get _webgl () { return new WebGL() }
  // Access to the scene
  get _scene () { return this._webgl.scene }

  constructor () {
    // Add the mothod to your constructor
    this._setInstance()
  }

  _setInstance () {
    this.instance = new HemisphereLight(0xFFFFFF, 0xFFFFFF, 1.5)

    this._scene.add(this.instance)
  }
}
