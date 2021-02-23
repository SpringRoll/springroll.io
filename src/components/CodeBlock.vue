<template>
  <pre class="code-block__pre" slot="code" v-highlightjs=code><code class="javascript code-block font-12"></code></pre>
</template>

<script>
export default {
  props: ['code']
};
</script>

<style lang="scss">
@import "~@/scss/colors";
$standard-width: 37.8rem;
.code-block {
  color: $black !important;
  background-color: $white-background !important;
  width: $standard-width !important;
  min-height: 26.4rem !important;
  padding: 1.6rem 2.4rem !important;
  height: 100% !important;
  border-radius: 3px;
  display: inline-block;
  font-size: 85%;
  font-weight: 900 !important;
  white-space: pre-wrap;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);

  &__pre {
    height: 100% !important;
  }
}
</style>
