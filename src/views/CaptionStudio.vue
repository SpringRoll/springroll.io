<template>
  <div class="caption__studio">
    <FileExplorer/>
    <div class="caption__container" :class="{'--disabled': !enabled}">
      <div class="caption__element">
        <label class="caption__label" for="c-sound">Sound Preview</label>
        <WaveSurfer id="c-sound" class="caption__component" />
      </div>
      <div class="caption__element">
        <label class="caption__label" for="c-preview">Text Preview</label>
        <CaptionPreview id="c-preview" class="caption__component"/>
      </div>
      <div class="caption__element">
        <label class="caption__label" for="c-edtior">Text Editor</label>
        <TextEditor id="c-editor" class="caption__component"/>
      </div>
      <div class="caption__element">
        <label class="caption__label" for="c-code">Code</label>
        <JsonPreview id="c-code" class="caption__component"/>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/class/EventBus';

import FileExplorer from '@/components/FileExplorer';
import WaveSurfer from '@/components/WaveSurfer';
import TextEditor from '@/components/TextEditor';
import JsonPreview from '@/components/JsonPreview';
import CaptionPreview from '@/components/CaptionPreview';
import FileProcessor from '@/class/FileProcessor';

export default {
  components: {
    FileExplorer,
    WaveSurfer,
    TextEditor,
    JsonPreview,
    CaptionPreview
  },
  data() {
    return {
      enabled: FileProcessor.hasFiles
    };
  },
  methods: {
    isEnabled($event) {
      this.enabled = $event.file instanceof File;
    }
  },
  mounted() {
    EventBus.$on('file_selected', this.isEnabled);
    EventBus.$on('caption_reset', () => this.enabled = false);

    if (this.enabled) {
      EventBus.$emit('caption_emit');
    }
  },
  destroyed() {
    EventBus.$off('file_selected', this.isEnabled);
    EventBus.$off('caption_reset', () => this.enabled = false);
  }
};
</script>

<style lang="scss">
@import "~@/scss/colors";
.caption {
  &__studio {
    display: flex;
  }

  &__container {
    padding: 3.75rem 3rem 0 32rem;
    width: 100%;

    &.--disabled {
      pointer-events: none;
      opacity: 0.4;
    }
  }

  &__element {
    margin-top: 2.3rem;
  }

  &__label {
    color: $light-label;
    padding-bottom: 4rem;
  }

  &__component {
    margin-top: 0.8rem;
  }
}
</style>


