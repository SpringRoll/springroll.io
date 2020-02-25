<template>
  <div class="editor">
    <quill-editor
      id="quill-editor"
      class="editor__quill"
      ref="Quill"
     >
      <div id="toolbar" slot="toolbar">
        <select class="ql-font">
          <option selected="selected"></option>
          <option value="serif"></option>
          <option value="monospace"></option>
        </select>
        <select class="ql-size">
          <option
            v-for="size in sizeOptions"
            :key="size.value"
            :value="size.value"
            :selected="size.default"
          >{{size.label}}</option>
        </select>
        <select class="ql-color">
          <option
            v-for="color in colorOptions"
            :key="color.value"
            :value="color.value"
            :selected="color.default"
          />
        </select>
        <button class="ql-bold">Bold</button>
        <button @click="escapeString" class="editor__escape-button">
          <span v-pre>&#123;&#123; &#125;&#125;</span>
        </button>
      </div>
    </quill-editor>
    <div class="editor__controls">
      <TimeStampInput @time="onStartTimeUpdated" :default="start" name="start" />
      <TimeStampInput @time="onEndTimeUpdated" :default="end" name="end" />
    </div>
    <v-btn
      v-if="canRemove"
      @click="removeCaption"
      :block="true"
      color="accent"
      class="editor__button font-16 font-semi-bold capitalize"
    >Remove Caption</v-btn>
    <v-btn
      v-else
      @click="addCaption"
      :disabled="!canAdd"
      :block="true"
      color="accent"
      class="editor__button font-16 font-semi-bold capitalize"
    >Add Caption</v-btn>
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
      fileName: '',
      start: 0,
      end: 0,
      lastIndex: 0,
      canEmit: false,
      origin: 'TextEditor',
      jsonErrors: false,
      sizeOptions: [
        { value: '10px', label: 'Small', default: false },
        { value: '16px', label: 'Normal', default: true },
        { value: '18px', label: 'Large', default: false },
        { value: '32px', label: 'Huge', default: false }
      ],
      colorOptions: [
        { value: '#000000', default: true },
        { value: '#FFFFFF', default: false },
        { value: '#FF0000', default: false },
        { value: '#00FF00', default: false },
        { value: '#0000FF', default: false },
        { value: '#FFFF00', default: false },
        { value: '#00FFFF', default: false },
        { value: '#FF00FF', default: false }
      ]
    };
  },
  computed: {
    canAdd() {
      let hasErrors = false;
      if (this.jsonErrors[this.fileName] && this.jsonErrors[this.fileName].length > 0) {
        hasErrors = true;
      }
      return (this.index >= this.lastIndex) && (!hasErrors);
    },
    canRemove() {
      return this.index < this.lastIndex;
    }
  },
  methods: {
    onEdit(delta, oldContents, source) {
      if (!this.canEmit) {
        return;
      }
      if (source !== 'user') {
        return;
      }
      const text = this.$refs.Quill.quill.getText();
      this.content = text;
      EventBus.$emit('caption_update', { content: text }, this.origin);
    },
    onStartTimeUpdated($event) {
      if (!this.canEmit) {
        return;
      }
      EventBus.$emit('caption_update', { start: $event }, this.origin);
    },
    onEndTimeUpdated($event) {
      if (!this.canEmit) {
        return;
      }
      EventBus.$emit('caption_update', { end: $event }, this.origin);
    },
    onUpdate($event, $origin) {
      if ($origin === this.origin) {
        return;
      }
      const { start, end, content } = $event.data;
      this.start = start;
      this.end = end;
      this.content = content;
      this.$refs.Quill.quill.setText(content ? content : ' '); // empty string prevents unnecessary console errors
      this.lastIndex = $event.lastIndex;
      this.index = $event.index;
      this.fileName = $event.name;
      this.canEmit = true;
    },
    addCaption() {
      this.content = ' ';
      EventBus.$emit('caption_add_index', this.origin );
    },
    removeCaption() {
      EventBus.$emit('caption_remove_index', this.origin );
    },
    escapeString() {
      const isEscaped = /^{{.*}}$/;
      const selection = getSelection();
      const offset = selection.baseOffset;
      const endset = selection.extentOffset;
      const baseString = selection.anchorNode.data;
      const text = baseString.slice(offset, endset).trim();

      const parent = document.getElementById('quill-editor');

      if (
        !parent.contains(selection.anchorNode) ||
        isEscaped.test(text) ||
        !text.trim()
      ) {
        return;
      }

      selection.anchorNode.data =
        baseString.substring(0, offset) +
        `{{${text}}}` +
        baseString.substring(endset, baseString.length);
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
    EventBus.$on('json_errors', (e) => this.jsonErrors = e);
    this.$refs.Quill.quill.on('text-change', this.onEdit);
  },
  destroyed() {
    EventBus.$off('caption_changed', this.onUpdate);
    EventBus.$off('caption_reset', this.reset);
  }
};
</script>

<style lang="scss">
@import '~@/scss/colors';
@import '~@/scss/fonts';
@import '~@/scss/sizes';
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