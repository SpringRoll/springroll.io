<template>
  <div class="caption__studio" :class="{'--explorerHidden': explorerHidden}">
    <v-icon @click="() => explorerHidden = !explorerHidden" class="caption__hide-sidebar">{{ explorerHidden ? 'arrow_forward_ios' : 'arrow_back_ios' }}</v-icon>
    <FileExplorer :class="{'--explorerHidden': explorerHidden}"/>
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
      enabled: FileProcessor.hasFiles,
      explorerHidden: false,
    };
  },
  methods: {
    isEnabled($event) {
      this.enabled = $event.file instanceof File;
    },
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

    &.--explorerHidden {
      .caption__container {
        padding: 3.75rem 3rem 0 3rem;
      }
      .caption__hide-sidebar {
        left: 0;

        &:hover {
          left: 0.5rem;
        }
      }
    }
  }

  &__hide-sidebar {
    position: fixed !important;
    top: 50%;
    left: 26.5rem;
    transition: left 0.4s !important;
    z-index: 3;

    &:hover {
      left: 26rem;
    }
  }

  &__container {
    padding: 3.75rem 3rem 0 32rem;
    width: 100%;
    transition: padding 0.5s;

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


