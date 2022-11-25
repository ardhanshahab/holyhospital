import Vue from 'vue';
import Router from 'vue-router';
import loginPage from '@/views/login.vue'
import registerPage from '@/views/register.vue'
import homePage from '@/views/home.vue'
import addPatient from'@/views/addpatient.vue'
import editPatient from'@/views/editpatient.vue'
import manageUser from '@/views/manageuser.vue'
import userData from '@/views/userdata.vue'
import patientData from'@/views/patientdata.vue'
import forgotPassword from'@/views/lupapassword.vue'
import  notfound  from '@/views/404.vue'
import outpatientAdd from '@/views/outpatientadd.vue'
import outpatientData from '@/views/outpatientdata.vue'
import outpatientList from '@/views/outpatientlist.vue'
import changePassword from '@/views/changepassword.vue'
import scheduleList from '@/views/schedulelist.vue'
import adddoctorSchedule from '@/views/adddoctorschedule.vue'
import findEmail from '@/views/findemail.vue'
import landingPage from '@/views/landingpage.vue'     
// import HomePage from '../views/home'
// import LoginPage from '../views/login'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landingPage',
      meta: {layout: 'blank'},
      component: landingPage
  },
  {
      path: '/home',
      name: 'homePage',
      component: homePage
  },
  
  {
      path: '/login',
      name: 'loginPage',
      meta: {layout: 'blank'},
      component: loginPage
  },
  {
      path: '/register',
      name: 'registerPage',
      meta: {layout: 'blank'},
      component: registerPage
  },
  {
      path: '*',
      name: 'notfound',
      meta: {layout: 'blank'},
      component: notfound
  },
  
  {
      path: '/addoutpatient',
      name: 'outpatientAdd',
      component: outpatientAdd
  },
  
  {
      path: '/outpatientreport',
      name: 'outpatientReport',
      component: outpatientData
  },
  
  {
      path: '/outpatientlist',
      name: 'outpatientList',
      component: outpatientList
  },
  
  {
      path: '/changepassword',
      name: 'changePassword',
      component: changePassword
  },
  
  {
      path: '/addpatient',
      name: 'addPatient',
      component: addPatient
  },
  {
      path: '/editpatient/:id',
      name: 'editPatient',
      component: editPatient
  },
  {
      path: '/patientdata',
      name: 'patientData',
      component: patientData
  },
  {
      path: '/manageuser',
      name: 'manageUser',
      component: manageUser
  },
  {
      path: '/userdata/:id',
      name: 'userData',
      component: userData
  },
  {
      path: '/forgotpassword',
      name: 'forgotPassword',
      meta: {layout: 'blank'},
      component: forgotPassword
  },
  
  {
      path: '/findemail',
      name: 'findEmail',
      meta: {layout: 'blank'},
      component: findEmail
  },
  
  {
      path: '/schedulelist',
      name: 'scheduleList',
      component: scheduleList
  },
  
  
  {
      path: '/adddoctorschedule',
      name: 'adddoctorSchedule',
      component: adddoctorSchedule
  },
    // { path: '/', component: HomePage },
    // { path: '/login', meta: {layout: 'blank'}, component: LoginPage },

    // // otherwise redirect to home
    // { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})