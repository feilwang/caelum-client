/**
 * Created by Feil(admin@feil.wang) on 2018/5/27.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from '@/store/getters';

Vue.use(Vuex);

const state = {
  token: null,
  userInfo: null,
  edit: {
    field: '',
    value: '',
    label: '',
    placeholder: ''
  }
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
