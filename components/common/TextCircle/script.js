export default {
  data: () => ({
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  }),
  methods: {
    addEvents () {
      document.addEventListener('mousemove', (e) => {
        const textCircle = document.querySelector('.text-circle')
        textCircle.style.left = e.pageX + 'px'
        textCircle.style.top = e.pageY + 'px'
      })
    }
  },
  mounted () {
    // this.addEvents()
  }
}
