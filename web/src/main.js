import Vue from "vue";
import App from "./App.vue";
import VueAwesomeSwiper from "vue-awesome-swiper";

Vue.config.productionTip = false;

import "./assets/scss/style.scss";
import "./assets/iconfont/iconfont.css";

import router from "./router";
import "swiper/dist/css/swiper.css";

Vue.use(VueAwesomeSwiper /* { default global options } */);

import Card from "./components/Card";
Vue.component("m-card", Card);

import axios from "axios";
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "/web/api"
  // baseURL: "http://localhost:3000/web/api"
});

// 全局时间格式化过滤器
import dayjs from "dayjs";
Vue.filter("date", (val, format = "MM/DD") => dayjs(val).format(format));

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
