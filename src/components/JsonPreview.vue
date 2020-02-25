<template>
  <div class="json">
    <v-jsoneditor :options="options" :plus="false" height="400px" ref="jsonEditor"/>
      <ul class="json__errors" v-for="(file, index) in jsonErrors" :key="index">
        <li v-for="(error, index) in file" :key="index">
          {{ error }}
        </li>
      </ul>
    <div class="json__button-group">
      <v-dialog v-model="dialog" width="500">
        <v-btn
          slot="activator"
          color="error"
          class="font-semi-bold --capital json__button-cancel"
        >Clear</v-btn>
        <v-card>
          <v-card-title class="error" primary-title>
            <h2 class="font-semi-bold json__dialog-title">Warning</h2>
          </v-card-title>
          <v-card-text>
            <span class>This will clear all captions.</span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="accent"
              @click="dialog = false"
              class="font-semi-bold font-16 --capital"
            >Cancel</v-btn>
            <v-btn color="error" @click="reset" class="font-semi-bold font-16 --capital">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn
        download="export.json"
        target="_blank"
        :href="blob"
        color="accent"
        class="font-semi-bold --capital json__button-export"
        :disabled="jsonErrors.length > 0"
      >Export Code</v-btn>
    </div>
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
      console.log($event);
      this.checkErrors($event);
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
    onCaptionChange({ index, file, name }, $origin) {
      this.activeFile = name;
      this.fileNameMap[name] = file;

      if ($origin === this.origin) {
        return;
      }
      this.currentIndex = index;

    },
    update(data, $origin) {
      console.log('hello?');
      this.checkErrors(data);
      console.log(data, `t${$origin}t`);

      if ($origin !== this.origin) {
        this.data = this.cleanData(data);
      }

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
    validateJSON(json) {
      const errors = {};
      Object.keys(json).forEach(key => {
        errors[key] = [];
        const file = json[key];
        file.forEach((caption, index) => {
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
        });
      });

      return errors;
    },
    checkErrors(data) {
      const errors = this.validateJSON(data);
      if (errors.length <= 0) {
        this.jsonErrors = false;
      } else {
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
.json {
  display: flex;
  flex-direction: column;

  .code-block {
    width: 100%;
  }
  .jsoneditor-menu {
    background-color: $accent;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 5.6rem;
    padding: 1.5rem;
  }

  .jsoneditor-search {
    margin: 1rem;
  }

  .jsoneditor {
    border: none;
  }

  .jsoneditor-tree {
    background-color: $white-background;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &__errors {
    position: relative;
    top: 2.25rem;
    color: red;
  }

  pre,
  code {
    overflow: auto;
  }

  &__container {
    width: 100%;
    height: 20rem;
    padding: 1rem;
  }

  &__button {
    &-export {
      width: 15.8rem;
      height: 3.6rem;
    }

    &-cancel,
    &-export {
      margin: 0 !important;
    }

    &-group {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      margin: 3rem 0;
    }
  }

  &__dialog-title {
    color: $white;
  }
}
</style>
