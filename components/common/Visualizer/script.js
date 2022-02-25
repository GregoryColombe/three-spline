import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    page: {
      type: String,
      default: ''
    },
    fade: {
      type: String,
      default: ''
    }
  },
  components: {
  },
  data () {
    return {
      audio: {
        src: null,
        el: null
      },
      volume: {
        value: 0,
        min: 0,
        max: 0.025
      },
      audioVol: 0.2,
      audioInterval: 100,
      datas: {},
      ctx: {},
      x: 0,
      analyser: {},
      dataObject: {},
      canvas: {},
      bufferLength: 0,
      barHeight: 0,
      barWidth: 0
    }
  },

  computed: {
    ...mapGetters({
      temporality: 'getTemporality',

      sound: 'getSound'
    })
  },

  methods: {
    ...mapActions({
      setSound: 'setSound'
    }),

    init () {
      this.audio.el = this.$refs.visualizer_audio
      this.animVisualizer()
      this.changeMusicByPageName()
    },

    playOrStopMusique () {
      this.setSound(!this.sound)
    },

    changeMusicByPageName () {
      switch (this.page) {
        case 'room':
          this.$room
            .getDatas()
            .then((resp) => {
              this.temporality < 4 ? (this.audio.src = resp.musicStart.url) : (this.audio.src = resp.musicEnd.url)
            })
          break
        case 'instagram':
          this.$instagram
            .getDatas()
            .then((resp) => {
              this.audio.src = resp.music[this.temporality - 1].url.url
            })
          break
        case 'tinder':
          this.$tinder
            .getDatas()
            .then((resp) => {
              this.audio.src = resp.music[this.temporality - 1].url.url
            })
          break
        case 'twitter':
          this.$twitter
            .getDatas()
            .then((resp) => {
              this.audio.src = resp.music[this.temporality - 1].url.url
            })
          break
      }
    },

    animVisualizer () {
      const audio = this.$refs.visualizer_audio
      const context = new AudioContext()
      const src = context.createMediaElementSource(audio)

      this.analyser = context.createAnalyser()
      this.canvas = this.$refs.visualizer_canvas
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight

      this.ctx = this.canvas.getContext('2d')
      src.connect(this.analyser)
      this.analyser.connect(context.destination)
      this.analyser.fftSize = 256

      this.bufferLength = this.analyser.frequencyBinCount / 2
      this.dataObject = new Uint8Array(this.bufferLength)

      this.barWidth = 50
      //   this.barHeight
      this.x = 0

      audio.loop = true
      this.renderFrame()
    },

    renderFrame () {
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      requestAnimationFrame(this.renderFrame)

      this.x = 0
      this.analyser.getByteFrequencyData(this.dataObject)

      this.ctx.fillStyle = 'transparent'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

      for (let i = 0; i < this.bufferLength; i++) {
        if (this.x > window.innerWidth) { break }

        this.sound ? (this.barHeight = this.dataObject[i]) : (this.barHeight = 50)

        this.ctx.fillStyle = '#fff'
        this.ctx.fillRect(Math.floor(this.x), this.canvas.height - this.barHeight, this.barWidth, this.barHeight)
        this.x += this.barWidth + 20
      }
    },

    onEnter (el, done) {
      const { visualizerAudio } = this.$refs

      this.$TweenMax.to(visualizerAudio, {
        duration: 1.5,
        volume: this.volume.max,
        onComplete: () => done()
      })
    },

    onLeave (el, done) {
      const { visualizerAudio } = this.$refs

      this.$TweenMax.to(visualizerAudio, {
        duration: 1.5,
        volume: this.volume.min,
        onComplete: () => done()
      })
    }
  },
  watch: {
    temporality () {
      this.changeMusicByPageName()
    },

    sound (val) {
      val ? this.audio.el.play() : this.audio.el.pause()
    }
  },
  mounted () {
    this.init()
  }
}
