import Vue from 'vue'
import App from './App.vue'

new Vue({
  data() {
    return window.filter
  },
  mounted: function() {
    console.log( this.items )
  },
  render: h => h(App),
}).$mount('#VueFilter')
