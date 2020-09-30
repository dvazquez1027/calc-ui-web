import Vue from "vue";
import Vuex from "vuex";
import { CalcOperations } from "@/common/constants.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wholePart: "",
    fractionalPart: "",
    decimalEntered: false,
    operatorEntered: false,
    stack: []
  },
  mutations: {
    appendToWholePart(state, value) {
      state.wholePart += value;
    },
    appendToFractionalPart(state, value) {
      state.fractionalPart += value;
    },
    setDecimalEntered(state) {
      state.decimalEntered = true;
    },
    setOperatorEntered(state, value) {
      state.operatorEntered = value;
    },
    clear(state) {
      state.wholePart = state.fractionalPart = "";
      state.decimalEntered = state.operatorEntered = false;
    }
  },
  getters: {
    result(state) {
      return (
        (state.wholePart !== "" ? state.wholePart : "0") +
        (state.decimalEntered
          ? "." + (state.fractionalPart !== "" ? state.fractionalPart : "0")
          : "")
      );
    }
  },
  actions: {
    initialize(context, value) {
      context.commit("clear");
      var parts = value.split(".");
      context.commit("appendToWholePart", parts[0]);
      if (parts.length > 1) {
        context.commit("appendToFractionalPart", parts[1]);
        context.commit("setDecimalEntered");
      }
    },
    inputDigit(context, value) {
      if (context.state.operatorEntered) {
        context.commit("clear");
      }

      if (!context.state.decimalEntered) {
        context.commit("appendToWholePart", value);
      } else {
        context.commit("appendToFractionalPart", value);
      }
    },
    inputDecimal(context) {
      if (context.state.operatorEntered) {
        context.commit("clear");
      }

      context.commit("setDecimalEntered", true);
    },
    inputOperator(context, operator) {
      if (context.state.stack.length === 2) {
        let op = context.state.stack.pop();
        let operand = context.state.stack.pop();

        switch (op) {
          case CalcOperations.PLUS:
            context.dispatch(
              "initialize",
              Number(operand) + Number(context.getters.result) + ""
            );
            break;

          case CalcOperations.MINUS:
            context.dispatch(
              "initialize",
              Number(operand) - Number(context.getters.result) + ""
            );
            break;

          case CalcOperations.MULTIPLY:
            context.dispatch(
              "initialize",
              Number(operand) * Number(context.getters.result) + ""
            );
            break;

          case CalcOperations.DIVIDE:
            context.dispatch(
              "initialize",
              Number(operand) / Number(context.getters.result) + ""
            );
            break;

          default:
            break;
        }
      }
      if (operator !== CalcOperations.EQUALS) {
        context.state.stack.push(context.getters.result);
        context.state.stack.push(operator);
      }
      context.commit("setOperatorEntered", true);
    },
    inputClear(context) {
      context.commit("clear");
    }
  },
  modules: {}
});
