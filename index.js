<template>
    <div ref="lottie"></div>
</template>

<script>
import lottie from 'lottie-web';

export default {
  data() {
    return {
      instance: null,
      isPaused: true,
      isLoaded: false,
      playCount: 0,
    }
  },
  props: {
    renderer: {
      type: String,
      default: 'canvas'
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    animationData: {
      type: [Object, String],
      default: ''
    },
    src: {
      type: String,
      default: ''
    }
  },
  watch: {
    src(src) {
      this.init({src});
    },
    animationData(animationData) {
      this.init({animationData});
    },

    'instance.isPaused': {
      handler(val) {
        this.isPaused = val;
      }
    },
    'instance.isLoaded': {
      handler(val) {
        this.isLoaded = val;
      }
    },
    'instance.playCount': {
      handler(val) {
        this.playCount = val;
      }
    }
  },
  methods: {
    /**
     * @param {Object|null} change
     */
    init(change) {
      if (this.instance) {
        this.instance.destroy();
      }

      const {renderer, loop, autoplay} = this;
      const container = this.$refs.lottie;
      const params = {container, renderer, autoplay, loop};

      const {animationData, src} = change || this;

      console.log('init change', change, {animationData, src});
      if (animationData) {
        params.animationData = animationData;
      }
      else if (src) {
        params.path = src;
      }
      else {
        return this.$emit('instance', this.instance = null);
      }

      const instance = lottie.loadAnimation(params);
      this.isPaused = instance.isPaused;
      this.isLoaded = instance.isLoaded;
      this.playCount = instance.playCount;
      instance.replay = () => {
        instance.stop();
        setTimeout(() => instance.play());
      };

      const events = {
        onComplete: 'complete',
        onLoopComplete: 'loop-complete',
        onEnterFrame: 'enter-frame',
        onSegmentStart: 'segment-start'
      };
      Object.entries(events).forEach(([evt, emit]) => instance[evt] = e => this.$emit(emit, e));

      this.$emit('instance', this.instance = instance);
    },

    isPlaying() {
      return this.instance ? !this.instance.isPaused : false;
    },
    play() {
      this.instance && this.instance.play();
    },
    pause() {
      this.instance && this.instance.pause();
    },
    togglePause() {
      this.instance && this.instance.togglePause();
    },
    replay() {
      this.instance && this.instance.replay();
    },
    stop() {
      this.instance && this.instance.stop();
    },

    /**
     * @param {number} value
     * @param {boolean} isFrame - defines if first argument is a time based value or a frame based (default false).
     */
    goToAndStop(value, isFrame = false) {
      this.instance && this.instance.goToAndStop(value, isFrame);
    },
    /**
     * @param {number} value
     * @param {boolean} isFrame - defines if first argument is a time based value or a frame based (default false).
     */
    goToAndPlay(value, isFrame = false) {
      this.instance && this.instance.goToAndPlay(value, isFrame);
    },
    /**
     * @param {Number} direction - 1 is forward, -1 is reverse.
     */
    setDirection(direction) {
      this.instance && this.instance.setDirection(direction);
    },
    /**
     * @param {boolean} useSubFrames -  If false, it will respect the original AE fps. If true,
     *                                  it will update on every requestAnimationFrame with intermediate values.
     *                                  Default is true.
     */
    setSubframe(useSubFrames = true) {
      this.instance && this.instance.setSubframe(useSubFrames);
    },
    /**
     * @param {Number} speed - 1 is normal speed.
     */
    setSpeed(speed = 1) {
      this.instance && this.instance.setSpeed(speed);
    },
    /**
     * @param {Boolean} inFrames - If true, returns duration in frames, if false, in seconds.
     */
    getDuration(inFrames = false) {
      this.instance && this.instance.getDuration(inFrames);
    },
    /**
     * @param {Array|Array[]} segments - Can contain 2 numeric values that will be used as first and last frame of the
     *                                   animation.
     *                                   Or can contain a sequence of arrays each with 2 numeric values.
     * @param {boolean} forceFlag - If set to false, it will wait until the current segment is complete. If true,
     *                              it will update values immediately.
     */
    playSegments(segments, forceFlag) {
      this.instance && this.instance.playSegments(segments, forceFlag);
    },

    mute() {
      this.instance && this.instance.mute();
    },
    unmute() {
      this.instance && this.instance.unmute();
    },
    /**
     *
     * @param {Number} val
     */
    setVolume(val) {
      this.instance && this.instance.setVolume(val);
    },
    /**
     * @return {Number}
     */
    getVolume() {
      this.instance && this.instance.getVolume();
    },

    show() {
      this.instance && this.instance.show();
    },
    hide() {
      this.instance && this.instance.hide();
    },

    destroy() {
      this.instance && this.init({});
    }
  },
  mounted() {
    this.init();
  }
}
</script>
