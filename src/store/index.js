import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wholePart: 0,
    fractionalPart: 0,
    decimalEntered: false
  },
  mutations: {
    set(state, value) {
      state.value = value;
    },
    inputDigit(state, value) {
      if (!state.decimalEntered) {
        state.wholePart = 10 * state.wholePart + value;
      } else {
        state.fractionalPart = 10 * state.fractionalPart + value;
      }
    },
    inputDecimal(state) {
      state.decimalEntered = true;
    },
    clear(state) {
      state.wholePart = state.fractionalPart = 0;
      state.decimalEntered = false;
    }
  },
  getters: {
    result(state) {
      return (
        state.wholePart +
        (state.fractionalPart > 0 ? "." + state.fractionalPart : "")
      );
    }
  },
  actions: {},
  modules: {}
});
