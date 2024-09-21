import App from './App'
import './utils/common.css'

// 全局混入,开通分享功能
import share from '@/utils/share.js'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.mixin(share)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  app.mixin(share)
  return {
    app
  }
}
// #endif