<template>
  <div class="scaleManager__container">
    <div class="scaleManager__wrapper">
      <a class="scaleManager__readme"  href="https://github.com/SpringRoll/SpringRoll/tree/develop/src/scale-manager">Scale Manager README</a>
      <iframe id="scaleManager-demo" allow="fullscreen" class="scaleManager" :src="`${publicPath}SafeScaleManagerDemo`" frameborder="0" />
      <v-btn @click="fullScreen" block color="primary" class="scaleManager__button --fullScreen --capital font-16 font-semi-bold">Full Screen</v-btn>
      <a class="scaleManager__source"  href="https://github.com/SpringRoll/springroll-io-safe-scale-manager-demo/tree/feature/safe-scale-manager-demo">Source Code for the demo game</a>
    </div>
    <div class="scaleManager__events">
      <h2 class="scaleManager__header">Scaling Options</h2>
      <div class="scaleManager__form-wrapper">
      <v-form
      ref="scaleForm"
      v-model="scaleValid"
      >
      <template v-for="value in scaleValues">
        <v-text-field
        class="scaleManager__input my-4"
          v-model="value.value"
          type="number"
          :label="value.label"
          :key="value.label"
          :rules="value.rules"
          :hint="value.hint"
          required
        ></v-text-field>
        </template>
        <v-btn @click="validateScale" :disabled="!scaleValid" block color="primary" class="scaleManager__event scaleManager__button --capital font-16 font-semi-bold mb-3">Update Scale Values</v-btn>
      </v-form>
      <v-form
      ref="anchorForm"
      v-model="anchorValid"
      >
        <v-text-field
          class="scaleManager__input my-4"
          id="positionX"
          v-model="anchorValues.position.value.x"
          label="Anchor Position X:"
          type="number"
          hint="A horizontal offset from the anchored x position."
          @input="validateAnchor"
        ></v-text-field>
        <v-text-field
          class="scaleManager__input my-4"
          id="positionY"
          v-model="anchorValues.position.value.y"
          label="Anchor Position Y:"
          type="number"
          hint="A vertical offset from the anchored y position."
          @input="validateAnchor"
        ></v-text-field>
        <v-text-field
          class="scaleManager__input my-4"
          id="directionX"
          v-model="anchorValues.direction.value.x"
          label="Anchor Direction X:"
          max="1"
          min="-1"
          step="0.1"
          type="number"
          :rules="anchorDirectionRules"
          hint="A normalized value for a horizontal edge of the viewable area. Should be between -1 and 1."
          @input="validateAnchor"
        ></v-text-field>
        <v-text-field
          class="scaleManager__input my-4"
          id="directionY"
          v-model="anchorValues.direction.value.y"
          label="Anchor Direction Y:"
          type="number"
          max="1"
          min="-1"
          step="0.1"
          :rules="anchorDirectionRules"
          hint="A normalized value for a vertical edge of the viewable area. Should be between -1 and 1."
          @input="validateAnchor"
        ></v-text-field>
      <!-- <v-btn @click="validateAnchor" :disabled="!anchorValid" block color="primary" class="scaleManager__event scaleManager__button --capital font-16 font-semi-bold">Update Anchor</v-btn> -->
      </v-form>
      </div>
    </div>
  </div>
</template>


<script>
import { Bellhop } from 'bellhop-iframe';

export default {
  data() {
    return {
      anchorValid: true,
      scaleValid: true,
      publicPath: process.env.BASE_URL,
      bellhop: new Bellhop('scaleManager-demo'),
      scaleValues: {
        'maxWidth': {
          'value': 1320,
          'label': 'Max Width',
          'rules': [
            v => (v && v > 0) || 'Max Width must be greater than 0',
            v => (v > this.scaleValues.safeWidth.value) || 'Max width must be more than safe width'
          ],
          'hint': 'The maximum horizontal dimension in pixels of your game.'
        },
        'maxHeight': {
          'value': 780,
          'label': 'Max Height',
          'rules':         [
            v => (v && v > 0) || 'Max Height must be greater than 0',
            v => (v > this.scaleValues.safeHeight.value) || 'Max height must be more than safe height'
          ],
          'hint': 'The maximum vertical dimension in pixels of your game.'
        },
        'safeWidth': {
          'value': 1024,
          'label': 'Safe Width',
          rules:         [
            v => (v && v > 0) || 'Safe Width must be greater than 0',
            v => (v < this.scaleValues.maxWidth.value) || 'Safe width must be less than max width'
          ],
          'hint': 'The minimum horizontal dimension in pixel of the safe area in your game.'
        },
        'safeHeight': {
          'value': 660,
          'label': 'Safe Height',
          'rules':         [
            v => (v && v > 0) || 'Safe Height must be greater than 0',
            v => (v < this.scaleValues.maxHeight.value) || 'Safe height must be less than max height'
          ],
          'hint': 'The minimum vertical dimension in pixel of the safe area in your game.'
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
      scalingRules: [
        [
          v => (v && v > 0) || 'Max Width must be greater than 0',
          v => (v > this.scaleValues.safeWidth.value) || 'Max width must be more than safe width'
        ],
        [
          v => (v && v > 0) || 'Max Height must be greater than 0',
          v => (v > this.scaleValues.safeHeight.value) || 'Max height must be more than safe height'
        ],
        [
          v => (v && v > 0) || 'Safe Width must be greater than 0',
          v => (v < this.scaleValues.maxWidth.value) || 'Safe width must be less than max width'
        ],
        [
          v => (v && v > 0) || 'Safe Height must be greater than 0',
          v => (v < this.scaleValues.maxHeight.value) || 'Safe height must be less than max height'
        ],
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
        return;
      }

      this.updateAnchor();
    },
    validateScale () {
      if (!this.$refs.anchorForm.validate() && this.$refs.scaleForm.validate()) {
        return;
      }

      this.updateScaling();
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
  height: 76.8rem;
  width: 102.4rem;
  resize: both;
  overflow: auto;

  &__events {
    color: $accent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 5rem;

    @media (max-width: 1300px) {
      width: 100%;
      align-items: center;
    }

  }

  &__form-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    @media (max-width: 1300px) {
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
      width: 50%;
    }
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
  &__readme {
    align-self: flex-end;
    padding-right: 2rem;
  }

  &__container {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  flex-wrap: wrap;
  }

  &__input {
    margin-left: 1rem;
    max-width: 17.9rem;
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

