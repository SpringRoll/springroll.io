<template>
  <div class="json">
    <v-jsoneditor class="json__editor" :options="options" :plus="false" height="400px" ref="jsonEditor"/>
    <div class="json__button-group">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{on}">
          <v-btn
            color="error"
            class="font-semi-bold font-16 --capital json__button-cancel"
            v-on="on"
          >
            Clear
          </v-btn>
        </template>
        <v-card id="clear-captions-card">
          <v-card-title class="error" color="black" primary-title>
            <h2 class="font-semi-bold json__dialog-title">Warning</h2>
          </v-card-title>
          <v-card-text>
            <span class="json__dialog-text">This will clear all captions.</span>
          </v-card-text>
          <v-card-actions class="json__dialog-actions">
            <v-spacer></v-spacer>
            <v-btn
              color="accent"
              @click="dialog = false"
              class="font-semi-bold font-16 --capital json__dialog-buttons"
            >Cancel</v-btn>
            <v-btn color="error" @click="reset" class="font-semi-bold font-16 --capital json__dialog-buttons">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn
        download="export.json"
        target="_blank"
        :href="blob"
        color="accent"
        class="font-semi-bold font-16 --capital json__button-export"
        :disabled="Object.keys(jsonErrors).length > 0"
      >Export Code</v-btn>
    </div>
    <ul class="json__errors" v-for="(file, index) in jsonErrors" :key="index">
      <li v-for="(error, index) in file" :key="index">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
import { EventBus } from '@/class/EventBus';
import VJsoneditor from 'v-jsoneditor';
export default {
  data() {
    const data = {};
    const json = JSON.stringify(data);
    return {
      json,
      data,
      blob: null,
      dialog: false,
      jsonErrors: false,
      currentIndex: 0,
      origin: 'JsonPreview',
      activeFile: '',
      fileNameMap: {},
      options: {
        onChangeJSON: this.onEdit,
        mode: 'form',
        onEvent: this.onEvent
      },
    };
  },
  components: {
    VJsoneditor
  },
  methods: {
    onEdit($event) {
      this.checkErrors($event, this.origin);
      EventBus.$emit('json_update', $event, this.origin);
    },
    onUpdate(data, $origin) {
      //Pass the origin of the original component on through in this call, since that is the origin that matters
      EventBus.$emit('caption_get', $origin);
    },
    onEvent(node, event) {
      if (event.type !== 'focus') {
        return;
      }

      const file = this.fileNameMap[node.path[0]];
      const index = node.path[1];
      const indexDelta = index - this.currentIndex;

      if (this.activeFile === node.path[0]) {
        EventBus.$emit('caption_move_index', indexDelta, this.origin);
        return;
      }

      EventBus.$emit('json_file_selected', file);

      EventBus.$once('selected_file_updated', () => {
        if (indexDelta !== 0) {
          EventBus.$emit('caption_move_index', indexDelta, this.origin);
        }
      });

    },
    onCaptionChange({ index, file, name }) {
      this.activeFile = name;
      this.fileNameMap[name] = file;

      this.currentIndex = index;

    },
    update(data, $origin) {
      this.checkErrors(data, $origin);

      if ($origin === this.origin) {
        return;
      }

      this.data = this.cleanData(data);
      this.$refs.jsonEditor.editor.update(this.data);
      this.json = JSON.stringify(this.data, null, 2);
      this.createBlob();
    },
    cleanData(data) {
      const key = Object.keys(data);
      const output = {};
      for (let i = 0, l = key.length; i < l; i++) {
        if (!Array.isArray(data[key[i]])) {
          continue;
        }

        const reduced = data[key[i]].reduce((filtered, e) => {
          if ( (e.content && e.start < e.end) ) {
            if (e.content.trim()) {
              filtered.push({content: e.content.replace(/\n$/, ''), start: e.start, end: e.end});
            }
          }
          return filtered;
        }, []);

        if (reduced.length) {
          output[key[i]] = reduced;
        }
      }
      return output;
    },
    createBlob() {
      this.blob = URL.createObjectURL(
        new Blob([JSON.stringify(this.data)], { type: 'application/json' })
      );
    },
    reset() {
      EventBus.$emit('caption_reset');
      this.dialog = false;
      this.update({});
    },
    validateJSON(json, $origin) {
      const errors = {};
      Object.keys(json).forEach(key => {
        errors[key] = [];
        const file = json[key];
        file.forEach((caption, index) => {
          if (caption.edited || $origin === this.origin) {
            if (!caption.content.trim() ) {
              errors[key].push(`Error at caption [${key}], index [${index}]: Caption content must be non-empty`);
            }
            if ('number' !== typeof caption.start || caption.start < 0) {
              errors[key].push(`Error at caption [${key}], index [${index}]: Caption start must have a positive number value`);
            }
            if ('number' !== typeof caption.end || caption.end < 0) {
              errors[key].push(`Error at caption [${key}], index [${index}]: Caption end must have a positive number value`);
            }
            if (caption.start >= caption.end) {
              errors[key].push(`Error at caption [${key}], index [${index}]: Caption start must be less than the caption end`);
            }
          }
        });

        if (errors[key].length <= 0) {
          delete errors[key];
        }
      });

      return errors;
    },
    checkErrors(data, $origin) {
      this.jsonErrors = false;
      const errors = this.validateJSON(data, $origin);
      if (Object.keys(errors).length > 0) {
        this.jsonErrors = errors;
      }

      EventBus.$emit('json_errors', this.jsonErrors);
    }
  },
  mounted() {
    this.createBlob();
    EventBus.$on('caption_update', this.onUpdate);
    EventBus.$on('caption_changed', this.onCaptionChange);
    EventBus.$on('caption_data', this.update);
  },
  destroyed() {
    EventBus.$off('caption_update', this.onUpdate);
    EventBus.$off('caption_data', this.update);
    EventBus.$off('caption_changed', this.onCaptionChange);
  }
};
</script>

<style lang="scss">
@import '~@/scss/colors';
@import '~@/scss/sizes';

$menu-height: 5.6rem;

#clear-captions-card {
  padding: 3rem;
}

.json {
  display: flex;
  flex-direction: column;

  &__editor {
    width: 100%;
  }

  .jsoneditor-menu {
    background-color: $accent;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: $menu-height;
    padding: 1.5rem;
  }

  .jsoneditor-search {
    margin: 1rem;
  }

  .jsoneditor {
    border: none;

    &-outer.has-main-menu-bar {
      margin-top: 0;
      padding-top: 0;
      height: calc(100% - #{$menu-height});
    }
  }

  .jsoneditor-tree {
    background-color: $white-background;
  }

  &__errors {
    position: relative;
    top: 2.25rem;
    color: red;
  }

  &__button {

    &-cancel,
    &-export {
      margin: 0 !important;
    }

    &-cancel {
      border-radius: 0px 0px 0px 10px / 0px 0px 0px 10px !important;
      width: 100%;
    }

    &-export {
      border-radius: 0px 0px 10px 0px !important;
    }

    &-group {
      display: flex;
      width: 100%;
      min-height: 3.6rem;
      align-items: center;
      border-radius: 2rem;


      &> * {
        width: 50%;
      }
    }
  }

  &__dialog-title {
    margin-bottom: 2rem;
  }
  &__dialog-text {
    margin-bottom: 2rem;
    display: block;
  }
  &__dialog-actions {
    margin-top: 1rem;
  }
  &__dialog-buttons:first-child {
    margin-right: 1rem;
  }
}
</style>
