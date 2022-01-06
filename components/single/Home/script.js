import gsap from 'gsap'

export default {

  methods: {
    addEvents () {
      document.querySelector('.home-btn').addEventListener('click', () => {
        this.fadeOut()
      })
    },
    fadeOut () {
      const tl = gsap.timeline()
      tl
        .to(document.querySelectorAll('.home-title, .home-description, .home-btn'), {
          duration: 1.5,
          opacity: 0,
          ease: 'power2.inOut',
          stagger: 1
        })

        .to(document.querySelector('.home'), {
          duration: 1.5,
          opacity: 0,
          onComplete: () => {
            this.$WebGL.environment.spline.active = true
            document.querySelector('.home').style.display = 'none'
          }
        })
    }
  },
  mounted () {
    this.addEvents()
  }
}
