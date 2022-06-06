import Vue from 'vue'
import App from './App.vue'

new Vue({
  data() {
    return {
      state: window.filter
    }
  },
  mounted: function() {
    console.log(this.state)
  },
  render: h => h(App),
}).$mount('#VueFilter')
