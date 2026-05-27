import type { Module } from 'vuex';
import type { RootState } from '@/store/index';
import { getApi1 } from '@/api/index';
import type { UserData } from './types';
// import * as actions from './actions';
import mutations from './mutations';
// import getters from './getters'

const loginStore: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      userData: {
        name: '单眼皮'
      },
      routerList: [],
      isCollapse: false,
      permissionList: []
    };
  },
  mutations,
  actions: {}
};
export default loginStore;
export type LoginState = {
  userData: UserData | null;
  routerList: [];
  isCollapse: boolean;
  permissionList: [];
};
