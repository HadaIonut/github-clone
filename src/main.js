
import App from './App.vue';
import router from './router';
import {store} from './store';
import { createApp } from 'vue'
import VueLazyLoad from 'vue3-lazyload';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import "bootstrap-icons/font/bootstrap-icons"

import "bootstrap-icons/font/bootstrap-icons.css"


const app = createApp(App)



app.use(store)
app.use(router)
app.use(VueLazyLoad)
// app.use(BootstrapVue)

app.mount('#app')
