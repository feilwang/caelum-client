/**
 * Created by Feil(admin@feil.wang) on 2018/5/27.
 */
const LOGIN = 'LOGIN';
export default {
  [LOGIN](state, payload) {
    state.isLogined = payload.isLogined;
    state.userInfo = payload.userInfo;
  }
}
