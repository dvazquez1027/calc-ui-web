import { mount, createLocalVue } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import CalcButton from "@/components/CalcButton.vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe("CalcButton.vue", () => {
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

  it("renders props.text when passed", async () => {
    const mockClick = jest.fn();
    const keyCap = "0";
    const wrapper = mount(CalcButton, {
      localVue,
      propsData: {
        keyCap: keyCap
      },
      listeners: {
        click: mockClick
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toMatch(keyCap);

    const button = wrapper.find("button");

    button.trigger("click");
    await wrapper.vm.$nextTick();
    expect(mockClick.mock.calls.length).toBe(1);
    expect(mockClick.mock.calls[0]).toEqual([keyCap]);

    expect(console.error.mock.calls.length).toEqual(0);
  });

  it("outputs error when missing property", () => {
    mount(CalcButton, {
      localVue
    });

    expect(console.error).toBeCalled();
  });
});
