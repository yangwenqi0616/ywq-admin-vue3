import { Module } from 'vuex';
import { RootState } from '@/store/index';
import { getApi1 } from '@/api/index';
import { UserData } from './types';
// import * as actions from './actions';
import mutations from './mutations';
// import getters from './getters'

const loginStore: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      userData: null,
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
  userData: UserData[] | null;
  routerList: [];
  isCollapse: boolean;
  permissionList: [];
};
