import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    value: 0
  },
  mutations: {
    store(state, value) {
      state.value = value;
    }
  },
  getters: {
    result(state) { 
      return state.value;
    }
  },
  actions: {},
  modules: {}
});
