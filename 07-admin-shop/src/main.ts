import './assets/main.css';
import { VueQueryPlugin } from '@tanstack/vue-query';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import App from './App.vue';
import router from './router';
import './config/yup.config';

const app = createApp(App);
app.use(VueQueryPlugin);
app.use(createPinia());
app.use(Toast);
app.use(router);

app.mount('#app');
