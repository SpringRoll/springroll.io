<template>
  <v-list>
    <v-list-group class="directory" :value="true" prepend-icon="folder">
      <v-list-tile slot="activator" class="directory__dir-name">
        <v-list-tile-content>
          <v-list-tile-title class="directory__name font-semi-bold font-16"> {{ name }} </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile-content v-for="(value, index) in files" :key="index">
        <label class="directory__file">
          <v-icon class="directory__icon" :class="{'--active': value.active}">audiotrack</v-icon>
          <input :id="`${index}_${value.file.name}`" class="directory__select" @change="emit" type="radio" name="selectedFile" :value="value.file" :checked="value.active" />
          <label :for="`${index}_${value.file.name}`" class="font-16 directory__label">{{value.file.name}}</label>
        </label>
      </v-list-tile-content>
      <file-directory v-for="(value, key) in directory.dir" :key="key" class="directory__nested" :directory="value" :name="key" :sub="true" :active="active" />
    </v-list-group>
  </v-list>
</template>

<script>
import { EventBus } from '@/class/EventBus';
export default {
  name: 'file-directory',
  props: {
    directory: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      default: ''
    },
    active: File,
    sub: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasActive: false
    };
  },
  computed: {
    files() {
      return this.directory.files.map(file => {
        return {
          active: this.active === file,
          file
        };
      });
    },
  },
  watch: {
    directory() {
      if (this.hasActive) {
        this.directory.selectByFile(this.active);
      }
    }
  },
  methods: {
    isFile(file) {
      return file instanceof File;
    },
    nextFile() {
      if (this.hasActive) {
        EventBus.$emit('file_selected', {file: this.directory.nextFile()});
      }
    },
    previousFile() {
      if (this.hasActive) {
        EventBus.$emit('file_selected', {file: this.directory.previousFile()});
      }
    },
    emit($event) {
      this.hasActive = $event.target.checked;
      if (this.hasActive) {
        EventBus.$emit('file_selected', {file:  this.directory.selectByFile($event.target._value) });
      }
    }
  },
  mounted() {
    EventBus.$on('next_file', this.nextFile);
    EventBus.$on('previous_file',this.previousFile);
  },
  destroyed() {
    EventBus.$off('next_file', this.nextFile);
    EventBus.$off('previous_file',this.previousFile);
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/fonts";
@import "~@/scss/colors";
.directory {
  $this: &;

  &__name {
    color: $secondary;
  }

  &__icon {
    padding-right: 1.7rem;

    &.--active {
      color: $secondary;
    }
  }

  &__file {
    align-items: center;
    color: $secondary;
    display: flex;
    height: 3.2rem;

    padding-left: 1.5rem;
  }

  &__nested {
    padding-left: 1rem;
  }

  &__select {
    display: flex;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    height: 3.2rem;
    opacity: 0;

    &:checked + #{$this}__label::before {
      position: absolute;
      content: " ";
      z-index: 0;
      left: -10rem;
      right: -10rem;
      height: 3.2rem;
      background-color: rgba(153, 153, 153, 0.2);
    }
  }

  &__label {
    @extend .font-14;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
}

.v-list__tile {
  padding: 0 0.5rem !important;
}

.v-list,
.theme--light .v-list,
.application
  .theme--light.v-list
  .theme--light
  .v-list
  .v-list__group--active:before,
.application .theme--light.v-list .v-list__group--active:before,
.theme--light .v-list .v-list__group--active:after,
.application .theme--light.v-list .v-list__group--active:after {
  background: transparent !important;
  color: $black !important;
}

.theme--light .v-list .v-list__group--active:before,
.application .theme--light.v-list .v-list__group--active:before,
.theme--light .v-list .v-list__group--active:after,
.application .theme--light.v-list .v-list__group--active:after {
  background: transparent !important;
}
</style>

