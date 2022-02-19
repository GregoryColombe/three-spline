import gsap from 'gsap'

export default {

  methods: {
    fadeOut () {
      const tl = gsap.timeline()
      tl
        .to(document.querySelectorAll('.home-title, .home-description, .home-btn, .home-credits, .home-explications'), {
          duration: 1,
          opacity: 0,
          ease: 'power2.inOut',
          stagger: 0.3
        })

        .to(document.querySelector('.home'), {
          duration: 1.5,
          ease: 'power2.inOut',
          opacity: 0,
          // backdropFilter: 'blur(0px)',
          onComplete: () => {
            this.$WebGL.environment.spline.start = true
            this.$WebGL.environment.spline.walking = true
            document.querySelector('.home').style.display = 'none'
          }
        })
    }
  },

  mounted () {}
}
