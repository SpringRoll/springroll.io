<template>
  <div class="game__container">
    <div class="game__wrapper">
      <iframe id="demo-game" class="game" :src=gameUrl frameborder="0" />
      <a class="game__source"  href="https://github.com/SpringRoll/springroll-io-demo-game">Source Code for the Game</a>
    </div>
    <div class="game__events">
      <h2 class="game__header">Game Options</h2>
      <v-btn @click="pause" block color="primary" class="game__event game__button --capital font-16 font-semi-bold">{{ paused ? 'Unpause' : 'Pause'}}</v-btn>
      <v-btn @click="mute" block color="primary" class="game__event game__button --capital font-16 font-semi-bold">{{ muted ? 'Unmute' : 'Mute'}}</v-btn>
      <v-btn @click="hint" block color="primary" class="game__event game__button --capital font-16 font-semi-bold">Hint</v-btn>
      <h2 class="game__header">Game Events</h2>
      <div v-for="(event, key) in events" :key=key :class="{'--active': event.on }" class="game__event">{{event.label}}</div>
    </div>
  </div>
</template>

<script>
import { Bellhop } from 'bellhop-iframe';

export default {
  data() {
    return {
      bellhop: new Bellhop('demo-game'),
      paused: false,
      muted: false,
      events: {
        'playHelp': { label: 'Hint', on: false},
        'localizerResolve': { label: 'Localiztion', on: false},
        'speechSynthStart': { label: 'Speech Synch',  on: false },
        'pauseScreenActive': { label: 'Pause',  on: false },
        'soundMute': { label: 'Sound Mute',  on: false },
        'captionStart': { label: 'Captions Start',  on: false },
      },
      gameUrl: location.protocol + '//springroll.io/springroll-io-demo-game/'
    };
  },
  methods: {
    pause() {
      console.log(location.protocol );
      this.bellhop.send('pause', this.paused = !this.paused);
    },
    mute() {
      this.bellhop.send('soundMuted', this.muted = !this.muted);
    },
    hint() {
      this.bellhop.send('playHelp');
    }
  },
  mounted() {
    const key = Object.keys(this.events);


    for (let i = 0, l = key.length; i < l; i++) {
      this.bellhop.on(key[i], () => {
        this.events[key[i]].on = true;

        setTimeout(() => {
          this.events[key[i]].on = false;
        }, (250));
      });
    }

    this.bellhop.connect(document.getElementById('demo-game'));
  }
};

</script>


<style lang="scss">
@import "~@/scss/colors";
@import "~@/scss/mixins";
.game {
  height: 52rem;
  width: 65rem;

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
  }
}
</style>

