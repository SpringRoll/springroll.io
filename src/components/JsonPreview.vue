<template>
  <div class="json">
    <!-- <pre contenteditable v-highlightjs="json" @input="onEdit"><code class="javascript code-block --wide json__container"></code></pre> -->
    <v-jsoneditor v-model="data" :options="options" :plus="false" height="400px" />
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
      options: {
        onChangeJSON: this.onEdit
      }
    };
  },
  components: {
    VJsoneditor
  },
  methods: {
    onEdit($event) {
      EventBus.$emit('json_update', $event);
    },
    onUpdate() {
      EventBus.$emit('caption_get');
    },
    update(data) {
      this.data = this.cleanData(data);
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

        const filtered = data[key[i]].filter((e) => {
          return e.content.trim() && e.start < e.end;
        });

        if (filtered.length) {
          output[key[i]] = filtered;
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
    }
  },
  mounted() {
    this.createBlob();
    EventBus.$on('caption_update', this.onUpdate);
    EventBus.$on('caption_data', this.update);
  },
  destroyed() {
    EventBus.$off('caption_update', this.onUpdate);
    EventBus.$on('caption_data', this.update);
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
