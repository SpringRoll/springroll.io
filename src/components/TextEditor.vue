<template>
  <div class="editor">
    <quill-editor id="quill-editor" v-model=content @change="onEdit" class="editor__quill">
      <div id="toolbar" slot="toolbar">
        <select class="ql-font">
          <option selected="selected"></option>
          <option value="serif"></option>
          <option value="monospace"></option>
        </select>
        <select class="ql-size">
          <option v-for="size in sizeOptions" :key="size.value"  :value="size.value" :selected="size.default">{{size.label}}</option>
        </select>
        <select class="ql-color">
          <option v-for="color in colorOptions" :key="color.value"  :value="color.value" :selected="color.default"/>
        </select>
        <button class="ql-bold">Bold</button>
        <button @click=escapeString class="editor__escape-button"><span v-pre>&#123;&#123; &#125;&#125;</span></button>
      </div>
    </quill-editor>
    <div class="editor__controls">
      <TimeStampInput @time=onStartTimeUpdated :default=start name="start"/>
      <TimeStampInput @time=onEndTimeUpdated :default=end name="end"/>
    </div>
    <v-btn v-if=canRemove @click=removeCaption :block=true color="accent" class="editor__button font-16 font-semi-bold capitalize">Remove Caption</v-btn>
    <v-btn v-else @click=addCaption :disabled=!canAdd :block=true color="accent" class="editor__button font-16 font-semi-bold capitalize">Add Caption</v-btn>
  </div>
</template>

<script>
import TimeStampInput from './TimeStampInput';
import { EventBus } from '@/class/EventBus';
export default {
  components: {
    TimeStampInput
  },
  data() {
    return {
      index: 0,
      content: '',
      start: 0,
      end: 0,
      lastIndex: 0,
      canEmit: false,
      sizeOptions: [
        { value: '10px', label: 'Small',  default: false},
        { value: '16px', label: 'Normal', default: true},
        { value: '18px', label: 'Large', default: false},
        { value: '32px', label: 'Huge', default: false}
      ],
      colorOptions: [
        {value: '#000000', default: true },
        {value: '#FFFFFF', default: false },
        {value: '#FF0000', default: false },
        {value: '#00FF00', default: false },
        {value: '#0000FF', default: false },
        {value: '#FFFF00', default: false },
        {value: '#00FFFF', default: false },
        {value: '#FF00FF', default: false },
      ]
    };
  },
  computed: {
    canAdd() {
      return this.index >= this.lastIndex;
    },
    canRemove() {
      return this.index < this.lastIndex;
    }
  },
  methods: {
    onEdit($event) {
      if (!this.canEmit) {
        return;
      }
      EventBus.$emit('caption_update', {content: $event.html });
    },
    onStartTimeUpdated($event) {
      if (!this.canEmit) {
        return;
      }
      EventBus.$emit('caption_update', { start: $event });
    },
    onEndTimeUpdated($event) {
      if (!this.canEmit) {
        return;
      }
      EventBus.$emit('caption_update', { end: $event });
    },
    onUpdate($event) {
      const {content, start, end} = $event.data;
      this.content = content;
      this.start = start;
      this.end = end;
      this.lastIndex = $event.lastIndex;
      this.index = $event.index;
      this.canEmit = true;
    },
    addCaption() {
      EventBus.$emit('caption_add_index');
    },
    removeCaption() {
      EventBus.$emit('caption_remove_index');
    },
    escapeString() {
      const isEscaped = /^{{.*}}$/;
      const selection = getSelection();
      const offset = selection.baseOffset;
      const endset = selection.extentOffset;
      const baseString = selection.anchorNode.data;
      const text = baseString.slice(offset, endset).trim();

      const parent = document.getElementById('quill-editor');

      if (!parent.contains(selection.anchorNode) || isEscaped.test(text) || !text.trim()) {
        return;
      }

      selection.anchorNode.data = baseString.substring(0, offset) + `{{${text}}}` + baseString.substring(endset, baseString.length);
    },
    reset() {
      this.canEmit = false;
      this.content = '';
      this.start = this.end = 0;
    }
  },

  mounted() {
    EventBus.$on('caption_changed', this.onUpdate);
    EventBus.$on('caption_reset', this.reset);
  },
  destroyed() {
    EventBus.$off('caption_changed', this.onUpdate);
    EventBus.$off('caption_reset', this.reset);
  }
};
</script>

<style lang="scss">
@import "~@/scss/colors";
@import "~@/scss/fonts";
@import "~@/scss/sizes";
.editor {
  $quill: 20rem;
  $controls: 10.8rem;

  border-bottom-left-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
  height: $quill + $controls + 3.6rem;
  overflow: hidden;
  width: 100%;

  &__quill {
    height: $quill;
  }

  &__controls {
    background-color: $grey;
    display: flex;
    height: $controls;
    justify-content: space-between;
    padding: 1rem;
  }

  &__button {
    &.v-btn {
      margin: 0;
    }
  }

  &__escape-button {
    width: 4rem !important;
  }
}
</style>