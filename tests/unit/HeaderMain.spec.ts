import { shallowMount } from '@vue/test-utils';
import HeaderMain from '@/components/HeaderMain.vue';

describe('HeaderMain.vue', () => {
  it('renders the logo with absolute path', () => {
    const wrapper = shallowMount(HeaderMain);
    const logo = wrapper.find('.header__logo');

    expect(logo.exists()).toBe(true);
    expect(logo.attributes('alt')).toBe('Logo');
    expect(logo.attributes('src')).toBe('@/assets/logo-gradient.svg');
  });

  it('renders the "Inicio" link', () => {
    const wrapper = shallowMount(HeaderMain);
    const inicioLink = wrapper.find('nav a[href="/"]');

    expect(inicioLink.exists()).toBe(true);
    expect(inicioLink.text()).toBe('Inicio');
  });

  it('renders the "Sobre nosotros" link', () => {
    const wrapper = shallowMount(HeaderMain);
    const sobreNosotrosLink = wrapper.find('nav a[href="https://corporate.holaluz.com/sobre-nosotros/"]');

    expect(sobreNosotrosLink.exists()).toBe(true);
    expect(sobreNosotrosLink.text()).toBe('Sobre nosotros');
  });
});
