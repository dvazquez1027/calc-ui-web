import store from "@/store";
import { CalcOperations } from "@/common/constants.js";
import axios from "axios";

jest.mock("axios");

describe("store external implementation", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    store.dispatch("external/inputClearAll");
    console.error = originalConsoleError;
  });

  it("Accepts whole numbers", () => {
    store.dispatch("external/inputDigit", "8");
    expect(store.getters["external/result"]).toBe("8");

    store.dispatch("external/inputDigit", "9");
    expect(store.getters["external/result"]).toBe("89");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Accepts fractional numbers", () => {
    store.dispatch("external/inputDecimal");
    store.dispatch("external/inputDigit", "8");
    store.dispatch("external/inputDigit", "9");
    expect(store.getters["external/result"]).toBe("0.89");

    store.dispatch("external/inputClear");

    store.dispatch("external/inputDecimal");
    store.dispatch("external/inputDigit", "0");
    store.dispatch("external/inputDigit", "7");
    expect(store.getters["external/result"]).toBe("0.07");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Accepts whole and fractional numbers.", () => {
    store.dispatch("external/inputDigit", "8");
    store.dispatch("external/inputDigit", "9");
    store.dispatch("external/inputDecimal");
    store.dispatch("external/inputDigit", "8");
    store.dispatch("external/inputDigit", "9");

    expect(store.getters["external/result"]).toBe("89.89");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Accepts initial value", () => {
    store.dispatch("external/initialize", "45");
    expect(store.getters["external/result"]).toBe("45");
  });

  it("Clears", () => {
    store.dispatch("external/initialize", "89.89");
    store.dispatch("external/inputClear");
    expect(store.getters["external/result"]).toBe("0");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs addition", async () => {
    const postResponse = {
      data: {
        id: "calculator",
        result: 25
      }
    };
    const putResponse = {
      data: {
        id: "calculator",
        result: 50
      }
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(postResponse));
    axios.put.mockImplementationOnce(() => Promise.resolve(putResponse));
    store.dispatch("external/inputDigit", "2");
    store.dispatch("external/inputDigit", "5");
    store.dispatch("external/inputOperator", CalcOperations.PLUS);
    store.dispatch("external/inputDigit", "2");
    store.dispatch("external/inputDigit", "5");
    await store.dispatch("external/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["external/result"]).toBe("50");

    const postResponse2 = {
      data: {
        id: "calculator",
        result: 25.93
      }
    };
    const putResponse2 = {
      data: {
        id: "calculator",
        result: 26
      }
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(postResponse2));
    axios.put.mockImplementationOnce(() => Promise.resolve(putResponse2));
    store.dispatch("external/inputDigit", "2");
    store.dispatch("external/inputDigit", "5");
    store.dispatch("external/inputDecimal");
    store.dispatch("external/inputDigit", "9");
    store.dispatch("external/inputDigit", "3");
    store.dispatch("external/inputOperator", CalcOperations.PLUS);
    store.dispatch("external/inputDecimal");
    store.dispatch("external/inputDigit", "0");
    store.dispatch("external/inputDigit", "7");
    await store.dispatch("external/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["external/result"]).toBe("26");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs subtraction", async () => {
    const postResponse = {
      data: {
        id: "calculator",
        result: 25
      }
    };
    const putResponse = {
      data: {
        id: "calculator",
        result: 0
      }
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(postResponse));
    axios.put.mockImplementationOnce(() => Promise.resolve(putResponse));
    store.dispatch("external/inputDigit", "2");
    store.dispatch("external/inputDigit", "5");
    store.dispatch("external/inputOperator", CalcOperations.MINUS);
    store.dispatch("external/inputDigit", "2");
    store.dispatch("external/inputDigit", "5");
    await store.dispatch("external/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["external/result"]).toBe("0");

    const postResponse2 = {
      data: {
        id: "calculator",
        result: 25.33
      }
    };
    const putResponse2 = {
      data: {
        id: "calculator",
        result: 25
      }
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(postResponse2));
    axios.put.mockImplementationOnce(() => Promise.resolve(putResponse2));
    store.dispatch("external/inputDigit", "2");
    store.dispatch("external/inputDigit", "5");
    store.dispatch("external/inputDecimal");
    store.dispatch("external/inputDigit", "3");
    store.dispatch("external/inputDigit", "3");
    store.dispatch("external/inputOperator", CalcOperations.MINUS);
    store.dispatch("external/inputDecimal");
    store.dispatch("external/inputDigit", "3");
    store.dispatch("external/inputDigit", "3");
    await store.dispatch("external/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["external/result"]).toBe("25");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs multiplication", async () => {
    const postResponse = {
      data: {
        id: "calculator",
        result: 25
      }
    };
    const putResponse = {
      data: {
        id: "calculator",
        result: 625
      }
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(postResponse));
    axios.put.mockImplementationOnce(() => Promise.resolve(putResponse));
    store.dispatch("external/inputDigit", "2");
    store.dispatch("external/inputDigit", "5");
    store.dispatch("external/inputOperator", CalcOperations.MULTIPLY);
    store.dispatch("external/inputDigit", "2");
    store.dispatch("external/inputDigit", "5");
    await store.dispatch("external/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["external/result"]).toBe("625");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Performs division", async () => {
    const postResponse = {
      data: {
        id: "calculator",
        result: 25
      }
    };
    const putResponse = {
      data: {
        id: "calculator",
        result: 1
      }
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(postResponse));
    axios.put.mockImplementationOnce(() => Promise.resolve(putResponse));
    store.dispatch("external/inputDigit", "2");
    store.dispatch("external/inputDigit", "5");
    store.dispatch("external/inputOperator", CalcOperations.DIVIDE);
    store.dispatch("external/inputDigit", "2");
    store.dispatch("external/inputDigit", "5");
    await store.dispatch("external/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["external/result"]).toBe("1");

    expect(console.error).toBeCalledTimes(0);
  });

  it('Uses latest operator', async () => {
    const postResponse = {
      data: {
        id: "calculator",
        result: 25
      }
    };
    const putResponse = {
      data: {
        id: "calculator",
        result: 50
      }
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(postResponse));
    axios.put.mockImplementationOnce(() => Promise.resolve(putResponse));
    store.dispatch("external/inputDigit", "2");
    store.dispatch("external/inputDigit", "5");
    store.dispatch("external/inputOperator", CalcOperations.DIVIDE);
    store.dispatch("external/inputOperator", CalcOperations.PLUS);
    store.dispatch("external/inputDigit", "2");
    store.dispatch("external/inputDigit", "5");
    await store.dispatch("external/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["external/result"]).toBe("50");

    expect(console.error).toBeCalledTimes(0);
  });

  it("Obeys order of operations", async () => {
    const postResponse = {
      data: {
        id: "calculator",
        result: 25
      }
    };
    const putResponses = [
      {
        data: {
          id: "calculator",
          result: 100
        }
      },
      {
        data: {
          id: "calculator",
          result: 75
        }
      }
    ];
    axios.post.mockImplementationOnce(() => Promise.resolve(postResponse));
    axios.put.mockImplementation(() => Promise.resolve(putResponses.pop()));
    store.dispatch("external/inputDigit", "2");
    store.dispatch("external/inputDigit", "5");
    store.dispatch("external/inputOperator", CalcOperations.PLUS);
    store.dispatch("external/inputDigit", "2");
    store.dispatch("external/inputDigit", "5");
    store.dispatch("external/inputOperator", CalcOperations.MULTIPLY);
    store.dispatch("external/inputDigit", "3");
    await store.dispatch("external/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["external/result"]).toBe("100");

    const postResponse2 = {
      data: {
        id: "calculator",
        result: 5
      }
    };
    const putResponses2 = [
      {
        data: {
          id: "calculator",
          result: 40
        }
      },
      {
        data: {
          id: "calculator",
          result: 100
        }
      },
      {
        data: {
          id: "calculator",
          result: 25
        }
      }
    ];
    axios.post.mockImplementationOnce(() => Promise.resolve(postResponse2));
    axios.put.mockImplementation(() => Promise.resolve(putResponses2.pop()));
    store.dispatch("external/inputDigit", "5");
    store.dispatch("external/inputOperator", CalcOperations.MULTIPLY);
    store.dispatch("external/inputDigit", "5");
    store.dispatch("external/inputOperator", CalcOperations.PLUS);
    store.dispatch("external/inputDigit", "5");
    store.dispatch("external/inputOperator", CalcOperations.MULTIPLY);
    store.dispatch("external/inputDigit", "3");
    await store.dispatch("external/inputOperator", CalcOperations.EQUALS);
    expect(store.getters["external/result"]).toBe("40");

    expect(console.error).toBeCalledTimes(0);
  });
});
