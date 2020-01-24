<template>
  <div class="scaleManager__container">
    <div class="scaleManager__wrapper">
      <a class="scaleManager__source"  href="https://github.com/SpringRoll/springroll-io-safe-scale-manager-demo/tree/feature/safe-scale-manager-demo">Source Code for the demo game</a>
      <iframe id="scaleManager-demo" allow="fullscreen" class="scaleManager" :src=gameUrl frameborder="0" />
      <v-btn @click="fullScreen" block color="primary" class="scaleManager__event scaleManager__button --capital font-16 font-semi-bold">Full Screen</v-btn>
    </div>
    <div class="scaleManager__events">
      <h2 class="scaleManager__header">Scaling Options</h2>
    </div>
  </div>
</template>

<script>
import { Bellhop } from 'bellhop-iframe';

export default {
  data() {
    return {
      bellhop: new Bellhop('demo-scale'),
      gameUrl: location.protocol + '//springroll.io/springroll-io-demo-game/',
      values: {
        'maxWidth': 1320,
        'maxHeight': 780,
        'safeWidth': 1024,
        'safeHeight': 660,
      },
      isFullScreen: false,

    };
  },
  methods: {
    fullScreen() {
      const elem = document.querySelector('iframe');
      if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
          alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  },
  mounted() {
    this.bellhop.connect(document.getElementById('scale-demo'));
  }
};

</script>


<style lang="scss">
@import "~@/scss/colors";
@import "~@/scss/mixins";
.scaleManager {
  height: 52rem;
  width: 65rem;
  resize: both;
  overflow: auto;

  &__events {
    color: $accent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__header {
    margin-top: 1.5rem;
  }

  &__event {
    @include key(25rem);
  }

  &__button {
    height: 4.4rem !important;
    width: 25% !important;

  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-content: center;
    padding-top: 3.5rem;
  }

  &__source {
    align-self: flex-end;
    padding-right: 2rem;
  }

  &__container {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
    flex-direction:column;
  }
}
</style>

