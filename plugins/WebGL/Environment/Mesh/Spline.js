import { BufferGeometry, LineBasicMaterial, Line, Vector3, CatmullRomCurve3, Vector2 } from 'three'

import WebGL from '../../WebGL'

export default class Spline {
  // Instantiate the application
  get _webgl () { return new WebGL() }
  // Access to the scene
  get _scene () { return this._webgl.scene }
  get _time () { return this._webgl.time }

  constructor () {
    // Add the mothod to your constructor
    this.spline = ''
    this.tick = 0
    this.active = false
    this.increment = 0
    this.mouse = {
      x: 0,
      y: 0
    }
    this.target = {
      x: 0,
      y: 0
    }
    this.windowHalf = 0

    this.addEvents()
    this._setInstance()
  }

  _setInstance () {
    this.spline = new CatmullRomCurve3([
      new Vector3(0, 0, 0),
      new Vector3(-2, 0, -5),
      new Vector3(1, 0, -10),
      new Vector3(4, 0, -15),
      new Vector3(0, 0, -20)
    ])

    const points = this.spline.getPoints(500)
    const geometry = new BufferGeometry().setFromPoints(points)

    const material = new LineBasicMaterial({ color: 0xFF0000 })

    // Create the final object to add to the scene
    this.instance = new Line(geometry, material)
    this._scene.add(this.instance)
  }

  addEvents = () => {
    document.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        this.active = !this.active
      }
    })

    document.addEventListener('keyup', (e) => {
      if (e.code === 'Escape') {
        this.restart()
      }
    })

    document.addEventListener('mousemove', (e) => {
      if (this.active) {
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
    this._webgl.camera.instance.rotation.y += (this.target.x - this._webgl.camera.instance.rotation.y)
  }

  restart () {
    this.active = false
    this._webgl.camera.instance.position.set(0, 1, 5)
    this._webgl.camera.instance.lookAt(new Vector3(0, 1, 0))
  }

  update () {
    if (this.active) {
      this.tick += 0.001

      const camPos = this.spline.getPoint(this.tick)

      this._webgl.camera.instance.position.z = camPos.z
      this._webgl.camera.instance.position.x = camPos.x
      this._webgl.camera.instance.position.y = camPos.y + 0.25

      // if (this._webgl.camera.instance.position.z <= this.spline.points[this.spline.points.length - 1].z) {
      // this.tick = 0
      // this._webgl.camera.instance.position.z = 0
      // }

      // const tangent = this.spline.getTangent(this.tick)
      // this._webgl.camera.instance.rotation.y = -tangent.x
    }
  }
}
