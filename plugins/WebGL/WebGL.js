import { Scene, Mesh } from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import EventEmmiter from './Utils/EventEmitter.js'

import Camera from './Modules/Camera.js'
import Renderer from './Modules/Renderer.js'

import Environment from './Environment/Environment'

import sources from '@/static/webgl/sources.js'

let instance

export default class WebGL extends EventEmmiter {
  constructor (canvas, debug, callback = () => {}) {
    super()

    if (instance) {
      return instance
    } else {
      instance = this
    }

    window.webgl = this

    // OPTIONS
    this.canvas = canvas

    // SETUP
    this.debug = new Debug(debug)
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.environment = new Environment()

    // CALLBACK
    this.callbackSubscribe(data => callback(data))

    // EVENTS
    this.sizes.on('resize', this._resize.bind(this))
    this.time.on('update', this._update.bind(this))
  }

  _update () {
    this.debug.begin()
    this.camera.update()
    this.renderer.update()
    this.environment.update()
    this.debug.end()
  }

  _resize () {
    this.camera.resize()
    this.renderer.resize()
  }

  destroy () {
    this.sizes.off('resize')
    this.time.off('tick')

    this.camera.controls.dispose()
    this.renderer.instance.dispose()

    this.debug.active && this.debug.ui.dispose()

    // Traverse all childs to remove gemoetries & materials
    this.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.geometry.dispose()

        for (const key in child.material) {
          const value = child.material[key]

          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })
  }
}
