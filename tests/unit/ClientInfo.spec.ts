import { shallowMount } from '@vue/test-utils';
import ClientInfo from '@/components/ClientInfo.vue';

describe('ClientInfo.vue', () => {
  const cups = '123456';

  it('renders correctly when client is found', () => {
    const wrapper = shallowMount(ClientInfo, {
      props: { cups }
    });

    expect(wrapper.exists()).toBe(true);

    expect(wrapper.text()).toContain('Te estabamos esperando');
  });

  it('renders "Cliente no encontrado" when client is not found', () => {
    const cupsNotFound = '999999999';
    const wrapper = shallowMount(ClientInfo, {
      props: { cups: cupsNotFound }
    });

    expect(wrapper.text()).toContain('Cliente no encontrado');
  });

  it('displays offer information correctly for standard offer', () => {
    const wrapper = shallowMount(ClientInfo, {
      props: { cups }
    });

    expect(wrapper.text()).toContain('Estás habilitad@ para disfrutar de nuestra promoción #RoofRevolution');
  });

});

