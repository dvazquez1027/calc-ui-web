import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { CalcOperations } from "@/common/constants.js";

Vue.use(Vuex);

const internal = {
  namespaced: true,
  state: {
    wholePart: "",
    fractionalPart: "",
    decimalEntered: false,
    operatorEntered: false,
    stack: [],
    lastOperation: null
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
      let workingOperation = {
        operator: operator,
        operand: Number(context.getters.result)
      };

      if (context.state.operatorEntered && context.state.stack.length > 0) {
        context.state.stack.pop();
      } else if (context.state.stack.length > 0) {
        context.state.lastOperation = {
          operator:
            context.state.stack[context.state.stack.length - 1].operator,
          operand: context.getters.result
        };
        while (
          context.state.stack.length > 0 &&
          CalcOperations.precedence(operator) <=
            CalcOperations.precedence(
              context.state.stack[context.state.stack.length - 1].operator
            )
        ) {
          let op = context.state.stack.pop();
          workingOperation.operand = CalcOperations.operate(
            op.operator,
            op.operand,
            workingOperation.operand
          );
        }
        context.dispatch("initialize", workingOperation.operand + "");
      } else if (
        context.state.lastOperation !== null &&
        operator == CalcOperations.EQUALS
      ) {
        context.dispatch(
          "initialize",
          CalcOperations.operate(
            context.state.lastOperation.operator,
            Number(context.state.lastOperation.operand),
            Number(context.getters.result)
          ) + ""
        );
      }
      if (operator !== CalcOperations.EQUALS) {
        context.state.stack.push(workingOperation);
      }
      context.commit("setOperatorEntered", true);
    },
    inputClear(context) {
      context.commit("clear");
    },
    inputClearAll(context) {
      context.commit("clear");
      context.state.stack.length = 0;
    }
  }
};

const external = {
  namespaced: true,
  state: {
    calculatorID: null,
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
    },
    setCalculatorID(state, id) {
      state.calculatorID = id;
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
    },
    calculatorID(state) {
      return state.calculatorID;
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
    async inputOperator(context, operator) {
      if (context.getters.calculatorID == null) {
        let createResponse = await axios.post(
          "http://localhost:5000/v1/calculator",
          {
            result: 0.0
          }
        );
        context.commit("setCalculatorID", createResponse.data.id);
      }

      let updateResponse = await axios.put(
        "http://localhost:5000/v1/calculator/" + context.getters.calculatorID,
        {
          operations: [
            {
              operationType: operator,
              operand: context.getters.result
            }
          ]
        }
      );
      context.dispatch("initialize", String(updateResponse.data.result));
      context.commit("setOperatorEntered", true);
    },
    inputClear(context) {
      context.commit("clear");
    },
    async inputClearAll(context) {
      context.commit("clear");
      context.state.stack.length = 0;
      if (context.getters.calculatorID !== null) {
        await axios.delete(
          "http://localhost:5000/v1/calculator/" + context.getters.calculatorID
        );
        context.commit("setCalculatorID", null);
      }
    }
  }
};

export default new Vuex.Store({
  modules: {
    internal: internal,
    external: external
  }
});
