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
    };
  },
  props: {
    renderer: {
      type: String,
      default: 'canvas',
    },
    loop: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    animationData: {
      type: [Object, String],
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
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
      },
    },
    'instance.isLoaded': {
      handler(val) {
        this.isLoaded = val;
      },
    },
    'instance.playCount': {
      handler(val) {
        this.playCount = val;
      },
    },
  },
  methods: {
    /**
     * @param {Object|null} change
     * @private
     */
    init(change) {
      if (this.instance) {
        this.instance.destroy();
      }

      const {renderer, loop, autoplay} = this;
      const container = this.$refs.lottie;
      const params = {container, renderer, autoplay, loop};

      const {animationData, src} = change || this;

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
        onSegmentStart: 'segment-start',
      };
      Object.entries(events).forEach(([evt, emit]) => instance[evt] = e => this.$emit(emit, e));

      this.$emit('instance', this.instance = instance);
    },

    isPlaying() {
      return this.instance ? !this.instance.isPaused : false;
    },
    /**
     * Start Lottie animation, from current position
     */
    play() {
      this._call('play');
    },
    pause() {
      this._call('pause');
    },
    togglePause() {
      this._call('togglePause');
    },
    /**
     * Restart the Lottie animation
     */
    replay() {
      this._call('replay');
    },
    /**
     * Stops the Lottie animation, and set position to 0
     */
    stop() {
      this._call('stop');
    },

    /**
     * @param {number} value
     * @param {boolean} isFrame - defines if first argument is a time based value or a frame based (default false).
     */
    goToAndStop(value, isFrame = false) {
      this._call('goToAndStop', value, isFrame);
    },
    /**
     *
     * @param {number} value
     * @param {boolean} isFrame - defines if first argument is a time based value or a frame based (default false).
     */
    goToAndPlay(value, isFrame = false) {
      this._call('goToAndPlay', value, isFrame);
    },
    /**
     * Set the direction of the  Lottie animation (forwards/backwords)
     *
     * @param {Number} direction - 1 is forward, -1 is reverse.
     */
    setDirection(direction) {
      this._call('setDirection', direction);
    },
    /**
     * @param {boolean} useSubFrames -  If false, it will respect the original AE fps. If true,
     *                                  it will update on every requestAnimationFrame with intermediate values.
     *                                  Default is true.
     */
    setSubframe(useSubFrames = true) {
      this._call('setSubframe', useSubFrames);
    },
    /**
     * Set the speed releative to normal speed
     * @param {Number} speed - 1 is normal speed.
     */
    setSpeed(speed = 1) {
      this._call('setSpeed', speed);
    },
    /**
     * Get the duration in seconds or frames
     *
     * @param {Boolean} inFrames - If true, returns duration in frames, if false, in seconds.
     */
    getDuration(inFrames = false) {
      this._call('getDuration', inFrames);
    },
    /**
     * Play a portions of the Lottie animation
     *
     * @param {Array|Array[]} segments - Can contain 2 numeric values that will be used as first and last frame of the
     *                                   animation.
     *                                   Or can contain a sequence of arrays each with 2 numeric values.
     * @param {boolean} forceFlag - If set to false, it will wait until the current segment is complete. If true,
     *                              it will update values immediately.
     */
    playSegments(segments, forceFlag) {
      this._call('playSegments(segments', forceFlag);
    },

    /**
     * Mutes the Lottie animation
     */
    mute() {
      this._call('mute');
    },

    /**
     * Unmutes the Lottie animation
     */
    unmute() {
      this._call('unmute');
    },
    /**
     * Set the volume of the Lottie animation
     * @param {Number} val
     */
    setVolume(val) {
      this._call('setVolume', val);
    },
    /**
     * Get the volume of the Lottie animation
     * @return {Number}
     */
    getVolume() {
      this._call('getVolume');
    },

    /**
     * Shows the lottie animation
     */
    show() {
      this._call('show');
    },
    /**
     * Hides the Lottie animation
     */
    hide() {
      this._call('hide');
    },

    /**
     * Removes Lottie instance and releases allocated memory
     */
    destroy() {
      this._call('init', {});
    },

    /**
     * Call method on Lottie instance, if initialized
     * @param method
     * @param args
     * @return {null|*}
     * @private
     */
    _call(method, ...args) {
      return this.instance && this.instance[method](...args);
    },
  },
  mounted() {
    this.init();
  },
};
</script>