import axios from "axios";
import Vue from "vue";
import router from "../router";

const http = axios.create({
  baseURL: "http://localhost:3000/admin/api"
});

// 请求拦截器
http.interceptors.request.use(
  config => {
    if (sessionStorage.token) {
      // 带上token
      config.headers.Authorization = "Bearer " + sessionStorage.token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
http.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message
      });
      // 状态码为401 => 未登录 跳转到登录页面
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
    return Promise.reject(err);
  }
);

export default http;
