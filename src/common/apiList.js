/**
 * Created by Feil(admin@feil.wang) on 2018/5/28.
 */
let baseServer = function (path, method) {
  return {
    url: path,
    method: method
  }
};
let apiList = {
  getUserInfo: baseServer('/api/getUserInfo', 'POST'),
  register: baseServer('/api/register', 'POST'),
  login: baseServer('/api/login', 'POST')
};

export default apiList;
