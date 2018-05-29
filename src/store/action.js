/**
 * Created by Feil(admin@feil.wang) on 2018/5/27.
 */

import * as types from '@/store/types';
import {localCache} from '@/common/util';

export default {
  login({commit, state}, payload) {
    localCache.set('token', payload.token);
    commit(types.LOGIN, payload);
  },
  logout({commit, state}, payload) {
    localCache.remove('token');
    commit(types.LOGOUT, payload);
  },
  getUserInfo({commit, state}, payload) {
    commit(types.GET_USER_INFO, payload);
  },
  setEditField({commit, state}, payload) {
    commit(types.SET_EDIT_FIELD, payload);
  },
  clearEditValue({commit}) {
    commit(types.CLEAR_EDIT_VALUE);
  },
  saveUserInfo({commit}, payload) {
    commit(types.MODIFY_USER_INFO, payload);
  }
}
