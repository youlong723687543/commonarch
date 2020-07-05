import axios from "axios";
import store from "./store";
//import { Promise } from "core-js";
//axios的访问配置
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "/api";
} else if (process.env.NODE_ENV == "debug") {
  axios.defaults.baseURL = "";
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = "http://api.123dailu.com/";
}
//创建axios 实例
var instance = axios.create({ timeout: 60000 });
//拦截器
instance.interceptors.request.use(
  config => {
    //登陆过程中携带token来进行登陆验证
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  error => Promise.error(error)
);
//响应拦截处理
instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => Promise.error(error)
);
export default axios;
