import axios, { AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import Http from "@/utils/class/http-request";

const isPro = process.env.NODE_ENV === "production";
const baseURL = location.origin + (isPro ? process.env.VUE_APP_SERVER_DIR : "");
const options = {
  baseURL,
  timeout: 60000
};
/**
 * 用于未登录情况下跳入登录页
 * @code {number}状态码
 */
const errorLogic = (code: number): void => {
  if (/^8\d{2}$/.test(String(code))) {
    ElMessage.warning("程序验证已过期，请重新登录");
    const timer = setTimeout(() => {
      if (process.env.NODE_ENV === "production") {
        location.href = process.env.BASE_URL + "login";
      } else {
        location.href = "/login";
      }
      clearTimeout(timer);
    }, 2000);
  }
};

axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.withCredentials = true; // 让ajax携带cookie

const r = new Http(options, {
      onFulfilled: null,
      onRejected: null
    },
    {
      onFulfilled: (response: AxiosResponse) => {
        const { data: { code, message, data } } = response;
        if (code === 0 || code === 200) {
          return data;
        }
        ElMessage.warning(message);
        return Promise.reject(data);
      },
      onRejected: null
    }
);

const req = new Http(options, {
      onFulfilled: null,
      onRejected: null
    },
    {
      onFulfilled:
          (response: AxiosResponse) => {
            const { data } = response;
            const { code, message } = data;
            if (code === 0 || code === 200) {
              return data;
            }
            ElMessage.warning(message);
            return Promise.reject(data);
          },
      onRejected: null
    }
);

const request = new Http(options, {
      onFulfilled: null,
      onRejected: null
    },
    {
      onFulfilled: (response: any) => {
        const { data: { code, message } } = response;
        if (code === 0 || code === 200) {
          return response;
        }
        ElMessage.warning(message);
        return Promise.reject(response);
      },
      onRejected: null
    }
);

/**
 * r实例对应的响应
 */
type R<T> = Promise<AxiosResponse<T>>;

/**
 * req例对应的响应
 */
type Res<T> = Promise<AxiosResponse<{ code: number; message: string; data: T }>>;

/**
 * request实例对应的响应
 */
type Response<T> = Promise<AxiosResponse<Promise<AxiosResponse<T>>>>;

export { r, req, request, R, Res, Response };

// #utf8 编码否则会出现中文乱码
// 200=成功
// 0=成功
// 400=参数异常
// 404=资源不存在
// 401=需要认证后访问
// 403=系统拒绝访问
// 500=系统异常
// 504=请求超时
// 700=用户名不能为test
// 701=用户不存在
// 800=验证码不正确
// 801=不支持的登录类型
// 802=登录失败
// 803=账户名或者密码输入错误
// 804=账户被锁定，请联系管理员
// 805=密码过期，请联系管理员
// 806=账户过期，请联系管理员
// 807=账户被禁用，请联系管理员
// 808=账户没有登录
// 809=没有权限访问
// 813=未查到法院信息
// 814=不支持跨省查询
// 815=不支持自建查询
