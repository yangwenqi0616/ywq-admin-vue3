import * as AT from "./action-type";
import { LoginState } from "./index";

export default {
  // 更改权限菜单
  [AT.SET_PERMISSION_VIEW](state: LoginState, payload: []) {
    state.routerList = payload;
  },
  [AT.SET_IS_COLLAPSE](state: LoginState, payload: boolean) {
    state.isCollapse = payload;
  }
};
