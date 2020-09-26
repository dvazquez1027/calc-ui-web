import { mount, createLocalVue } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import { CalcDigits, CalcOperations } from "@/common/constants.js";
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

    const keyCaps = [
      CalcDigits.ONE,
      CalcDigits.TWO,
      CalcDigits.THREE,
      CalcDigits.FOUR,
      CalcDigits.FIVE,
      CalcDigits.SIX,
      CalcDigits.SEVEN,
      CalcDigits.EIGHT,
      CalcDigits.NINE,
      CalcDigits.ZERO,
      CalcOperations.DECIMAL,
      CalcOperations.PLUS,
      CalcOperations.MINUS,
      CalcOperations.MULTIPLY,
      CalcOperations.DIVIDE,
      CalcOperations.EQUALS,
      CalcOperations.CLEAR,
      CalcOperations.CLEAR_ALL
    ];

    for (var i = 0; i < buttons.length; ++i) {
      expect(keyCaps.indexOf(buttons.at(i).text())).toBeGreaterThan(-1);
      const button = buttons.at(i).find("button");
      button.trigger("click");
      await wrapper.vm.$nextTick();
      expect(mockClick.mock.calls.length).toBe(i + 1);
      expect(keyCaps.indexOf(mockClick.mock.calls[i][0])).toBeGreaterThan(-1);
    }

    expect(console.error).toBeCalledTimes(0);
  });
});
