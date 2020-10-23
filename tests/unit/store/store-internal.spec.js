import store from "@/store";
import { CalcOperations } from "@/common/constants.js";

describe("store internal implementation", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    store.dispatch("internal/inputClear");
    console.error = originalConsoleError;
  });

  it("Accepts whole numbers", () => {
    store.dispatch("internal/inputDigit", "8");
    expect(store.getters["internal/result"]).toBe("8");

    store.dispatch("internal/inputDigit", "9");
    expect(store.getters["internal/result"]).toBe("89");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Accepts fractional numbers", () => {
    store.dispatch("internal/inputDecimal");
    store.dispatch("internal/inputDigit", "8");
    store.dispatch("internal/inputDigit", "9");
    expect(store.getters["internal/result"]).toBe("0.89");

    store.dispatch("internal/inputClear");

    store.dispatch("internal/inputDecimal");
    store.dispatch("internal/inputDigit", "0");
    store.dispatch("internal/inputDigit", "7");
    expect(store.getters["internal/result"]).toBe("0.07");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Accepts whole and fractional numbers.", () => {
    store.dispatch("internal/inputDigit", "8");
    store.dispatch("internal/inputDigit", "9");
    store.dispatch("internal/inputDecimal");
    store.dispatch("internal/inputDigit", "8");
    store.dispatch("internal/inputDigit", "9");

    expect(store.getters["internal/result"]).toBe("89.89");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Accepts initial value", () => {
    store.dispatch("internal/initialize", "45");
    expect(store.getters["internal/result"]).toBe("45");
  });

  it("Clears", () => {
    store.dispatch("internal/initialize", "89.89");
    store.dispatch("internal/inputClear");
    expect(store.getters["internal/result"]).toBe("0");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs addition", () => {
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.PLUS);
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["internal/result"]).toBe("50");

    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputDecimal");
    store.dispatch("internal/inputDigit", "9");
    store.dispatch("internal/inputDigit", "3");
    store.dispatch("internal/inputOperator", CalcOperations.PLUS);
    store.dispatch("internal/inputDecimal");
    store.dispatch("internal/inputDigit", "0");
    store.dispatch("internal/inputDigit", "7");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["internal/result"]).toBe("26");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs subtraction", () => {
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.MINUS);
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["internal/result"]).toBe("0");

    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputDecimal");
    store.dispatch("internal/inputDigit", "3");
    store.dispatch("internal/inputDigit", "3");
    store.dispatch("internal/inputOperator", CalcOperations.MINUS);
    store.dispatch("internal/inputDecimal");
    store.dispatch("internal/inputDigit", "3");
    store.dispatch("internal/inputDigit", "3");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["internal/result"]).toBe("25");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs multiplication", () => {
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.MULTIPLY);
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["internal/result"]).toBe("625");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs division", () => {
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.DIVIDE);
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["internal/result"]).toBe("1");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Uses latest operator", () => {
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.DIVIDE);
    store.dispatch("internal/inputOperator", CalcOperations.PLUS);
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["internal/result"]).toBe("50");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Obeys order of operations", () => {
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.PLUS);
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.MULTIPLY);
    store.dispatch("internal/inputDigit", "3");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["internal/result"]).toBe("100");

    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.MULTIPLY);
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.PLUS);
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.MULTIPLY);
    store.dispatch("internal/inputDigit", "3");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["internal/result"]).toBe("40");

    expect(console.error).toBeCalledTimes(0);
  });
});
