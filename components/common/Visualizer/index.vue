<template>
  <transition
    @enter="onEnter"
    @leave="onLeave"
  >
    <div
      ref="visualizer"
      class="visualizer"
      @click="playOrStopMusique"
    >
      <audio
        ref="visualizer_audio"
        class="visualizer_audio"
        controls
        :src="audio.src"
        crossorigin="anonymous"
        :autoplay="sound"
      />
      <canvas
        ref="visualizer_canvas"
        class="visualizer_canvas"
      />
    </div>
  </transition>
</template>

<script src="./script.js" />
<style src="./style.scss" lang="scss" scoped />
