import store from "@/store";
import { CalcOperations } from "@/common/constants.js";

describe("store.js", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    store.dispatch("inputClear");
    console.error = originalConsoleError;
  });

  it("Accepts whole numbers", () => {
    store.dispatch("inputDigit", "8");
    expect(store.getters.result).toBe("8");

    store.dispatch("inputDigit", "9");
    expect(store.getters.result).toBe("89");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Accepts franctional numbers", () => {
    store.dispatch("inputDecimal");
    store.dispatch("inputDigit", "8");
    store.dispatch("inputDigit", "9");
    expect(store.getters.result).toBe("0.89");

    store.dispatch("inputClear");

    store.dispatch("inputDecimal");
    store.dispatch("inputDigit", "0");
    store.dispatch("inputDigit", "7");
    expect(store.getters.result).toBe("0.07");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Accepts whole and fractional numbers.", () => {
    store.dispatch("inputDigit", "8");
    store.dispatch("inputDigit", "9");
    store.dispatch("inputDecimal");
    store.dispatch("inputDigit", "8");
    store.dispatch("inputDigit", "9");

    expect(store.getters.result).toBe("89.89");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Accepts initial value", () => {
    store.dispatch("initialize", "45");
    expect(store.getters.result).toBe("45");
  });

  it('Clears', () => {
    store.dispatch("initialize", "89.89");
    store.dispatch("inputClear");
    expect(store.getters.result).toBe("0");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs addition", () => {
    store.dispatch("inputDigit", "2");
    store.dispatch("inputDigit", "5");
    store.dispatch("inputOperator", CalcOperations.PLUS);
    store.dispatch("inputDigit", "2");
    store.dispatch("inputDigit", "5");
    store.dispatch("inputOperator", CalcOperations.EQUALS);
    expect(store.getters.result).toBe("50");

    store.dispatch("inputDigit", "2");
    store.dispatch("inputDigit", "5");
    store.dispatch("inputDecimal");
    store.dispatch("inputDigit", "9");
    store.dispatch("inputDigit", "3");
    store.dispatch("inputOperator", CalcOperations.PLUS);
    store.dispatch("inputDecimal");
    store.dispatch("inputDigit", "0");
    store.dispatch("inputDigit", "7");
    store.dispatch("inputOperator", CalcOperations.EQUALS);
    expect(store.getters.result).toBe("26");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs subtraction", () => {
    store.dispatch("inputDigit", "2");
    store.dispatch("inputDigit", "5");
    store.dispatch("inputOperator", CalcOperations.MINUS);
    store.dispatch("inputDigit", "2");
    store.dispatch("inputDigit", "5");
    store.dispatch("inputOperator", CalcOperations.EQUALS);
    expect(store.getters.result).toBe("0");

    store.dispatch("inputDigit", "2");
    store.dispatch("inputDigit", "5");
    store.dispatch("inputDecimal");
    store.dispatch("inputDigit", "3");
    store.dispatch("inputDigit", "3");
    store.dispatch("inputOperator", CalcOperations.MINUS);
    store.dispatch("inputDecimal");
    store.dispatch("inputDigit", "3");
    store.dispatch("inputDigit", "3");
    store.dispatch("inputOperator", CalcOperations.EQUALS);
    expect(store.getters.result).toBe("25");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs multiplication", () => {
    store.dispatch("inputDigit", "2");
    store.dispatch("inputDigit", "5");
    store.dispatch("inputOperator", CalcOperations.MULTIPLY);
    store.dispatch("inputDigit", "2");
    store.dispatch("inputDigit", "5");
    store.dispatch("inputOperator", CalcOperations.EQUALS);
    expect(store.getters.result).toBe("625");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs division", () => {
    store.dispatch("inputDigit", "2");
    store.dispatch("inputDigit", "5");
    store.dispatch("inputOperator", CalcOperations.DIVIDE);
    store.dispatch("inputDigit", "2");
    store.dispatch("inputDigit", "5");
    store.dispatch("inputOperator", CalcOperations.EQUALS);
    expect(store.getters.result).toBe("1");

    expect(console.error).toBeCalledTimes(0);
  });
});
