import Vue from "vue";
import Vuex from "vuex";
import actions from "./action";
import getters from "./getter";
import mutations from "./mutations";
import state from "./state";
import shop from "./shop";
Vue.use(Vuex);

export default new Vuex.Store({
  state: { state },
  mutations: { mutations },
  actions: { actions },
  getters: { getters },
  modules: { shop }
});
