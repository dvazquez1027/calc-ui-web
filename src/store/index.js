import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wholePart: "0",
    fractionalPart: "0",
    decimalEntered: false
  },
  mutations: {
    set(state, value) {
      state.value = value;
    },
    inputDigit(state, value) {
      console.log(value);
      if (!state.decimalEntered) {
        if (state.wholePart !== "0") {
          state.wholePart += value;
        } else {
          state.wholePart = value;
        }
      } else {
        if (state.fractionalPart !== "0") {
          state.fractionalPart += value;
        } else {
          state.fractionalPart = value;
        }
      }
    },
    inputDecimal(state) {
      state.decimalEntered = true;
    },
    clear(state) {
      state.wholePart = state.fractionalPart = "0";
      state.decimalEntered = false;
    }
  },
  getters: {
    result(state) {
      return (
        state.wholePart +
        (state.decimalEntered ? "." + state.fractionalPart : "")
      );
    }
  },
  actions: {},
  modules: {}
});
