import Vue from 'vue'
import Vuex from 'vuex'
import outpatient from './outpatient.store'
import auth from './auth' 
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    outpatient
    
  }
})
