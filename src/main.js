import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import defaultLayout from './layouts/defaultlayout.vue'
import blankLayout from './layouts/blank.vue'
import store from './store'
import axios from 'axios'
import { setHeaderToken } from './utils/auth'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)
import VueCookie from 'vue-cookie'
import { createProvider } from './vue-apollo'
Vue.use(VueCookie)


axios.defaults.baseURL = 'https://holyhos.hasura.app/api/rest/'
Vue.component('default-layout', defaultLayout)
Vue.component('blank-layout', blankLayout)


Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
const token = localStorage.getItem('token');

if (token) { 
  setHeaderToken(token) 
}

store.dispatch('get_user', token)
.then(() => {
  new Vue({
    router,
    store,
    apolloProvider: createProvider(),
    render: h => h(App)
  }).$mount('#app')
}).catch((error) => {
  console.error(error);
})
