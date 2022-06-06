import Vue from 'vue'
import App from './App.vue'

new Vue({
  data() {
    return {
      state: window.filter
    }
  },
  render: h => h(App),
}).$mount('#VueFilter')
