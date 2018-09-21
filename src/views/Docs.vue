<template>
  <iframe class="iframe" :src="base + 'docs/index.html'"></iframe>
</template>

<script>
import Iframe from '@/mixins/Iframe';
export default {
  mixins: [Iframe]
};
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>


