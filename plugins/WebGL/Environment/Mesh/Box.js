import { Mesh, DoubleSide, MeshStandardMaterial, BoxBufferGeometry } from 'three'

import WebGL from '../../WebGL'

export default class Spline {
  // Instantiate the application
  get _webgl () { return new WebGL() }
  // Access to the scene
  get _scene () { return this._webgl.scene }

  constructor (position) {
    // Add the mothod to your constructor
    this.position = position
    this._setInstance()
  }

  _setInstance () {
    const geometry = new BoxBufferGeometry(1, 10, 1)

    const material = new MeshStandardMaterial({
      color: 0xFF0000,
      side: DoubleSide
    })

    this.instance = new Mesh(geometry, material)
    this.instance.position.set(this.position.x, this.position.y, this.position.z)

    // Add the Mesh to the scene
    this._scene.add(this.instance)
  }
}
