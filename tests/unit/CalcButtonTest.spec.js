import { mount, createLocalVue } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import CalcButton from "@/components/CalcButton.vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe("CalcButton.vue", () => {
  it("renders props.text when passed", async () => {
    const mockClick = jest.fn();
    const msg = "new message";
    const val = 1;
    const wrapper = mount(CalcButton, {
      localVue,
      propsData: {
        text: msg,
        value: val
      },
      listeners: {
        click: mockClick
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toMatch(msg);

    const button = wrapper.find("button");

    button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(mockClick.mock.calls.length).toBe(1);
    expect(mockClick.mock.calls[0]).toEqual([val]);
  });
});
