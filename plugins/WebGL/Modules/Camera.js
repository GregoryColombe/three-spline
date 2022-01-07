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

    this._setInstance()
    this.addEvents()
    this._debug.active && this._setOrbitControls()
  }

  _setInstance () {
    this.instance = new PerspectiveCamera(
      35,
      this._sizes.width / this._sizes.height,
      0.1,
      1000
    )

    this.instance.position.set(0, 0.25, 0)
    // this.instance.lookAt(new Vector3(0, 1, 0))

    this._scene.add(this.instance)
  }

  addEvents () {
    document.addEventListener('mousemove', (e) => {
      if (this._webgl.environment.spline.active) {
        this.windowHalf = new Vector2(window.innerWidth / 2, window.innerHeight / 2)

        this.mouse.x = (e.clientX - this.windowHalf.x)
        this.mouse.y = (e.clientY - this.windowHalf.x)

        this._rotateCamera()
      }
    })
  }

  _rotateCamera () {
    this.target.x = (1 - this.mouse.x) * 0.002
    this.target.y = (1 - this.mouse.y) * 0.002

    // this._webgl.camera.instance.rotation.x += (this.target.y - this._webgl.camera.instance.rotation.x)
    this.instance.rotation.y += (this.target.x - this.instance.rotation.y)
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
  }
}
