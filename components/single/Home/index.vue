<template>
  <div class="home">
    <div class="home-container">
      <h1 class="home-title">
        The Green Door N°1
      </h1>
      <p class="home-description">
        Parter à la recherche de ce monstre en traçant ses traces de pas. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur illo animi labore, Lorem ipsum dolor sit, amet consectetur adipisicing.
      </p>
      <button class="home-btn" @click="fadeOut()">
        Lancer l'expérience
      </button>
      <div class="home-credits">
        <ul>
          <li><a href="https://www.instagram.com/web_gregory_colombe/" target="_blank">Grégory Colombe</a></li>
        </ul>
      </div>
      <div class="home-explications">
        <ul>
          <li>Explications des commandes :</li>
          <li>Appuyer sur "Espace" pour s'arrêter/avancer.</li>
          <li>Déplacer votre souris pour regarder autour de vous.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script src="./script.js" />
<style src="./style.scss" lang="scss" scoped />
