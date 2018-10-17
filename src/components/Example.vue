<template>
  <div class="example__component">
    <h2 class="font-28 font-semi-bold example__title">{{title}}</h2>
    <div class="example__slots">
      <div class="example__column" :class="{'--large': large}">
        <slot name="example"></slot>
      </div>
      <div class="example__column --row">
        <slot name="code"></slot>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ['title', 'large']
};
</script>

<style lang="scss">
.example {
  &__column {
    display: flex;
    flex-direction: column;
    min-height: 26.4rem;
    margin-right: 10.9rem;
    width: 37.8rem;

    &.--large {
      width: 50%;
    }

    @media screen and (max-width: 768px) {
      &.--row {
        padding-top: 12rem;
      }
    }
  }

  &__title {
    margin-bottom: 3.2rem;
  }

  &__slots {
    display: flex;
    width: 100%;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }
}
</style>


