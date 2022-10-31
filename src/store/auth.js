import router from "@/router"
import { removeHeaderToken, setHeaderToken } from "@/utils/auth"
// 
import axios from "axios"
import VueCookie from "vue-cookie"
export default{
    state: {
        user: null,
        isLoggedIn: false,  
    },
    mutations: {
        set_user (state, data) {
            state.user = data
            state.isLoggedIn = true
          }, 
          reset_user (state) {
            state.user = null
            state.isLoggedIn = false
          } 
    },
    getters:{
        isLoggedIn (state){
            return state.isLoggedIn
          },
          user (state) {
            return state.user
          } 
    },
    actions: { 
        login({ dispatch, commit }, data) {
            return new Promise((resolve, reject) => { 
              axios.post('login', data)
               .then(response => {
                 const token = response.data.jwt.access_token  
                 localStorage.setItem('token', token) 
                 setHeaderToken(token) 
                  dispatch('get_user')
                 resolve(response)
                 console.log(response.data.data.full_name)
                 const tokennama = response.data.data.full_name
                 localStorage.setItem('nama', tokennama) 
                 const tokenroles = response.data.data.roles
                 localStorage.setItem('roles', tokenroles) 
                console.log(response)
                })
               .catch(err => {
                 commit('reset_user')  
                 localStorage.removeItem('token')
                 reject(err)
              })
            })
          },
          async get_user({commit}){ 
            if(!localStorage.getItem('token')){
              return  
            }
            try{ 
              const response = await axios.get('user')
                const set_user = response.data.data
                commit('set_user', set_user)
                console.log(response.data.data)
            } catch (error){
                commit('reset_user') 
                removeHeaderToken()
                localStorage.removeItem('token')
                const token = localStorage.getItem('token')
                router.push('login')
                console.log(token)
                
                return error
            } 
          },
          logout({ commit }) {
            return new Promise((resolve) => {
             commit('reset_user')
             localStorage.removeItem('token')
             localStorage.removeItem('roles')
             localStorage.removeItem('nama')
             
             VueCookie.delete('token')
             removeHeaderToken()
             resolve()
            })
           },
           
           register({ commit }, data) {
            return new Promise((resolve, reject) => { 
             axios.post('register', data)
              .then(resp => {
                console.log(resp.message) 
               resolve(resp)
              })
              .catch(err => {
               commit('reset_user')   
               reject(err)
              })
            })
           },
        // async findEmail({ commit }, data) {
        //   // return new Promise((resolve, reject) => { 
        //   // const email = 'ardhan@holyhos.co.id'
        //     await axios.post('find_email', data)
        //        .then(response => {
        //         console.log(response)
        //         const token = response.data.jwt.access_token  
        //         localStorage.setItem('token', token) 
        //         setHeaderToken(token) 
                
        //         })
        //        .catch(err => {
        //          commit('reset_user')  
        //          console.log(err)
        //         //  reject(err)
        //       })
        //     // })
        //    },
        //    forgot_password({ commit }, data) {
            
        //      axios.post(`forgot_password`,data)
        //       .then(resp => {
        //         console.log(resp) 
               
        //       })
        //       .catch(err => {
        //        commit('reset_user') 
        //        console.log(err)  
               
        //       })
        
        //    },
    } 
  }
