import axios, { AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

const isPro = process.env.NODE_ENV === "production";
const baseURL = location.origin + (isPro ? process.env.VUE_APP_SERVER_DIR : "");
const options = {
  baseURL,
  timeout: 60000
};
const r = axios.create(options); // axios实例
const req = axios.create(options); // axios实例
const request = axios.create(options); // axios实例

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

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.withCredentials = true; // 让ajax携带cookie

// 请求拦截
// axios.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         if (!config.params) {
//           config.params = {
//             'access_token': token
//           };
//         } else {
//           // @ts-ignore
//           config.params.access_token = token;
//         }
//       }
//       return config;
//     },
//     (err) => {
//       return Promise.reject(err);
//     }
// );

//拦截响应，做统一处理
axios.interceptors.response.use(
    (response) => {
      const {data: {code, msg}} = response;
      if (code === 0 || code === 200) {
        return response;
      }
      // errorLogic(code);
      return response;
    },
    function (error) {
      ElMessage.warning(`${error}`);
      return Promise.reject(error); // 返回接口返回的错误信息
    }
);

r.interceptors.response.use(
    (response) => {
      const {data: {code, msg, data}} = response;
      if (code === 0 || code === 200) {
        return data;
      }
      errorLogic(code);
      ElMessage.warning(msg);
      return data;
    },
    (error) => {
      return Promise.reject(error); // 返回接口返回的错误信息
    }
);

req.interceptors.response.use(
    ({data}) => {
      const {code, msg} = data;
      if (code === 0 || code === 200) {
        return data;
      }
      errorLogic(code);
      ElMessage.warning(msg);
      return data;
    },
    (error) => Promise.reject(error) // 返回接口返回的错误信息
);

request.interceptors.response.use(
    (response) => {
      errorLogic(response.data.code);
      return response;
    },
    (error) => Promise.reject(error) // 返回接口返回的错误信息
);

/**
 * r实例对应的响应
 */
type R<T> = Promise<T>;

/**
 * req例对应的响应
 */
type Res<T> = Promise<{ code: number; msg: string; data: T }>;

/**
 * request实例对应的响应
 */
type Response<T> = Promise<AxiosResponse<T>>;

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
