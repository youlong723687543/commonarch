import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import actions from "./action";
import getters from "./getter";
import mutations from "./mutations";
import state from "./state";
import shop from "./shop";
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";
export default new Vuex.Store({
  state: { state },
  mutations: { mutations },
  actions: { actions },
  getters: { getters },
  modules: { shop },
  plugins: debug ? [createLogger()] : []
});
