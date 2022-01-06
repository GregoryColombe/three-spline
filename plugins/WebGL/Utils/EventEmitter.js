import bidello from 'bidello'

export default class EventEmmiter {
  trigger (name, data) {
    bidello.trigger({ name }, data)
  }

  on (name, callback = () => {}) {
    bidello.on(name, data => callback(data))
  }

  off (name) {
    bidello.off(name)
  }

  callbackEmitter (action, value) {
    bidello.trigger({ name: 'callback' }, { action, value })
  }

  callbackSubscribe (callback = () => {}) {
    bidello.on('callback', data => callback(data))
  }
}
