<template>
  <div class="scaleManager__container">
    <div class="scaleManager__wrapper">
      <a class="scaleManager__source"  href="https://github.com/SpringRoll/springroll-io-safe-scale-manager-demo/tree/feature/safe-scale-manager-demo">Source Code for the demo game</a>
      <iframe id="scaleManager-demo" allow="fullscreen" class="scaleManager" :src="`${publicPath}SafeScaleManagerDemo`" frameborder="0" />
      <v-btn @click="fullScreen" block color="primary" class="scaleManager__button --fullScreen --capital font-16 font-semi-bold">Full Screen</v-btn>
    </div>
    <div class="scaleManager__events">
      <h2 class="scaleManager__header">Scaling Options</h2>
      <v-form
      >
      <template v-for="value in scaleValues">
        <!-- <label class="scaleManager__label" :for="value.label" :key="value.label">{{ value.label }}: -->
        <v-text-field
        class="scaleManager__input"
          v-model="value.value"
          type="number"
          :label="value.label"
          :key="value.label"
          required
        ></v-text-field>
        <!-- </label> -->
        </template>
        <v-btn @click="updateScaling" block color="primary" class="scaleManager__event scaleManager__button --capital font-16 font-semi-bold">Update Scale Values</v-btn>
      </v-form>
      <v-form
      ref="anchorForm"
      v-model="anchorValid"
      >
        <v-text-field
          class="scaleManager__input"
          id="positionX"
          v-model="anchorValues.position.value.x"
          label="Anchor Position X:"
          type="number"
        ></v-text-field>
        <v-text-field
          class="scaleManager__input"
          id="positionY"
          v-model="anchorValues.position.value.y"
          label="Anchor Position Y:"
          type="number"
        ></v-text-field>
        <v-text-field
          class="scaleManager__input"
          id="directionX"
          v-model="anchorValues.direction.value.x"
          label="Anchor Direction X:"
          max="1"
          min="-1"
          step="0.1"
          type="number"
          :rules="anchorDirectionRules"
        ></v-text-field>
        <v-text-field
          class="scaleManager__input"
          id="directionY"
          v-model="anchorValues.direction.value.y"
          label="Anchor Direction Y:"
          type="number"
          max="1"
          min="-1"
          step="0.1"
          :rules="anchorDirectionRules"
        ></v-text-field>
      <v-btn @click="validateAnchor" :disabled="!anchorValid" block color="primary" class="scaleManager__event scaleManager__button --capital font-16 font-semi-bold">Update Anchor</v-btn>
      </v-form>
    </div>
  </div>
</template>


<script>
import { Bellhop } from 'bellhop-iframe';

export default {
  data() {
    return {
      anchorValid: true,
      publicPath: process.env.BASE_URL,
      bellhop: new Bellhop('scaleManager-demo'),
      scaleValues: {
        'maxWidth': {
          'value': 1320,
          'label': 'Max Width'
        },
        'maxHeight': {
          'value': 780,
          'label': 'Max Height'
        },
        'safeWidth': {
          'value': 1024,
          'label': 'Safe Width'
        },
        'safeHeight': {
          'value': 660,
          'label': 'Safe Height'
        },
      },
      anchorValues: {
        'position': {
          'value': {'x': 0, 'y': 0},
          'label': 'Anchor Position'
        },
        'direction': {
          'value': {'x': 0, 'y': 0},
          'label': 'Anchor Direction'
        },
      },
      isFullScreen: false,
      anchorDirectionRules: [
        v => (v <= 1 && v >= -1) || 'Anchor Directions must be between -1 and 1'
      ],
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
    },
    updateScaling() {
      this.bellhop.send('applyChanges', {
        'maxWidth': +this.scaleValues.maxWidth.value || 1320,
        'maxHeight': +this.scaleValues.maxHeight.value || 780,
        'safeWidth': +this.scaleValues.safeWidth.value || 1024,
        'safeHeight': +this.scaleValues.safeHeight.value || 660,
        'position': { 'x': +this.anchorValues.position.value.x, 'y': +this.anchorValues.position.value.y },
        'direction': { 'x': +this.anchorValues.direction.value.x, 'y': +this.anchorValues.direction.value.y },
      });
    },
    updateAnchor() {
      this.bellhop.send('updateAnchor', {
        'position': { 'x': +this.anchorValues.position.value.x, 'y': +this.anchorValues.position.value.y },
        'direction': { 'x': +this.anchorValues.direction.value.x, 'y': +this.anchorValues.direction.value.y }
      });
    },
    validateAnchor () {
      if (!this.$refs.anchorForm.validate()) {
        console.log('invalid');
        this.anchorValid = false;
      }

      this.updateAnchor();
    },
  },
  mounted() {
    this.bellhop.connect(document.getElementById('scaleManager-demo'));
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
    align-items: flex-start;
    margin-left: 5rem;
  }

  &__header {
    margin: 1.5rem 0;
    align-self: center;
  }

  &__event {
    @include key(25rem);

    &.scaleManager__button {
      width: 100%;

      &:first-child {
        margin-bottom: 5rem;
      }
    }
  }

  &__button {
    height: 4.4rem !important;

    &.--fullScreen {
      width: 25%;
    }
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

  &__input {
    margin-left: 1rem;
  }
  &__label {
    color: $light-label;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0;

  }
}
</style>

