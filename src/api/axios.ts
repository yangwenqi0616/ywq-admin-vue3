import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import md5 from "js-md5";

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

axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.withCredentials = true; // 让ajax携带cookie

const pending: any = {}; // 网络请求记录map结构
const CancelToken = axios.CancelToken;

// 请求拦截
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // 通过请求url、method、params、data字段生成md5值
      const key = md5(`${config.url}&${config.method}&${JSON.stringify(config.data)}&${JSON.stringify(config.params)}`);
      config.cancelToken = new CancelToken(c => {
        if (pending[key]) {
          // 上次接口未返回时走此逻辑
          if (Date.now() - pending[key] > 5000) {
            // 超过5s，删除对应的请求记录，重新发起请求
            delete pending[key];
          } else {
            // 5s以内的已发起请求，取消重复请求
            c("repeated:" + config.url);
          }
        }
        // 记录当前的请求，已存在则更新时间戳
        pending[key] = Date.now();
      });
      const token = localStorage.getItem("token");
      if (token) {
        if (!config.params) {
          config.params = {
            "access_token": token
          };
        } else {
          config.params.access_token = token;
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
);

//拦截响应，做统一处理
axios.interceptors.response.use(
    (response: AxiosResponse) => {
      const key = md5(`${response.config.url}&${response.config.method}&${JSON.stringify(response.config.data)}&${JSON.stringify(response.config.params)}`);
      if (pending[key]) {
        // 请求结束，删除对应的请求记录
        delete pending[key];
      }
      const { data: { code, msg } } = response;
      if (code === 0 || code === 200) {
        return response;
      }
      // errorLogic(code);
      ElMessage.warning(msg);
      return response;
    },
    function (error) {
      if (error.message.includes("repeated")) {
        return Promise.reject(error);
      }
      // 除repeated外报错逻辑
      return Promise.reject(error); // 返回接口返回的错误信息
    }
);

r.interceptors.response.use(
    (response) => {
      const { data: { code, msg, data } } = response;
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
    ({ data }) => {
      const { code, msg } = data;
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
