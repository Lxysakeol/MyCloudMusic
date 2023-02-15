import App from './App'
import store from './store/index.js'
// #ifndef VUE3
import Vue from 'vue'
import PubFn from 'common/js/utils.js'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$pubFn = PubFn;
Vue.prototype.$store = store
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif