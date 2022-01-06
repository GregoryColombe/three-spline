import { AnimationMixer, Mesh } from 'three'
import WebGL from '../../WebGL'

export default class Model {
  // Instantiate the application
  get _webgl () { return new WebGL() }
  // Access to the scene
  get _scene () { return this._webgl.scene }
  // Get the datas of the resource that you want tot load
  get _resource () { return this._webgl.resources.items.gregory }
  get _time () { return this._webgl.time }

  constructor () {
    // Add the method to your constructor
    this._setInstance()
    this._animate()
  }

  _setInstance () {
    this.instance = this._resource

    this.instance.scale.set(0.004, 0.004, 0.004)
    this.instance.position.set(0, 0, -5)

    this.instance.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this._scene.add(this.instance)
  }

  _animate () {
    this.mixer = new AnimationMixer(this.instance)
    const idle = this.mixer.clipAction(this.instance.animations[0])
    idle.play()
  }

  update () {
    this.mixer.update(this._time.delta * 0.001)
  }
}
