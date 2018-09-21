<template>
  <Example title="Window Dimensions">
    <div slot="example" class="scale__column">
      <span class="font-16 font scale__blurb">Try resizing the window</span>
      <div class="scale__properties">
        <h3 class="font-21 font-semi-bold scale__property">Width: {{size.width}} </h3>
        <h3 class="font-21 font-semi-bold scale__property">Height: {{size.height}}</h3>
        <h3 class="font-21 font-semi-bold scale__property">Scale: {{size.ratio}}</h3>
      </div>
    </div>
    <CodeBlock slot="code" :code=currentExample />
  </Example>
</template>

<script>
import { ScaleManager } from 'springroll';
import Example from '@/components/Example';
import CodeBlock from '@/components/CodeBlock';
export default {
  components: {
    Example,
    CodeBlock
  },
  data() {
    return {
      manager: new ScaleManager(),
      size: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.innerWidth / window.innerHeight
      },
      currentExample: ''
    };
  },
  methods: {
    updateCurrentExample(e) {
      this.currentExample = `const manager = new ScaleManager(); \n\n manager.enable(e => {\n  console.log(e.width); //${
        e.width
      } \n  console.log(e.height}); //${e.height} \n  console.log(e.ratio) //${
        e.ratio
      } \n });`;
    }
  },
  mounted() {
    this.updateCurrentExample({
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.innerWidth / window.innerHeight
    });
    this.manager.enable(
      function(e) {
        this.size = e;
        this.updateCurrentExample(e);
      }.bind(this)
    );
  }
};
</script>

<style lang="scss">
.scale {
  width: 100%;
  &__content {
    display: flex;
  }

  &__property {
    margin-bottom: 0.8rem;
  }

  &__properties {
    margin-top: 1.4rem;
    margin-left: 11.2rem;
  }

  &__blurb {
    margin-top: 1.8rem;
  }
}
</style>
