<template>
  <Example title="Key Controls">

    <div slot="example">
      <div class="control__rows">
        <div class="control__row">
          <!-- {{enabled}} -->
          <div class="control__key font-semi-bold  font-16" :class="{'--active': enabled['w']}">W</div>
          <div class="control__key --medium font-semi-bold  font-16" :class="{'--active':  enabled['enter']}">Enter</div>
          <div class="control__key font-semi-bold  font-16" :class="{'--active':  enabled['arrowup']}">&uarr;</div>
        </div>

        <div class="control__row">
          <div class="control__key font-semi-bold  font-16" :class="{'--active':  enabled['a']}">A</div>
          <div class="control__key font-semi-bold  font-16" :class="{'--active':  enabled['s']}">S</div>
          <div class="control__key --empty font-semi-bold  font-16" :class="{'--active':  enabled['d']}">D</div>
          <div class="control__key font-semi-bold  font-16" :class="{'--active':  enabled['arrowleft']}">&larr;</div>
          <div class="control__key font-semi-bold  font-16" :class="{'--active':  enabled['arrowdown']}">&darr;</div>
          <div class="control__key font-semi-bold  font-16" :class="{'--active':  enabled['arrowright']}">&rarr;</div>
        </div>

        <div class="control__row">
          <div class="control__key --large font-semi-bold  font-16" :class="{'--active': enabled[' ']}">Space Bar</div>
        </div>

      </div>
    </div>
    <CodeBlock slot="code" :code=currentExample />

  </Example>
</template>

<script>
import { Controller } from 'springroll';
import Example from '@/components/Example';
import CodeBlock from '@/components/CodeBlock';
export default {
  components: {
    Example,
    CodeBlock
  },
  data() {
    const listeners = [
      'w',
      'a',
      's',
      'd',
      'enter',
      'arrowleft',
      'arrowright',
      'arrowup',
      'arrowdown',
      ' '
    ];

    const enabled = {};
    const keys = listeners.map((key) => {
      enabled[key] = false;
      return {
        key,
        down: function() {
          this.enabled[key] = true;
        }.bind(this),
        up: function() {
          this.enabled[key] = false;
        }.bind(this)
      };
    });

    const controller = new Controller(keys);
    return {
      keys,
      controller,
      enabled,
      currentExample: ''
    };
  },
  methods: {
    updateCurrentExample() {
      const keyString = this.keys.reduce((auc, key) => {
        auc += `\n   {key: '${key.key}', down: keyDown(), up: keyUp()}`;
        return auc;
      }, '');
      this.currentExample = `const controller = new Controller([${keyString}\n ]);\n\n setInterval(() => controller.update(), 0);`;
    }
  },
  mounted() {
    this.updateCurrentExample();
    setInterval(
      function() {
        this.controller.update();
      }.bind(this),
      0
    );
  }
};
</script>

<style lang="scss">
@import "~@/scss/colors";
@import "~@/scss/mixins";
.control {
  &__key {
    @include key();

    &.--empty {
      margin-right: 6.6rem;
    }
  }

  &__rows {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 7.8rem;
  }

  &__row {
    display: flex;
    justify-content: center;
  }
}
</style>
