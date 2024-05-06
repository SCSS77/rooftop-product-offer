import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify';

const app = createApp(App);

app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'bottom-right'
} as ToastContainerOptions);

app.use(router).mount('#app');
