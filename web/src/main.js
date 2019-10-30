import Vue from "vue";
import App from "./App.vue";
import VueAwesomeSwiper from "vue-awesome-swiper";

Vue.config.productionTip = false;

import "./assets/scss/style.scss";
import './assets/iconfont/iconfont.css'

import router from "./router";
import "swiper/dist/css/swiper.css";

Vue.use(VueAwesomeSwiper /* { default global options } */);

import Card from './components/Card'
Vue.component('m-card', Card)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
