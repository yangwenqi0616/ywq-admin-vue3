import * as AT from './action-type';
import { LoginState } from './index';

export default {
  // 保存权限点
  [AT.SET_PERMISSION](state: LoginState, payload: []) {
    state.permissionList = payload;
  },
  // 更改权限菜单
  [AT.SET_PERMISSION_VIEW](state: LoginState, payload: []) {
    state.routerList = payload;
  },
  // 菜单折叠标识
  [AT.SET_IS_COLLAPSE](state: LoginState, payload: boolean) {
    state.isCollapse = payload;
  }
};
