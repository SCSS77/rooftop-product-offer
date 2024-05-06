import { shallowMount } from '@vue/test-utils';
import HeaderMain from '@/components/HeaderMain.vue';

describe('HeaderMain.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(HeaderMain);
    expect(wrapper.exists()).toBe(true);
  });
});
