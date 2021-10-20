import * as AT from "./action-type";
import { getApi1 } from "@/api";

// 获取验证码的token值
export const getSmsToken = async ({commit}: any, payload: any) => {
  const ret = await getApi1({
    startDate: "string", // 开始时间
    endDate: "string", // 截止时间
    page: 1, // 页码
    size: 2 // 每页大小
  });
  ret.data && commit(AT.SET_VERIFY_CODE, ret.data);
  return ret;
};

// 执行登录操作
// export const handleLoginByToken = async ({ commit }, payload) => {
//   const ret = await request({
//     url: '/api/tax/user/login',
//     method: 'post',
//     data: payload
//   })
//   ret.success && commit(AT.SET_USER_TOKEN, ret.data)
//   return ret
// }
