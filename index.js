import Lottie from './Lottie.vue'

export default {
  /**
   * @param {Object} Vue - Vue instance
   * @param {Object} options
   */
  install(Vue, options = {}) {
    // components to access to the widgets information.
    Vue.component('vue-lottie', Lottie)
  }
}
