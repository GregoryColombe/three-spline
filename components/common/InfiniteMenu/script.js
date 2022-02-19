import InfiniteMenu from './infinitemenu'

export default {
  data: () => ({
  }),

  methods: {
  },

  mounted () {
    const menu = new InfiniteMenu(document.querySelector('nav.menu'))
    console.log(menu)
  }
}
