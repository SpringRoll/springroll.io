<template>
  <div class="game__container">
    <div class="game__wrapper">
      <iframe id="demo-game" class="game" frameborder="0"/>
      <a
        class="game__source"
        href="https://github.com/SpringRoll/springroll-io-demo-game"
      >Source Code for the Game</a>
    </div>
    <div class="game__events">
      <h2 class="game__header">Game Options</h2>
      <v-btn
        @click="pause"
        id="pause-button"
        block
        color="primary"
        class="game__event game__button --capital font-16 font-semi-bold"
      >{{ paused ? 'Unpause' : 'Pause'}}</v-btn>
      <v-btn
        @click="mute"
        id="game-sound-mute"
        block
        color="primary"
        class="game__event game__button --capital font-16 font-semi-bold"
      >{{ muted ? 'Unmute' : 'Mute'}}</v-btn>
      <v-btn
        @click="hint"
        id="hint-button"
        block
        color="primary"
        class="game__event game__button --capital font-16 font-semi-bold"
      >Hint</v-btn>
      <h2 class="game__header">Game Events</h2>
      <div
        v-for="(event, key) in events"
        :key="key"
        :class="{'--active': event.on }"
        class="game__event"
      >{{event.label}}</div>
    </div>
  </div>
</template>

<script>
import {
  Container,
  PausePlugin,
  // CaptionsPlugin,
  // FocusPlugin,
  HelpPlugin,
  SoundPlugin
} from 'springroll-container';
import { setTimeout } from 'timers';
import { Bellhop } from 'bellhop-iframe';
export default {
  data() {
    return {
      container: null,
      soundPlugin: null,
      bellhop: new Bellhop('demo-game'),
      paused: false,
      muted: false,
      events: {
        localizerResolve: { label: 'Localiztion', on: false },
        speechSynthStart: { label: 'Speech Synch', on: false },
        pauseScreenActive: { label: 'Pause', on: false },
        soundMute: { label: 'Sound Mute', on: false },
        captionStart: { label: 'Captions Start', on: false }
      },
      gameUrl: location.protocol + '//springroll.io/springroll-io-demo-game/'
    };
  },
  methods: {
    pause() {
      this.paused = !this.paused;
    },
    mute() {
      this.muted = !this.muted;
    },
    hint() {
      //this.bellhop.send('playHelp');
    }
  },
  mounted() {
    const key = Object.keys(this.events);

    this.soundPlugin = new SoundPlugin({ sfxButton: '#game-sound-mute' });
    this.pausePlugin = new PausePlugin('#pause-button');
    this.helpPlugin = new HelpPlugin('#hint-button');
    this.container = new Container({
      iframeSelector: '#demo-game',
      plugins: [this.soundPlugin, this.pausePlugin, this.helpPlugin]
    });

    for (let i = 0, l = key.length; i < l; i++) {
      this.container.client.on(key[i], () => {
        this.events[key[i]].on = true;
        console.log(this.events[key[i]].label);

        setTimeout(() => {
          this.events[key[i]].on = false;
        }, 250);
      });
    }

    //doesn't work with current game build. Needs updated Springroll I think??
    this.container.openPath('http://127.0.0.1:5500/docs/index.html');
  }
};
</script>


<style lang="scss">
@import '~@/scss/colors';
@import '~@/scss/mixins';
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

