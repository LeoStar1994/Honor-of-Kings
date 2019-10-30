import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";

import "../static/css/style.css";

import http from "./utils/http";

Vue.config.productionTip = false;

Vue.prototype.$http = http;

// 注册全局的mixin混入 上传文件接口时带上token
Vue.mixin({
  computed: {
    // 上传文件地址
    uploadUrl() {
      return this.$http.defaults.baseURL + "/upload";
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${sessionStorage.token || ""}`
      };
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
