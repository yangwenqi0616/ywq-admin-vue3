import * as AT from "./action-type";
import { LoginState } from "./index";

export default {
  // 更改权限菜单
  [AT.SET_PERMISSION_VIEW](state: LoginState, payload: []) {
    state.routerList = payload;
  }
};
