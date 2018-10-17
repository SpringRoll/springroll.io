<template>
  <div class="time-stamp">
    {{minutes}}:{{seconds}}:{{milliseconds}}
  </div>
</template>

<script>
import TimeStampMixin from '@/mixins/TimeStamp';
export default {
  props: {
    time: {
      type: Number,
      default: 0
    }
  },
  mixins: [TimeStampMixin],
};
</script>

