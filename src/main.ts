import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { createPinia } from 'pinia';
import Mixins from '@/mixins';
import '@/styles/index.scss';
import './permission.js';
import { directive } from '@/directive';
import piniaPluginPersist from 'pinia-plugin-persist';

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// 配置element主题
import '@/styles/element/theme-config.scss';
import '@/styles/element/index.scss';

import * as ElIcon from '@element-plus/icons-vue';

const app = createApp(App);
Object.keys(ElIcon).forEach((key) => {
  app.component(key, ElIcon[key]);
});

const pinia = createPinia();
pinia.use(piniaPluginPersist);
app
  .use(store)
  .use(pinia)
  .use(router)
  .use(ElementPlus)
  .use(directive)
  .mixin(Mixins)
  .mount('#app');
