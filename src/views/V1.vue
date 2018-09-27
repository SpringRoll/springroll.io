<template>
  <iframe class="v1" :src=url frameborder="0"></iframe>
</template>

<script>
export default {
  data() {
    return {
      url: location.protocol + '//springroll.io/springroll.io.v1/'
    };
  }
};
</script>


<style lang="scss">
.v1 {
  width: 100%;
  height: 100%;
}
</style>

