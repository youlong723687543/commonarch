import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
// import actions from "./shop/action";
// // import getters from "./getter";
// import mutations from "./shop/mutations";
// import state from "./shop/state";
import shop from "./shop";
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";
export default new Vuex.Store({
  modules: { shop },
  plugins: debug ? [createLogger()] : []
});
