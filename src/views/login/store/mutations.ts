import * as AT from "./actionType";
import { setKey } from "@/utils/common";

export default {
  // 获取验证码的token 值
  [AT.SET_VERIFY_CODE](state, payload) {
    state.verifyToken = payload;
    setKey("verifyToken", payload);
  },
  // 获取用户的token 值
  [AT.SET_USER_TOKEN](state, payload) {
    state.userToken = payload;
    setKey("userToken", payload);
    sessionStorage.setItem("token", payload);
    // 设置关于用户代付订单信息
    setKey("payCurrentStep", "0");
    setKey("payOrderBatchId", "");
  },
  // 更新当前页面的菜单权限
  [AT.SET_PERMISS_LIST](state, payload) {
    const v = (router, t = []) => {
      router.forEach(item => {
        Reflect.has(item, "businessCode") && t.push(item.businessCode);
        Reflect.has(item, "children") && !!Reflect.get(item, "children") && v(item.children, t);
      });
      return t;
    };
    const k = permiss => permiss.reduce((pre, item) => Reflect.has(item, "code") && pre.concat(item.code), []); // 获取按钮的权限编码
    state.menuList = payload.privilegeGroupTreeVO ? v(payload.privilegeGroupTreeVO.children) : [];
    state.permissList = payload.privilegeVOList ? k(payload.privilegeVOList) : [];

  },
  // 更改权限菜单
  [AT.SET_PERMISS_VIEW](state, payload) {
    state.permissView = payload;
  }
};
