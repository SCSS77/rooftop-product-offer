import { shallowMount } from '@vue/test-utils';
import ClientInfo from '@/components/ClientInfo.vue';

describe('ClientInfo.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ClientInfo, {
      props: {
        cups: '123456',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
