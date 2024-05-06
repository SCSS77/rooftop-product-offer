import { shallowMount } from '@vue/test-utils';
import UserSearchForm from '@/components/UserSearchForm.vue';

describe('UserSearchForm.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(UserSearchForm);
    expect(wrapper.exists()).toBe(true);
  });
});
