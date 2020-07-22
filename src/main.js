import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vue-video-player/src/custom-theme.css";
import "video.js/dist/video-js.css";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(VideoPlayer);
Vue.use(ElementUI)
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
