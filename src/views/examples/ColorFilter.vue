<template>
  <Example title="Filter Example" :large="true">
    <div slot="example">
      <img width="50%" height="50%" class="filter__image" ref="image" src="@/assets/example.jpg" alt="Example Image">
      <label class="filter__label font-12">Color Filter</label>
      <v-select class="filter__select" v-model="selected" item-text="name" :items="types" @input="changeFilter($event)" />
    </div>
    <CodeBlock class="filter__code" slot="code" :code=currentExample />
  </Example>
</template>

<script>
import { ColorFilter } from 'springroll';
import Example from '@/components/Example';
import CodeBlock from '@/components/CodeBlock';
export default {
  components: {
    Example,
    CodeBlock
  },
  data() {
    const filter = new ColorFilter();
    const types = [{ name: 'None', value: null }];
    types.push(...filter.types);

    return {
      selected: null,
      filter,
      types,
      currentExample: ''
    };
  },
  methods: {
    changeFilter(e) {
      this.updateCodeExample(e);
      if (null === e) {
        this.filter.removeFilter();
        return;
      }
      this.filter.changeFilter(e);
    },
    updateCodeExample(value) {
      this.currentExample =
        (null === value
          ? 'filter.removeFilter()'
          : `const filter = new ColorFilter(); \n\n filter.changeFilter('${value}')`) ;
    }
  },
  mounted() {
    this.filter.element = this.$refs.image;
    this.updateCodeExample(null);
  }
};
</script>


<style lang="scss">
.filter {
  display: flex;

  &__label {
    opacity: 0.54;
  }

  &__select {
    margin-top: 0 !important;
  }

  &__image {
    width: 100%;
    min-width: 36.6rem;
    margin-bottom: 1.1rem;
  }

  &__code {
    height: 97%;
  }
}
</style>
