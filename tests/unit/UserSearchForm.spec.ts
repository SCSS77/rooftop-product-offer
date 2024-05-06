import { shallowMount } from '@vue/test-utils';
import UserSearchForm from '@/components/UserSearchForm.vue';

describe('UserSearchForm.vue', () => {
  it('renders the input field and button correctly', () => {
    const wrapper = shallowMount(UserSearchForm);

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
  });

  it('initializes with empty input and no client found', () => {
    const wrapper = shallowMount(UserSearchForm);

    expect(wrapper.vm.cupsInput).toBe('');
    expect(wrapper.vm.clientFound).toBeNull();
  });

  it('shows error if input is empty when searching', async () => {
    const wrapper = shallowMount(UserSearchForm);
    const button = wrapper.find('button');

    await button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.showError).toBe(true);
  });

  it('shows error if client is not found', async () => {
    const wrapper = shallowMount(UserSearchForm, {
      data() {
        return {
          cupsInput: '000000'
        };
      }
    });
    const button = wrapper.find('button');

    await button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.clientFound).toBeNull();
    expect(wrapper.vm.showError).toBe(false);
  });

  it('navigates to ClientInfo page when client is found', async () => {
    const cups = '123456';
    const mockRouterPush = jest.fn();
    const wrapper = shallowMount(UserSearchForm, {
      data() {
        return {
          cupsInput: cups
        };
      },
      mocks: {
        $router: {
          push: mockRouterPush
        }
      }
    });

    const button = wrapper.find('button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(mockRouterPush).toHaveBeenCalledWith({ name: 'ClientInfo', params: { cups } });
  });
});
