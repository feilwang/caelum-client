/**
 * Created by Feil(admin@feil.wang) on 2018/5/27.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex);

const state = {
  isLogined: false,
  userInfo: {}
};

export default new Vuex.Store({
  state,
  actions,
  mutations
})
