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

  it("Accepts single digit", () => {
    // when
    store.dispatch("internal/inputDigit", "8");

    // then
    expect(store.getters["internal/result"]).toBe("8");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Accepts multiple digits", () => {
    // when
    store.dispatch("internal/inputDigit", "8");
    store.dispatch("internal/inputDigit", "9");

    // then
    expect(store.getters["internal/result"]).toBe("89");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Accepts fractional numbers", () => {
    // when
    store.dispatch("internal/inputDecimal");
    store.dispatch("internal/inputDigit", "8");
    store.dispatch("internal/inputDigit", "9");

    // then
    expect(store.getters["internal/result"]).toBe("0.89");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Accepts fractional numbers 2", () => {
    // when
    store.dispatch("internal/inputDecimal");
    store.dispatch("internal/inputDigit", "0");
    store.dispatch("internal/inputDigit", "7");

    // then
    expect(store.getters["internal/result"]).toBe("0.07");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Accepts whole and fractional numbers.", () => {
    // when
    store.dispatch("internal/inputDigit", "8");
    store.dispatch("internal/inputDigit", "9");
    store.dispatch("internal/inputDecimal");
    store.dispatch("internal/inputDigit", "8");
    store.dispatch("internal/inputDigit", "9");

    // then
    expect(store.getters["internal/result"]).toBe("89.89");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Accepts initial value", () => {
    // when
    store.dispatch("internal/initialize", "45");

    // then
    expect(store.getters["internal/result"]).toBe("45");
  });

  it("Clears", () => {
    // given
    store.dispatch("internal/initialize", "89.89");

    // when
    store.dispatch("internal/inputClear");

    // then
    expect(store.getters["internal/result"]).toBe("0");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs addition on whole numbers", () => {
    // given
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");

    // when
    store.dispatch("internal/inputOperator", CalcOperations.PLUS);
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);

    // then
    expect(store.getters["internal/result"]).toBe("50");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs addition on whole and fractional numbers", () => {
    // given
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputDecimal");
    store.dispatch("internal/inputDigit", "9");
    store.dispatch("internal/inputDigit", "3");

    // when
    store.dispatch("internal/inputOperator", CalcOperations.PLUS);
    store.dispatch("internal/inputDecimal");
    store.dispatch("internal/inputDigit", "0");
    store.dispatch("internal/inputDigit", "7");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);

    // then
    expect(store.getters["internal/result"]).toBe("26");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs subtraction on whole numbers", () => {
    // given
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");

    // when
    store.dispatch("internal/inputOperator", CalcOperations.MINUS);
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);

    // then
    expect(store.getters["internal/result"]).toBe("0");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs subtraction on whole and fractional numbers", () => {
    // given
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputDecimal");
    store.dispatch("internal/inputDigit", "3");
    store.dispatch("internal/inputDigit", "3");

    // when
    store.dispatch("internal/inputOperator", CalcOperations.MINUS);
    store.dispatch("internal/inputDecimal");
    store.dispatch("internal/inputDigit", "3");
    store.dispatch("internal/inputDigit", "3");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);

    // then
    expect(store.getters["internal/result"]).toBe("25");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs multiplication on whole numbers", () => {
    // given
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");

    // when
    store.dispatch("internal/inputOperator", CalcOperations.MULTIPLY);
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);

    // then
    expect(store.getters["internal/result"]).toBe("625");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs multiplication on whole and fractional numbers", () => {
    // given
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDecimal");
    store.dispatch("internal/inputDigit", "5");

    // when
    store.dispatch("internal/inputOperator", CalcOperations.MULTIPLY);
    store.dispatch("internal/inputDigit", "4");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);

    // then
    expect(store.getters["internal/result"]).toBe("10");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs division on whole numbers", () => {
    // given
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");

    // when
    store.dispatch("internal/inputOperator", CalcOperations.DIVIDE);
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);

    // then
    expect(store.getters["internal/result"]).toBe("1");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs division on whole and fractional numbers", () => {
    // given
    store.dispatch("internal/inputDigit", "1");
    store.dispatch("internal/inputDigit", "0");

    // when
    store.dispatch("internal/inputOperator", CalcOperations.DIVIDE);
    store.dispatch("internal/inputDigit", "4");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);

    // then
    expect(store.getters["internal/result"]).toBe("2.5");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Uses latest operator", () => {
    // given
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.DIVIDE);

    // when
    store.dispatch("internal/inputOperator", CalcOperations.PLUS);
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);

    // then
    expect(store.getters["internal/result"]).toBe("50");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Obeys order of operations", () => {
    // given
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");

    // when
    store.dispatch("internal/inputOperator", CalcOperations.PLUS);
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.MULTIPLY);
    store.dispatch("internal/inputDigit", "3");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);

    // then
    expect(store.getters["internal/result"]).toBe("100");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Obeys order of operations 2", () => {
    // given
    store.dispatch("internal/inputDigit", "5");

    // when
    store.dispatch("internal/inputOperator", CalcOperations.MULTIPLY);
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.PLUS);
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.MULTIPLY);
    store.dispatch("internal/inputDigit", "3");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);

    // then
    expect(store.getters["internal/result"]).toBe("40");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Repeats last operation", () => {
    // given
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.PLUS);
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);

    // when
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);

    // then
    expect(store.getters["internal/result"]).toBe("75");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Repeats last operation2", () => {
    // given
    store.dispatch("internal/inputDigit", "2");
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.PLUS);
    store.dispatch("internal/inputDigit", "5");
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);

    // when
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);
    store.dispatch("internal/inputOperator", CalcOperations.EQUALS);

    // then
    expect(store.getters["internal/result"]).toBe("45");
    expect(console.error).toBeCalledTimes(0);
  });
});
