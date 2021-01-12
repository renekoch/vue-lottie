import Lottie from './Lottie.vue';

export {Lottie};
export default {
  /**
   * @param {Object} Vue - Vue instance
   * @param {Object} options
   */
  install(Vue, options = {}) {
    Vue.component(options.tag || 'vue-lottie', Lottie);
  },
};
