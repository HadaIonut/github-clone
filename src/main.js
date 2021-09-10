import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
  BIconFileCode,
  BIconFolderFill,
  BootstrapVue,
  IconsPlugin,
} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueCodeHighlight from 'vue-code-highlight'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueCodeHighlight); //registers the v-highlight directive

Vue.config.productionTip = false;

Vue.component('BIconFolderFill', BIconFolderFill);
Vue.component('BIconFileCode', BIconFileCode);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
