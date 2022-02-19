<template>
  <div class="textAppear">
    <h1 class="textAppear-title" />
    <p class="textAppear-description" />

    <button class="textAppear-btn" @click="isEnded ? restart() : fade('out')">
      {{ isEnded ? "Recommencer l'expérience" : "Continuer l'expérience" }}
    </button>
    <p>hello : {{ isEnded }} </p>
  </div>
</template>

<script src="./script.js" />
<style src="./style.scss" lang="scss" scoped />
