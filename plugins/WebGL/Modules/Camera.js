import { PerspectiveCamera, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
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

    this._setInstance()
    this._debug.active && this._setOrbitControls()
    // this._setControls()
  }

  _setInstance () {
    this.instance = new PerspectiveCamera(
      35,
      this._sizes.width / this._sizes.height,
      0.1,
      1000
    )

    this.instance.position.set(0, 1, 5)
    this.instance.lookAt(new Vector3(0, 1, 0))

    this._scene.add(this.instance)
  }

  _setControls () {
    const controls = new PointerLockControls(this.instance, document.body)
    const menu = document.querySelector('.menu')

    document.body.addEventListener('click', () => {
      controls.lock()
    })
    controls.addEventListener('lock', function () {
      menu.style.display = 'none'
    })

    controls.addEventListener('unlock', function () {
      menu.style.display = 'block'
    })

    this._scene.add(controls.getObject())
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
