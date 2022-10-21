import { createApp } from 'vue'
// 引入 Antd
import Antd from 'ant-design-vue';
import router from '@/config/routes';
import i18n from '@/config/i18n';
// 全局样式
import '@/assets/css/global.less';

import App from './App.vue'

const app = createApp(App)
app
  .use(Antd)
  .use(router)
  .use(i18n)
  .mount('#app')
