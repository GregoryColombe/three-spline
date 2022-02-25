<template>
  <div class="textAppear">
    <h1 class="textAppear-title" />
    <p class="textAppear-description" />

    <button class="textAppear-btn" @click="isEnded === true ? restart() : onClickBtn()">
      {{ isEnded === true ? "Recommencer l'expérience" : "Continuer l'expérience" }}
    </button>
  </div>
</template>

<script src="./script.js" />
<style src="./style.scss" lang="scss" scoped />
