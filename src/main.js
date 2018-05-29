import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import request from './common/request'
import '@/assets/css/common.css'

Vue.config.productionTip = false;
Vue.use(request);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
