/**
 * Created by Feil(admin@feil.wang) on 2018/5/28.
 */
import router from 'vue-router';
import axios from 'axios';
import apiConfig from '@config/api.conf';
import store from '@/store';
import {LOGOUT} from '@/store/types';
import apiList from '@/common/apiList';

// axios 配置
axios.defaults.baseURL = apiConfig.baseUrl;
axios.defaults.timeout = 5000;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `${store.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(LOGOUT);
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  });

function aipCall(apiName, params, success, failed) {
  let options = apiList[apiName];
  options = Object.assign({}, options, {data: params});

  axios(options).then(res => {
    console.log('api result:', res);
    let data = res.data;
    if (data.success) {
      success && success(data)
    } else {
      failed && failed(data)
    }
  }).catch(err => {
    failed && failed(err)
  });
}

function request(options, success, failed) {
  if (options.api !== undefined) {
    aipCall(options.api, options.params, success, failed)
  } else {
    console.error('api不存在')
  }
}

function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true;
  Vue.request = request;
  Object.defineProperties(Vue.prototype, {
    $request: {
      get() {
        return request
      }
    }
  })
}

export default plugin;
