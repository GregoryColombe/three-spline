import { gsap } from 'gsap'

export default {
  data: () => ({
    isEnded: false,
    compteur: 0,
    tl: {}
  }),

  methods: {
    onClickBtn () {
      this.compteur += 1
      this.fade('out')
      document.querySelector('.textAppear-btn').disabled = true

      if (this.compteur >= 2) {
        this.isEnded = !this.isEnded
      }
    },

    fade (inOrOur) {
      this.tl = gsap.timeline()
      const target = document.querySelector('.textAppear')
      const value = inOrOur === 'in' ? 1 : 0

      this.tl.to(target, {
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

  mounted () {}
}
