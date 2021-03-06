import { Mesh, DoubleSide, PlaneBufferGeometry, MeshStandardMaterial } from 'three'

import WebGL from '../../WebGL'

export default class Spline {
  // Instantiate the application
  get _webgl () { return new WebGL() }
  // Access to the scene
  get _scene () { return this._webgl.scene }

  constructor () {
    // Add the mothod to your constructor
    this._setInstance()
  }

  _setInstance () {
    const geometry = new PlaneBufferGeometry(40, 100)

    const material = new MeshStandardMaterial({
      color: 0xFFFFFF,
      side: DoubleSide
    })

    this.instance = new Mesh(geometry, material)
    this.instance.rotation.x = -Math.PI / 2
    this.instance.position.y = -0.05

    // Add the Mesh to the scene
    this._scene.add(this.instance)
  }
}
