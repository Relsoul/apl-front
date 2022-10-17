import { createApp } from 'vue';
import './style.css';
import 'normalize.css';
import App from './App.vue';
import resize from './lib/resize';
resize(window, document, {
  sumNumber: 24,
});

createApp(App).mount('#app');
