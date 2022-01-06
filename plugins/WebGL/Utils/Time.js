import EventEmmiter from './EventEmitter'

export default class Time extends EventEmmiter {
  constructor () {
    super()

    // SETUP
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16

    this._tick()
  }

  _tick () {
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start

    this.trigger('update')

    window.requestAnimationFrame(this._tick.bind(this))
  }
}
