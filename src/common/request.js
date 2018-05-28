/**
 * Created by Feil(admin@feil.wang) on 2018/5/28.
 */
import axios from 'axios';
import apiConfig from '@config/api.conf';
import apiList from './apiList';

axios.defaults.baseURL = apiConfig.baseUrl;

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
