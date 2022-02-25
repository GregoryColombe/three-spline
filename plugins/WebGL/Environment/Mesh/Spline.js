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
    this.speed = 0.00025

    this.tickAdvancement = {
      spot1: 0.1590000000000001,
      spot2: 0.8460250000000007,
      spot3: 0.9711250000000008
    }
    this.closeToSpot = false
    this.activeIsEnded = false

    this.addEvents()
    this._setInstance()
  }

  _setInstance () {
    this.spline = new CatmullRomCurve3([
      new Vector3(0, 0, 20),
      new Vector3(1, 0, 12),
      new Vector3(7.25, 0, 8),
      new Vector3(6.5, 0, 4.5),
      new Vector3(3, 0, 4),
      new Vector3(0, 0, 4),
      new Vector3(-5, 0, 4),
      new Vector3(-7, 0, 3),
      new Vector3(-6, 0, 0.5),
      new Vector3(-4.5, 0, 0),
      new Vector3(-3.5, 0, -2),
      new Vector3(-5, 0, -5),
      new Vector3(-5, 0, -6),
      new Vector3(-3, 0, -7),
      new Vector3(0, 0, -7),
      new Vector3(2, 0, -7),
      new Vector3(5, 0, -6.5),
      new Vector3(9.5, 0, -7),
      new Vector3(9.5, 0, -10.5),
      new Vector3(7, 0, -13),
      new Vector3(4, 0, -15.5),
      new Vector3(3.25, 0, -20)
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
      if (!this.closeToSpot && this.start) {
        if (e.code === 'Space') {
          this.walking = !this.walking
        }
      }
    })

    // document.addEventListener('keyup', (e) => {
    //   if (e.code === 'Escape') {
    //     this.restart()
    //   }
    // })
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

    // this._webgl.camera.instance.lookAt(0, camPos.y, camPos.z)

    switch (this.tick) {
      case this.tickAdvancement.spot1 :
        this.spotDetected({
          title: 'N°1 - Lorem ipsum',
          description: 'Consequuntur, soluta officiis? Odio, tempora natus aliquam vitae quasi quas eos dicta vero dolorum dignissimos nobis sit amet consectetur adipisicing elit. Asperiores, quia molestiae dolor suscipit.'
        }, false)
        break
      case this.tickAdvancement.spot2:
        this.activeIsEnded = true

        this.spotDetected({
          title: 'N°2 - Lorem ipsum',
          description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quia molestiae dolor suscipit tempora nihil dolores? Consequuntur, soluta officiis? Odio, tempora natus aliquam vitae quasi quas eos dicta vero dolorum dignissimos nobis.'
        }, true)
        break
      case this.tickAdvancement.spot3:
        this.spotDetected({
          title: 'N°3 - Fin',
          description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quia molestiae dolor suscipit tempora nihil dolores? Consequuntur, soluta officiis? Odio, tempora natus aliquam vitae quasi quas eos dicta vero dolorum dignissimos nobis.'
        }, false)
        break
      default:
        break
    }
  }

  restart () {
    this._webgl.environment.spline.start = false
    this.walking = false
    this._webgl.camera.instance.position.set(0, 0.25, 20)
    this._webgl.camera.instance.lookAt(new Vector3(0, 0.25, 0))
  }

  update () {
    this.tick += this.speed

    if (this.walking && !this.closeToSpot) {
      this.detectPositionInSpline()
    }

    // this._webgl.camera.followActive = true
  }
}
