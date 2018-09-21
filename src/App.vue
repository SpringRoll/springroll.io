<template>
  <v-app>
    <v-toolbar app class="nav__bar --full">
      <router-link exact-active-class="--active" class="nav__button --logo" to="/"><img class=" nav__logo" src="@/assets/logo.png" alt="logo" /></router-link>
      <router-link active-class="--active" class="nav__button nav__text font font-21" to="/game">Game Demo</router-link>
      <router-link active-class="--active" class="nav__button nav__text font font-21" to="/examples">Examples</router-link>
      <router-link active-class="--active" class="nav__button nav__text font font-21" to="/docs">Docs</router-link>
      <router-link active-class="--active" class="nav__button nav__text font font-21" to="/captions">Caption Studio</router-link>
      <router-link active-class="--active" class="nav__button nav__text font font-21" to="/v1">SpringRoll 1.0</router-link>
      <a class="nav__button nav__text font-21" href="https://github.com/SpringRoll/SpringRoll" target="_blank">Github</a>
      <a class="nav__button nav__text font-21" href="https://github.com/SpringRoll/SpringRoll/wiki" target="_blank">Wiki</a>
    </v-toolbar>
    <v-toolbar app class="nav__bar --compact">
      <router-link class="nav__button --logo" to="/"><img class=" nav__logo" src="@/assets/logo.png" alt="logo" /></router-link>
      <v-icon @click="drawer = !drawer">menu
      </v-icon>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-spacer/>
      <v-list dense>
        <router-link exact-active-class="--active" class="nav__button nav__text font font-21" to="/">Home</router-link>
        <router-link active-class="--active" class="nav__button nav__text font font-21" to="/examples">Examples</router-link>
        <router-link active-class="--active" class="nav__button nav__text font font-21" to="/docs">Docs</router-link>
        <router-link active-class="--active" class="nav__button nav__text font font-21" to="/captions">Caption Studio</router-link>
        <a class="nav__button nav__text font-21" href="https://github.com/SpringRoll/SpringRoll" target="_blank">Github</a>
        <a class="nav__button nav__text font-21" href="https://github.com/SpringRoll/SpringRoll/wiki" target="_blank">Wiki</a>
      </v-list>
    </v-navigation-drawer>
    <v-content class="app__content">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

      drawer: false,
    };
  }
};
</script>


<style lang="scss">
@import "~@/scss/colors";
@import "~@/scss/fonts";
.nav {
  &__bar {
    .v-toolbar__content {
      min-height: 5.6rem;
      padding-left: 0;
      width: 100vw;
      display: flex;
    }

    &.--compact {
      display: none;
      justify-content: space-between;
    }

    @media screen and (max-width: 768px) {
      &.--compact {
        display: flex;
      }

      &.--full {
        display: none;
      }

      .v-toolbar__content {
        justify-content: space-between;
      }
    }
  }
  &__text {
    @extend .font-21;
    color: $black;
    text-decoration: none;
    text-transform: capitalize;

    &.--active {
      @extend .font-semi-bold;
    }
  }

  &__button {
    align-items: center;
    display: flex;
    height: 100%;
    margin: 0;
    padding: 2.4rem;

    &.--active {
      border-bottom: 0.2rem solid $accent;
    }
  }

  &__logo {
    height: 2.8rem;
    width: 2.8rem;
  }
}

.app__content {
  width: 100%;

  @media screen and (max-width: 768px) {
    padding: 5rem 0 !important;
  }
}
</style>

