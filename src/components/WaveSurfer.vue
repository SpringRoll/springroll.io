<template>
  <div class="wave__container">
    <div id="wave__container" class="wave__wave"></div>
    <div class="wave__controls">
      <div class="wave__buttons">
        <v-btn @click="rewind" :disabled="!hasFile" class="wave__button" icon small>
          <v-icon>fast_rewind</v-icon>
        </v-btn>
        <v-btn @click="previous" :disabled="!hasFile" class="wave__button" icon small>
          <v-icon>skip_previous</v-icon>
        </v-btn>
        <v-btn @click="play" :disabled="!hasFile" class="wave__button" icon small>
          <v-icon>{{ isPlaying ? 'pause' : 'play_arrow' }}</v-icon>
        </v-btn>
        <v-btn @click="next" :disabled="!hasFile" class="wave__button" icon small>
          <v-icon>skip_next</v-icon>
        </v-btn>
        <v-btn @click="forward" :disabled="!hasFile" class="wave__button" icon small>
          <v-icon>fast_forward</v-icon>
        </v-btn>
      </div>
      <div class="wave__timer">
        <TimeStamp :time="currentTime" />
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/class/EventBus';
import TimeStamp from './TimeStamp';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions.js';

export default {
  components: {
    TimeStamp
  },
  data() {
    return {
      wave: null,
      isPlaying: false,
      hasFile: false,
      currentTime: 0,
      activeIndex: 0,
      activeRegion: null,
      inactiveRegions: []
    };
  },
  computed: {
    lastIndex() {
      return this.inactiveRegions.length - 1 || 0;
    }
  },
  methods: {
    updateTimeStamp() {
      this.currentTime = (this.wave.getCurrentTime() * 1000) | 0;
      this.emitTime();
    },
    initWave() {
      this.wave = WaveSurfer.create({
        container: '#wave__container',
        cursorColor: '#000',
        fillParent: true,
        height: 200,
        mediaControls: true,
        mediaType: 'audio',
        normalize: true,
        progressColor: 'rgba(0,0,0,0)',
        responsive: true,
        waveColor: '#0C7AC0',
        plugins: [
          RegionsPlugin.create({
            dragSelection: true
          })
        ]
      });

      this.wave.on('audioprocess', this.updateTimeStamp);
      this.wave.on('seek', this.updateTimeStamp);
      this.wave.on('finish', this.finish);
    },

    forward() {
      this.wave.skipForward();
    },
    rewind() {
      this.wave.skipBackward();
    },

    finish() {
      this.isPlaying = false;
      this.wave.stop();
    },

    play() {
      this.wave.playPause();
      this.isPlaying = this.wave.isPlaying();
    },

    previous() {
      EventBus.$emit('previous_file');
    },
    next() {
      EventBus.$emit('next_file');
    },

    empty() {
      this.wave.empty();
      this.currentTime = 0;
    },
    loadFile($event) {
      if ($event.file instanceof File) {
        /**
         * TODO:
         * When picking a new file, read in the data attribute emitted
         * and build out a bunch of regions based on that.
         */
        this.wave.clearRegions();
        this.isPlaying = false;
        this.hasFile = true;

        console.log($event.file);
        this.wave.loadBlob($event.file);
      }
    },
    emitTime() {
      EventBus.$emit('time_current', { time: this.currentTime });
    },
    onNewRegion(region) {
      if (this.activeRegion) {
        this.activeRegion.remove();
      }
      this.activeRegion = region;
      this.activeRegion.color = 'rgba(0, 255, 0, 0.1)';
      this.activeRegion.updateRender();
    },
    onUpdateRegion(region) {
      if (region.id !== this.activeRegion.id) {
        return;
      }
      EventBus.$emit('caption_update', {
        start: Math.round(region.start * 1000),
        end: Math.round(region.end * 1000)
      });
      this.activeRegion = region;
      console.log(this.activeRegion);
    },
    onCaptionChange($event) {
      const { index, data } = $event;

      if (data.start === 0 && data.end === 0) {
        this.activeIndex = index;
        return;
      }

      if (!this.activeRegion && index === this.inactiveRegions.length) {
        this.wave.addRegion({
          start: data.start,
          end: data.end,
          color: 'rgba(0, 255, 0, 0.1)'
        });
      }

      if (index === this.activeIndex) {
        if (this.activeRegion) {
          this.activeRegion.start = data.start
            ? data.start / 1000
            : this.activeRegion.start;
          this.activeRegion.end = data.end
            ? data.end / 1000
            : this.activeRegion.end;
          this.activeRegion.updateRender();
        }
      } else {
        if (this.activeRegion && this.inactiveRegions[this.activeIndex]) {
          this.makeActiveCaptionInactive();
          this.activeIndex = index;
          this.activeRegion = this.inactiveRegions[this.activeIndex];
        }

        this.activeIndex = index;

        if (!this.activeRegion) {
          return;
        }

        this.makeActiveCaptionActive();
      }
    },
    onAddCaption() {
      //TODO: don't allow the region to be created if there's no content?
      if (this.activeRegion) {
        this.makeActiveCaptionInactive();
        this.inactiveRegions.push(this.activeRegion);
        this.activeRegion = false;
      }
      this.activeIndex++;
    },
    onRemoveCaption() {
      /**
       * TODO
       */
    },
    makeActiveCaptionInactive() {
      this.activeRegion.color = 'rgba(0,0,0,0.1)';
      this.activeRegion.drag = false;
      this.activeRegion.resize = false;
      this.activeRegion.updateRender();
    },
    makeActiveCaptionActive() {
      this.activeRegion.color = 'rgba(0,255,0,0.1)';
      this.activeRegion.drag = true;
      this.activeRegion.resize = true;
      this.activeRegion.updateRender();
    }
  },
  mounted() {
    this.initWave();
    EventBus.$on('file_selected', this.loadFile.bind(this));
    EventBus.$on('time_get', this.emitTime.bind(this));
    EventBus.$on('caption_reset', this.empty.bind(this));
    EventBus.$on('caption_add_index', this.onAddCaption.bind(this));
    EventBus.$on('caption_changed', this.onCaptionChange.bind(this));
    this.wave.on('region-created', this.onNewRegion.bind(this));
    this.wave.on('region-updated', this.onUpdateRegion.bind(this));
  },
  destroyed() {
    EventBus.$off('file_selected', this.loadFile.bind(this));
    EventBus.$off('time_get', this.emitTime.bind(this));
    EventBus.$off('caption_reset', this.empty.bind(this));
    this.wave.destroy();
  }
};
</script>

<style lang="scss">
@import '~@/scss/colors';
@import '~@/scss/sizes';

.wave {
  &__container {
    width: 100%;
  }

  &__wave {
    height: 20.1rem;
    background-color: $white-background-opacity;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;

    wave {
      z-index: 0;
    }
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    background-color: $white-background;
    height: 5.6rem;
    align-items: center;
    padding: 0 2.4rem;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
  }
}
</style>


