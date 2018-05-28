import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import request from './common/request'
import {Col, Row} from 'vant'
import '@/assets/css/common.css'

Vue.config.productionTip = false;
Vue.use(request)
  .use(Row)
  .use(Col);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 未登录则跳转到登录页面
    if (!store.state.isLogined) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
