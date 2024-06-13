import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);
const pinia = createPinia();

app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'bottom-right'
} as ToastContainerOptions);

app.use(router);
app.use(pinia);

app.mount('#app');
