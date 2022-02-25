import WebGL from '../WebGL'

import Map from './Mesh/Map'

import Directional from './Lights/Directional'
import Hemisphere from './Lights/Hemisphere'

import Spline from './Mesh/Spline'
import Plane from './Mesh/Plane'
// import Box from './Mesh/Box'

export default class Environment {
  get _webgl () { return new WebGL() }
  get _resources () { return this._webgl.resources }

  constructor () {
    this.directionalLight = new Directional()
    this.hemisphereLight = new Hemisphere()

    this.spline = new Spline()
    this.plane = new Plane()
    // this.box1 = new Box({ x: 3, y: 0, z: 4 })
    // this.box2 = new Box({ x: 5, y: 0, z: -6.5 })

    this._resources.on('ready', () => {
      // Add your components who needs loading here (Textures, GLTF, etc.)
      this.map = new Map()
    })
  }

  update () {
    // this.map && this.map.update()

    if (this.spline.walking) {
      this.spline && this.spline.update()
    }
  }
}
