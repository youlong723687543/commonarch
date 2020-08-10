import axios from "axios";
import store from "./store";
import { Loading } from "element-ui";
//声明一个loading 空变量
let loadingIsShow = null;

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
    // 添加一个loading事件
    loadingIsShow = Loading.service({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0,0,0,0.7)"
    });
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
    loadingIsShow.close();
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => Promise.error(error)
);
export default axios;
