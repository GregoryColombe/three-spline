import gsap from 'gsap'

export default {

  methods: {
    addEvents () {
      document.querySelector('.home-btn').addEventListener('click', () => {
        this.fadeOut()
      })
    },
    fadeOut () {
      const target = document.querySelector('.home')
      gsap.to(target, {
        duration: 1.5,
        opacity: 0,
        onComplete: () => {
          this.$WebGL.environment.spline.active = true
        }
      })
    }
  },
  mounted () {
    this.addEvents()
  }
}
