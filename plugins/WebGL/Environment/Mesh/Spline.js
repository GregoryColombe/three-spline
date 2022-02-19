import { BufferGeometry, LineBasicMaterial, Line, Vector3, CatmullRomCurve3 } from 'three'
import WebGL from '../../WebGL'
import TextAppear from './../../../../components/common/TextAppear/script'

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
    this.start = false
    this.walking = false
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
    this.speed = 0.001

    this.positionsZ = {
      spot1: 0.4890000000000004,
      spot2: 0.7001000000000005,
      spot3: 0.9752000000000007
    }
    this.closeToSpot = false

    this.addEvents()
    this._setInstance()
  }

  _setInstance () {
    this.spline = new CatmullRomCurve3([
      new Vector3(0, 0, 0),
      new Vector3(-2, 0, -5),
      new Vector3(1, 0, -10),
      new Vector3(4, 0, -15),
      new Vector3(0, 0, -20),
      new Vector3(2, 0, -40)
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
      if (!this.closeToSpot) {
        if (e.code === 'Space') {
          this.walking = !this.walking
        }
      }
    })

    document.addEventListener('keyup', (e) => {
      if (e.code === 'Escape') {
        this.restart()
      }
    })
  }

  _changeSpeed (value) {
    this.speed = value
  }

  changeTextAppear (text) {
    document.querySelector('.textAppear-title').innerHTML = text.title
    document.querySelector('.textAppear-description').innerHTML = text.description
  }

  spotDetected (text) {
    this.tick += this.speed / 10

    this.closeToSpot = true
    this.speed = 0.0
    this.walking = false

    this.changeTextAppear(text)
    TextAppear.methods.fade('in')
  }

  detectPositionInSpline () {
    const camPos = this.spline.getPoint(this.tick)
    this._webgl.camera.instance.position.z = camPos.z
    this._webgl.camera.instance.position.x = camPos.x
    this._webgl.camera.instance.position.y = camPos.y + 0.25

    switch (this.tick) {
      case this.positionsZ.spot1 :
        this.spotDetected({
          title: 'N°1 - Des déchêts',
          description: 'Consequuntur, soluta officiis? Odio, tempora natus aliquam vitae quasi quas eos dicta vero dolorum dignissimos nobis sit amet consectetur adipisicing elit. Asperiores, quia molestiae dolor suscipit.'
        })
        break
      case this.positionsZ.spot2:
        this.spotDetected({
          title: 'N°2 - Une Maison',
          description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quia molestiae dolor suscipit tempora nihil dolores? Consequuntur, soluta officiis? Odio, tempora natus aliquam vitae quasi quas eos dicta vero dolorum dignissimos nobis.'
        })
        break
      case this.positionsZ.spot3:
        this.spotDetected({
          title: 'N°3 - Fin',
          description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quia molestiae dolor suscipit tempora nihil dolores? Consequuntur, soluta officiis? Odio, tempora natus aliquam vitae quasi quas eos dicta vero dolorum dignissimos nobis.'
        })
        break
      default:
        break
    }
  }

  restart () {
    this._webgl.environment.spline.start = false
    this.walking = false
    this._webgl.camera.instance.position.set(0, 1, 5)
    this._webgl.camera.instance.lookAt(new Vector3(0, 1, 0))
  }

  update () {
    this.tick += this.speed

    if (this.walking && !this.closeToSpot) {
      this.detectPositionInSpline()
    }
    // this._webgl.camera.followActive = true
  }
}
