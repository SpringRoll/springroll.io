<template>
  <div class="example">
    <div class="example__nav">
      <router-link exact-active-class="--active" class="example__link font-semi-bold font-21" v-for="route of routes" :key="route.name" :to="route">
        {{ route.name }}
      </router-link>
    </div>
    <router-view class="example__content" />
  </div>

</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          name: 'SpeechSynth'
        },
        {
          name: 'ColorFilter'
        },
        {
          name: 'Resize'
        },
        {
          name: 'Controls'
        },
        {
          name: 'Bellhop'
        }
      ]
    };
  }
};
</script>


<style lang="scss">
@import "~@/scss/colors";
.example {
  width: 100%;
  height: 100%;
  margin-top: 3.9rem;

  .v-btn--active:before,
  .v-btn:hover:before,
  .v-btn:focus:before {
    color: transparent;
  }

  &__nav {
    margin-top: 6.9rem;
    margin-left: 4.8rem;

    @media screen and (max-width: 768px) {
      margin-left: 0.5rem;
      display: flex;
      flex-direction: column;
    }
  }
  &__content {
    margin: 7rem;

    @media screen and (max-width: 768px) {
      margin: 0;
      padding: 1rem;
    }
  }

  &__link {
    color: $accent;
    margin-right: 0.75rem;
    text-decoration: none;
    padding: 0.5rem 1.2rem 0.7rem;

    // @media screen and (max-width: 768px) {
    //   margin-bottom: 4rem;
    // }

    &.--active {
      background-color: $accent;
      border-radius: 2px;
      color: $white;
    }
  }
}
</style>
