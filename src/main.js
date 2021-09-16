// import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {store} from './store';
import { createApp } from 'vue'
import VueLazyLoad from 'vue3-lazyload';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
// import {
  // BIconFileCode,
  // BIconFolderFill,
  // BootstrapVue,
  // IconsPlugin,
// } from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
// import VueCodeHighlight from 'vue-code-highlight'

// Vue.use(BootstrapVue);
// Vue.use(IconsPlugin);
// Vue.use(VueCodeHighlight); //registers the v-highlight directive

// Vue.use(store)
// Vue.config.productionTip = false;

// // Vue.component('BIconFolderFill', BIconFolderFill);
// // Vue.component('BIconFileCode', BIconFileCode);

// new Vue({
//   router,
//   store,
//   render: (h) => h(App),
// }).$mount('#app');

const app = createApp(App)

app.use(store)
app.use(router)
app.use(VueLazyLoad)
// app.use(BootstrapVue)

app.mount('#app')
