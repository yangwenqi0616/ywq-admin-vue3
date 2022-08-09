import { req, Res } from "../http";
import qs from "qs";

interface LoginParam {
  loginName: string; // 用户名
  loginSecret: string; // 密码
  loginType?: string;
  captchaValue?: string; // 验证码
}

export const login = (param: LoginParam): Res<any> => {
  return req.post("/login", param, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    transformRequest: [data => qs.stringify(data)]
  });
};
