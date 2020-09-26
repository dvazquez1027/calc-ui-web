import { mount, createLocalVue } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import CalcOperations from "@/common/constants.js";
import Keypad from "@/components/Keypad.vue";
import CalcButton from "@/components/CalcButton.vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe("Keypad.vue", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn(msg => {
      originalConsoleError(msg);
    });
  });

  afterEach(() => {
    // reset all mocks and restore console.error.
    jest.clearAllMocks();
    console.error = originalConsoleError;
  });

  it("Render with all buttons", async () => {
    const mockClick = jest.fn();
    const wrapper = mount(Keypad, {
      localVue,
      listeners: {
        click: mockClick
      }
    });

    expect(wrapper.exists()).toBe(true);

    const buttons = wrapper.findAllComponents(CalcButton);
    expect(buttons.length).toBeGreaterThan(0);

    const texts = [
      ".",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "+",
      "-",
      "*",
      "/",
      "=",
      "C",
      "AC"
    ];

    const values = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      CalcOperations.PLUS,
      CalcOperations.MINUS,
      CalcOperations.MULTIPLY,
      CalcOperations.DIVIDE,
      CalcOperations.EQUALS,
      CalcOperations.DECIMAL,
      CalcOperations.CLEAR,
      CalcOperations.CLEAR_ALL
    ];

    for (var i = 0; i < buttons.length; ++i) {
      expect(texts.indexOf(buttons.at(i).text())).toBeGreaterThan(-1);
      const button = buttons.at(i).find("button");
      button.trigger("click");
      await wrapper.vm.$nextTick();
      expect(mockClick.mock.calls.length).toBe(i + 1);
      expect(values.indexOf(mockClick.mock.calls[i][0])).toBeGreaterThan(-1);
    }

    expect(console.error).toBeCalledTimes(0);
  });
});
