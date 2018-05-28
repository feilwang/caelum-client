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
  getUserInfo: baseServer('/getUserInfo', 'POST'),
  register: baseServer('/register', 'POST'),
  login: baseServer('/login', 'POST')
};

export default apiList;
