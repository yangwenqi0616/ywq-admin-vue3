import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import md5 from 'js-md5';
import { ElMessage } from 'element-plus';

interface Interceptor {
  onFulfilled: any;
  onRejected: any;
}

/**
 * Http类,对axios的封装,用于发送http请求
 * 主要实现重复请求的拦截(当同一请求未返回而再次发送的情况)
 * @param {AxiosRequestConfig} config - axios基础配置
 * @param {Interceptor} reqInterceptor - 请求拦截器自定义方法
 * @param {Interceptor} resInterceptor - 响应拦截器自定义方法
 * @author Ywq
 * @date 2022/8/9 10:07
 */

class Http {
  private instance: AxiosInstance; // axios 实例
  private pending: any = {}; // 网络请求记录map结构
  private CancelToken = axios.CancelToken;

  constructor(config: AxiosRequestConfig, reqInterceptor: Interceptor, resInterceptor: Interceptor) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
        (config) => {
          // 通过请求url、method、params、data字段生成md5值
          const key = this.getMd5String(config);
          config.cancelToken = new this.CancelToken(c => {
            if (this.pending[key]) {
              // 上次接口未返回时走此逻辑
              if (Date.now() - this.pending[key] > 3000) {
                // 超过3s，删除对应的请求记录，重新发起请求,即使未返回
                delete this.pending[key];
              } else {
                // 同一请求未返回,5s内再次发送,取消发送
                c('repeated:' + config.url);
              }
            }
            // 记录当前的请求，已存在则更新时间戳
            this.pending[key] = Date.now();
          });
          const token = localStorage.getItem('token');
          if (token) {
            if (!config.params) {
              config.params = {
                'access_token': token
              };
            } else {
              config.params.access_token = token;
            }
          }
          if (reqInterceptor.onFulfilled) {
            return reqInterceptor.onFulfilled(config);
          }
          return config;
        },
        (err) => {
          let error = err;
          if (reqInterceptor.onRejected) {
            error = reqInterceptor.onRejected(err);
          }
          ElMessage.warning(error);
          return Promise.reject(error);
        }
    );
    this.instance.interceptors.response.use(
        (response) => {
          const key = this.getMd5String(response.config);
          if (this.pending[key]) {
            // 请求结束，删除对应的请求记录
            delete this.pending[key];
          }
          if (resInterceptor.onFulfilled) {
            return resInterceptor.onFulfilled(response);
          }
          return response;
        },
        (err) => {
          if (err.message.includes('repeated')) {
            // Toast("您的操作过于频繁,请稍后再试");
            return Promise.reject(err);
          }
          const key = this.getMd5String(err.config);
          if (this.pending[key]) {
            // 请求结束，删除对应的请求记录
            delete this.pending[key];
          }
          // 除repeated外报错逻辑
          let error = err;
          if (resInterceptor.onRejected) {
            error = resInterceptor.onRejected(err);
          }
          ElMessage.warning(error?.message || error);
          return Promise.reject(error); // 返回接口返回的错误信息
        }
    );
  }

  private getMd5String(config: AxiosRequestConfig): string {
    return md5(`${config.url}&${config.method}&${JSON.stringify(config.data)}&${JSON.stringify(config.params)}`);
  }

  get(url: string, params: any) {
    return this.instance.get(url, { params }) as any;
  }

  post(url: string, data: any, config: AxiosRequestConfig | undefined = undefined) {
    return this.instance.post(url, data, config) as any;
  }
}

export default Http;
