import { PerspectiveCamera, Vector2 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import WebGL from '../WebGL.js'

export default class Camera {
  get _webgl () { return new WebGL() }
  get _canvas () { return this._webgl.canvas }
  get _sizes () { return this._webgl.sizes }
  get _scene () { return this._webgl.scene }
  get _config () { return this._webgl.config }
  get _debug () { return this._webgl.debug }

  constructor () {
    this.params = {
      controls: this._debug.active
    }
    this.mouse = {
      x: 0,
      y: 0
    }
    this.target = {
      x: 0,
      y: 0
    }
    this.windowHalf = 0
    this.speedRotate = 0.002
    this.followActive = false

    this._setInstance()
    this.addEvents()
    // this._debug.active && this._setOrbitControls()
  }

  _setInstance () {
    this.instance = new PerspectiveCamera(
      35,
      this._sizes.width / this._sizes.height,
      0.1,
      1000
    )
    this.instance.position.set(0, 0.25, 0)
    this._scene.add(this.instance)
  }

  addEvents () {
    // if is mobile or tablette
    if ((window.innerWidth <= 1024) && (window.innerHeight <= 1366)) {
      document.addEventListener('touchmove', (e) => {
        if (this._webgl.environment.spline.start) {
          this.windowHalf = new Vector2(window.innerWidth / 2, window.innerHeight / 2)

          this.mouse.x = (e.touches[0].clientX)
          this.mouse.y = (e.touches[0].clientY)

          this._rotateCamera()
        }
      })
    } else {
      // else if is desktop
      document.addEventListener('mousemove', (e) => {
        if (this._webgl.environment.spline.start) {
          this.windowHalf = new Vector2(window.innerWidth / 2, window.innerHeight / 2)

          this.mouse.x = (e.clientX - this.windowHalf.x)
          this.mouse.y = (e.clientY - this.windowHalf.x)

          this._rotateCamera()
        }
      }, false)
    }
  }

  _rotateCamera () {
    // if (this._webgl.environment.spline.closeToSpot) {
    //   this.speedRotate = 0.00002
    // }

    this.target.y = (-this.mouse.y) * this.speedRotate
    this.target.x = (-this.mouse.x) * this.speedRotate

    this.instance.rotation.y += (this.target.x - this.instance.rotation.y)
  }

  _followSpline () {
    const spline = this._webgl.environment.spline.spline

    if (this.instance.position.z <= spline.points[spline.points.length - 1].z) {
      this._webgl.environment.spline.tick = 0
      this.instance.position.z = 0
    }

    // Camera follow the spline
    const tangent = spline.getTangent(this._webgl.environment.spline.tick)
    this.instance.rotation.y = -tangent.x
  }

  _setOrbitControls () {
    this.controls = new OrbitControls(this.instance, this._canvas)
    this.controls.enabled = true
    this.controls.enableDamping = true

    this._debugFolder = this._debug.ui.addFolder({ title: 'OrbitControls' })
    this._debugFolder.addInput(this.controls, 'enabled')
  }

  resize () {
    this.instance.aspect = this._sizes.width / this._sizes.height
    this.instance.updateProjectionMatrix()
  }

  update () {
    this.controls && this.controls.update()
    if (this.followActive) {
      this._followSpline()
    }
  }
}
