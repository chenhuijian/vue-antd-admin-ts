import axios, {AxiosPromise, AxiosRequestConfig, AxiosResponse} from 'axios';
import {notification} from 'ant-design-vue';

import {getToken, setToken} from "@/utils/localToken";
import settings from "@/config/settings";

export interface ResponseData {
  code: Number;
  data?: any;
  msg?: string;
  token?: string;
}

const customCodeMessage: { [key: number]: string } = {
  10002: '当前用户登入信息已失效，请重新登入再操作', // 未登陆
}

const serverCodeMessage: { [key: number]: string } = {
  200: '服务器成功返回请求的数据',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: '服务器发生错误，请检查服务器(Internal Server Error)',
  502: '网关错误(Bad Gateway)',
  503: '服务不可用，服务器暂时过载或维护(Service Unavailable)',
  504: '网关超时(Gateway Timeout)',
}

/**
 * 异常处理函数
 */

const errorHandler = (error: any) => {
  const {response, message} = error
  if (message === 'CustomError') {
    // 自定义错误
    const {config, data} = response
    const {url, baseURL} = config
    const {code, msg} = data
    const reqUrl = url.split('?')[0].replace(baseURL, '')
    const noVerifyBool = settings.ajaxResponseNoVerifyUrl.includes(reqUrl)
    if (!noVerifyBool) {
      notification.error({
        message: '提示',
        description: customCodeMessage[code] || msg || "Error"
      })
      if(code === 10002){
        // router.replace('/user/login');
      }
    }
  } else if (message === 'CancelToken') {
    // 取消请求
    console.log(message)
  } else if (response && response.status) {
    const errorText = serverCodeMessage[response.status] || response.statustext
    const {status, request} = response
    notification.error({
      message: `请求错误 ${status}: ${request.responseURL}`,
      description: errorText,
    })
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return Promise.reject(error)
}

/*
* 请求实例
* 配置request请求时的默认参数
* */
const request = axios.create({
  baseURL: (import.meta.env.VITE_APP_APIHOST || '') as string,
  withCredentials: true,// 当跨域请求时发送cookie
  timeout: 0 // 请求超时时间,5000(单位毫秒) / 0 不做限制
})

// 全局设置 - post请求头
// request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


/**
 * 请求拦截
 */

request.interceptors.request.use(
  async (config: AxiosRequestConfig & { cType?: boolean }) => {
    // 如果设置了cType 说明是自定义 添加 Content-Type类型 为自定义post 做铺垫
    if (config['cType']) {
      // @ts-ignore
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    // 自定义添加token header
    const headerToken = await getToken();
    if (headerToken) {
      // @ts-ignore
      config.headers[settings.ajaxHeadersTokenKey] = headerToken;
    }

    return config;
  },
  /* error => {} */ // 已在 export default catch
)

/**
 * 相应拦截
 */

request.interceptors.response.use(
  async (response: AxiosResponse) => {
    const res: ResponseData = response.data
    const {code, token} = res
    if (code !== 0) {
      return Promise.reject({
        response,
        message: 'CustomError'
      })
    }
    if (token) {
      await setToken(token)
    }
    return response
  },
  /* error => {} */ // 已在 export default catch
)

export default function (config: AxiosRequestConfig): AxiosPromise<any> {
  return request(config).then((response: AxiosResponse) => response.data).catch(error => errorHandler(error))
}
