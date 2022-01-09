import WebGL from '../WebGL'

// import GregoryModel from './Mesh/GregoryModel'

import Directional from './Lights/Directional'
import Hemisphere from './Lights/Hemisphere'

import Spline from './Mesh/Spline'
import Plane from './Mesh/Plane'
import Box from './Mesh/Box'

export default class Environment {
  get _webgl () { return new WebGL() }
  get _resources () { return this._webgl.resources }

  constructor () {
    this.directionalLight = new Directional()
    this.hemisphereLight = new Hemisphere()

    this.spline = new Spline()
    this.plane = new Plane()
    this.box1 = new Box({ x: 2, y: 0, z: -9 })
    this.box2 = new Box({ x: 2, y: 0, z: -16 })

    this._resources.on('ready', () => {
      // Add your components who needs loading here (Textures, GLTF, etc.)
      // this.gregoryModel = new GregoryModel()
    })
  }

  update () {
    // this.gregoryModel && this.gregoryModel.update()

    if (this.spline.walking) {
      this.spline && this.spline.update()
    }
  }
}
