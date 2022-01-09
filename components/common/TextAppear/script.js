import gsap from 'gsap'

export default {

  data: () => ({
    toto: undefined
  }),

  methods: {
    fade (inOrOur) {
      const tl = gsap.timeline()
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
      tl
        .to(document.querySelector('.textAppear'), {
          duration: 1.5,
          opacity: value,
          ease: 'power2.inOut',
          onComplete: () => {
            if (inOrOur === 'out') {
              document.querySelector('canvas').style.cursor = 'none'
              this.$WebGL.environment.spline.speed = 0.001
              this.$WebGL.environment.spline.walking = true

              console.log('wlk : ', this.$WebGL.environment.spline.walking)
            } else if (inOrOur === 'in') {
              document.querySelector('canvas').style.cursor = 'initial'
            }
          }
        })
    }
  },
  mounted () {
  }
}
