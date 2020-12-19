import { mount, createLocalVue } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import Display from "@/components/Display.vue";

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

  it("Renders completely", () => {
    // when
    const wrapper = mount(Display, {
      localVue,
      propsData: {
        result: "75"
      }
    });

    // then
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toBe("75");
    expect(console.error).toBeCalledTimes(0);
  });

  it("Error when missing properties", () => {
    // when
    const wrapper = mount(Display, {
      localVue
    });

    // then
    expect(console.error).toBeCalledTimes(1);
  });
});
