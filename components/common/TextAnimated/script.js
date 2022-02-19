import { gsap } from 'gsap'

export default {
  data: () => ({
    text: '',
    textSplit: ''
  }),
  methods: {
    init () {
      this.target = document.querySelector('.menu__item-text')
      this.text = this.target.innerText
      this.textSplit = this.text.split('')
    },
    addEvents () {

    },
    animate () {
      console.log('animate')

      gsap.timeline(this.target, {
        duration: 0.5,
        ease: 'power2',
        stagger: 0.025,
        top: 100
      })
    }
  },
  mounted () {
    this.init()
  }
}
