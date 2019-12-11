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
      currentDuration: 0,
      activeIndex: 0,
      activeRegion: null,
      inactiveRegions: [],
      captionData: []
    };
  },
  computed: {
    snapThreshold() {
      return this.currentDuration / 20;
    }
  },
  methods: {
    updateTimeStamp() {
      this.currentTime = (this.wave.getCurrentTime() * 1000) | 0;
      if (this.isPlaying) {
        this.emitTime();
      }
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
      this.wave.on('region-created', this.onNewRegion);
      this.wave.on('region-updated', this.onUpdateRegion);
      this.wave.on('region-click', this.onRegionClick);
      this.wave.on('region-update-end', this.onFinishUpdate);
      this.wave.on(
        'ready',
        () => (this.currentDuration = this.wave.getDuration())
      );

      this.wave.enableDragSelection({});
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
        this.inactiveRegions = [];
        this.wave.clearRegions();
        this.activeRegion = null;

        this.isPlaying = false;
        this.hasFile = true;

        this.wave.loadBlob($event.file);
        this.generateRegions();
      }
    },
    emitTime() {
      EventBus.$emit('time_current', { time: this.currentTime });
    },
    onNewRegion(region) {
      if (this.activeRegion) {
        this.activeRegion.remove();
      }

      if (this.inactiveRegions[this.activeIndex]) {
        this.inactiveRegions.splice(this.activeIndex, 1);
      }
      this.activeRegion = region;
      this.activeRegion.color = 'rgba(0, 255, 0, 0.1)';
      this.activeRegion.updateRender();
    },
    onUpdateRegion(region) {
      EventBus.$emit('caption_update', {
        start: Math.round(region.start * 1000),
        end: Math.round(region.end * 1000)
      });
    },
    onCaptionChange($event) {
      const { index, data } = $event;
      if (data.start === 0 && data.end === 0) {
        this.activeIndex = index;
        return;
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
        } else {
          this.activeRegion = this.wave.addRegion({
            start: data.start / 1000,
            end: data.end / 1000,
            color: 'rgba(0,255,0,0.1)',
            drag: true,
            resize: true
          });
        }
      } else {
        if (this.activeRegion && this.inactiveRegions[this.activeIndex]) {
          this.makeActiveCaptionInactive();
          this.activeRegion = this.inactiveRegions[index];
        } else if (this.inactiveRegions[index]) {
          if (this.activeRegion) {
            this.activeRegion.remove();
          }
          this.activeRegion = this.inactiveRegions[index];
        }

        this.activeIndex = index;
        if (!this.activeRegion) {
          return;
        }

        this.makeActiveCaptionActive();
      }
    },
    onAddCaption() {
      if (this.activeRegion) {
        const seekToRatio = this.activeRegion.end / this.currentDuration;
        this.makeActiveCaptionInactive();
        this.inactiveRegions.push(this.activeRegion);
        this.activeRegion = null;
        this.wave.seekTo(seekToRatio);
      }
      this.activeIndex++;
    },
    onRemoveCaption($event) {
      if ('undefined' === typeof this.inactiveRegions[$event]) {
        return;
      }

      this.inactiveRegions[$event].remove();
      this.inactiveRegions.splice($event, 1);
    },
    onRegionClick($event) {
      let index = this.inactiveRegions.findIndex((reg) => reg.id === $event.id);
      index = index - this.activeIndex;
      EventBus.$emit('caption_move_index', index);
    },
    generateRegions() {
      this.wave.un('region-created', this.onNewRegion);
      this.wave.un('region-updated', this.onUpdateRegion);
      for (let i = 0, l = this.captionData.length - 1; i < l; i++) {
        if (i === 0) {
          this.activeRegion = this.wave.addRegion({
            start: this.captionData[i].start / 1000,
            end: this.captionData[i].end / 1000,
            color: 'rgba(0,255,0,0.1)',
            drag: true,
            resize: true
          });
          this.inactiveRegions.push(this.activeRegion);
        } else {
          this.inactiveRegions.push(
            this.wave.addRegion({
              start: this.captionData[i].start / 1000,
              end: this.captionData[i].end / 1000,
              color: 'rgba(0,0,0,0.1)',
              drag: false,
              resize: false
            })
          );
        }
      }
      this.wave.on('region-created', this.onNewRegion);
      this.wave.on('region-updated', this.onUpdateRegion);
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
    },
    onFinishUpdate(region) {
      const regionDuration = region.end - region.start;
      for (let i = 0, l = this.inactiveRegions.length; i < l; i++) {
        if (region.id === this.inactiveRegions[i].id) {
          continue;
        }
        if (
          (region.start < this.inactiveRegions[i].end &&
            region.start >= this.inactiveRegions[i].start) ||
          (region.start < this.inactiveRegions[i].end &&
            region.end >= this.inactiveRegions[i].end)
        ) {
          region.start = this.inactiveRegions[i].end;
          region.end = region.start + regionDuration;
        } else if (
          (region.end > this.inactiveRegions[i].start &&
            region.end <= this.inactiveRegions[i].end) ||
          (region.end > this.inactiveRegions[i].start &&
            region.start <= this.inactiveRegions[i].start)
        ) {
          region.end = this.inactiveRegions[i].start;
          region.start = region.end - regionDuration;
        }
        if (
          region.start <= this.inactiveRegions[i].end + this.snapThreshold &&
          region.start >= this.inactiveRegions[i].end - this.snapThreshold
        ) {
          region.start = this.inactiveRegions[i].end;
          region.end = region.start + regionDuration;
        } else if (
          region.end >= this.inactiveRegions[i].start - this.snapThreshold &&
          region.end <= this.inactiveRegions[i].start + this.snapThreshold
        ) {
          region.end = this.inactiveRegions[i].start;
          region.start = region.end - regionDuration;
        }
      }
      EventBus.$emit('caption_update', {
        start: Math.round(region.start * 1000),
        end: Math.round(region.end * 1000)
      });
    }
  },
  mounted() {
    this.initWave();
    EventBus.$on('file_selected', this.loadFile);
    EventBus.$on('time_get', this.emitTime);
    EventBus.$on('caption_reset', this.empty);
    EventBus.$on('caption_add_index', this.onAddCaption);
    EventBus.$on('caption_changed', this.onCaptionChange);
    EventBus.$on('file_changed', (e) => (this.captionData = e));
    EventBus.$on('caption_removed', this.onRemoveCaption);
  },
  destroyed() {
    EventBus.$off('file_selected', this.loadFile);
    EventBus.$off('time_get', this.emitTime);
    EventBus.$off('caption_reset', this.empty);
    EventBus.$off('caption_add_index', this.onAddCaption);
    EventBus.$off('caption_changed', this.onCaptionChange);
    EventBus.$off('file_changed', this.generateRegions);
    this.wave.unAll();
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


