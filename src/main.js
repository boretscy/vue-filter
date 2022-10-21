import Vue from 'vue'
import App from './App.vue'
import VueCustomTooltip from '@adamdehaven/vue-custom-tooltip'

Vue.use(VueCustomTooltip, {
  name: 'VueCustomTooltip',
  color: '#000',
  background: '#fff',
  borderRadius: 5,
  fontWeight: 400,
})

new Vue({
  data() {
    return {
      state: window.filter
    }
  },
  render: h => h(App),
}).$mount('#VueFilter')
