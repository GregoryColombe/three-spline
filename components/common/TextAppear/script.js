import { gsap } from 'gsap'

export default {

  data () {
    return {
      isEnded: false
    }
  },

  methods: {
    fade (inOrOur, activeEnd) {
      if (activeEnd) {
        this.isEnded = true
      }
      console.log('activeEnd : ', activeEnd, ' et : ', this.isEnded)

      const tl = gsap.timeline()
      const target = document.querySelector('.textAppear')
      let value

      switch (inOrOur) {
        case 'in':
          value = 1
          break
        case 'out':
          value = 0
          break
        default:
          break
      }

      tl.to(target, {
        duration: 1.5,
        opacity: value,
        ease: 'power2.inOut',
        onComplete: () => {
          if (inOrOur === 'out') {
            if (this.$WebGL.environment.spline.closeToSpot) {
              document.querySelector('canvas').style.cursor = 'none'
              this.$WebGL.environment.spline.closeToSpot = false
              this.$WebGL.environment.spline.walking = true
              this.$WebGL.environment.spline.speed = 0.001
              this.$WebGL.camera.speedRotate = 0.002
              document.querySelector('.textAppear-btn').disabled = true
            }
          } else if (inOrOur === 'in') {
            document.querySelector('.textAppear-btn').disabled = false
            document.querySelector('canvas').style.cursor = 'initial'
          }
        }
      })
    },

    restart () {
      window.location.reload()
    }
  },

  mounted () {
  }
}
