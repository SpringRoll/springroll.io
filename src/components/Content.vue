<template>
  <v-content>
    <v-container fluid>
      <transition name="swap">
        <router-view class="page"></router-view>
      </transition>
    </v-container>
  </v-content>
</template>

<style lang="scss">
.container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
}

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.swap {
  &-enter {
    opacity: 0;
    &-active {
      transition: opacity 2s;
    }
  }

  &-leave {
    &-active {
      animation: slide 0.5s ease-in;
    }
  }
}

@keyframes slide {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(-100%);
  }
}
</style>
