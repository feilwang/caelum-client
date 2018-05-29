/**
 * Created by Feil(admin@feil.wang) on 2018/5/27.
 */

import * as types from '@/store/types';

export default {
  [types.LOGIN](state, payload) {
    state.token = payload.token;
    state.userInfo = payload.userInfo || {};
  },
  [types.LOGOUT](state) {
    state.token = null;
  },
  [types.GET_USER_INFO](state, payload) {
    state.token = payload.token;
    state.userInfo = payload.userInfo;
  },
  [types.SET_EDIT_FIELD](state, payload) {
    state.edit.field = payload.field;
    state.edit.value = payload.value;
    state.edit.label = payload.label;
    state.edit.placeholder = payload.placeholder;
  },
  [types.CLEAR_EDIT_VALUE](state) {
    state.edit.value = '';
  },
  [types.MODIFY_USER_INFO](state, payload) {
    let field = payload.field;
    let value = payload.value;
    state.userInfo[field] = value;
  }
}
