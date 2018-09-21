<template>

  <Example>
    <div class="iframe__game" slot="example">
      <iframe class="iframe__game" id="iframe"></iframe>
      <br/>
      <div class="iframe__controls">
        <v-btn id="pause">Pause</v-btn>
        <v-btn id="captions">Toggle Captions</v-btn>
        <v-btn id="sound">Toggle Mute</v-btn>
      </div>
    </div>
    <CodeBlock slot="code" code="`
//Main
const container =  new springroll.Container('#iframe', {
  pauseButton: ['#pause'],
  soundButton: '#sound',
  captionsButton: '#captions'
});

//iframe
import { Application } from 'springroll';

const app = new Application({
  captions: true,
  sound: true
});

app.state.pause.subscribe(isPaused => updateElem('paused', isPaused));

app.state.captionsMuted.subscribe(captionsMuted =>
  updateElem('captions', captionsMuted)
);

app.state.soundMuted.subscribe(soundMuted => updateElem('muted', soundMuted));

function updateElem(elem, data) {
  document.getElementById(elem).innerText = data;
}

window.app = app;`"/>
  </Example>
</template>

<script>
import Iframe from '@/mixins/Iframe';
import Example from '@/components/Example';
import CodeBlock from '@/components/CodeBlock';

export default {
  mixins: [Iframe],
  components: {
    Example,
    CodeBlock
  },
  mounted() {

    const container =  new springroll.Container('#iframe', {
      pauseButton: ['#pause'],
      soundButton: '#sound',
      captionsButton: '#captions'
    });

    this.container = container;

    this.container.openPath(this.base + 'child.html');
  },

  destroyed() {
    this.container.destroy();
  }
};
</script>

<style lang="scss">
.iframe {
  &__game {
    width: 100%;
  }

  &__controls {
    width: 100%;
    display: flex;
  }
}
</style>
