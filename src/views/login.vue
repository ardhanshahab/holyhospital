<template>

    <div>
  <div class="row">
    <div class="col-sm-4">
      
    <b-alert
      v-model="showTop"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000;"
      variant="secondary"
    >
      {{message}}
    </b-alert>

      
      <!-- <div class="alert alert-danger mt-4" v-if="apierror">
                 <b-icon icon="info-circle" class="mx-2"></b-icon> {{ errors }}
                  </div> -->
        <div class="global-container">
      <div class="card login-form">
        <div class="card-body">
          <div class="my-4">
            <img class="img5" src="../assets/login.png">
                </div>
                <form @submit.prevent="userLogin">    
                    <div class="input-group flex-nowrap mb-3">
                    <span class="input-group-text" id="addon-wrapping">
                      <img class="imglogin" src="../assets/login2.png">
                  </span>
                 
                
                    <input type="email" v-model="form.email" class="form-control" placeholder="Email">
                    </div>
                    <div v-if="apierror" class="d-flex mx-2 my-2 text-danger">
                      <b-icon icon="info-circle" class="mt-2 mx-2"></b-icon>{{message.email}}
                    </div>
        
                    <div class="input-group flex-nowrap mb-3">
                    <span class="input-group-text" id="addon-wrapping"><img class="imglogin" src="../assets/password2.png"></span>
                    <input type="password" v-model="form.password" class="form-control" placeholder="Password">
                  </div>
                    <div v-if="apierror" class="d-flex mx-2 my-2 text-danger">
                      <b-icon icon="info-circle" class="mt-2 mx-2"></b-icon>{{message.password}}
                    </div>
  
                    <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary">ADMIN LOGIN</button>
                    </div>
                  </form>
            </div>
            <br><br>
            <a href="/findemail" class="text-center text-decoration-none">FORGOT PASSWORD</a>
            <br><br>
            <p class=" text-center">Don't have an account yet?<a href="/register" class="text2 text-decoration-none"> Sign Up</a></p>

        </div>
       
    </div>
    </div>
    <div class="col-sm-8">
      <img class="img2" src="../assets/amico.svg"><br>
      <center><h4>Manage All Hospital Data Easily</h4></center><br>
      <center><h6 class="paragraph">
        This Hospital Management System there are 3 features<br>
that can be used to make it easier for admins to manage<br>
Patient data, manage employee schedules, and view all<br>
report.
      </h6></center>
    </div>
    
  </div>
</div>
    


</template>

<script>

//import axios from 'axios'
//import { setHeaderToken } from '@/utils/auth';

export default {
    name: "loginPage",
    data(){
      return{
        form: {
          email: '',
          password: '',
        },
        apierrorEmail: false,
        apierrorPassword: false,
        apierror: false,
        errors: '',
          message: [],
          showTop: false,

      }
    },
    methods: {
      userLogin() {
        this.$store.dispatch('login', this.form)
        .then(response => {
          console.log(response)
          this.$router.push({name: 'homePage'})
        }).catch(error => {
          const errorApi = error.response.data.error
          const errorEmail = error.response.data.error.email
          const errorPass = error.response.data.error.password
          if(errorEmail || errorPass){
            this.apierror = true
            this.message = errorApi
          }
          if(errorApi == "Wrong Password" || errorApi == "No Record Found"){
            this.showTop = true
            this.message = errorApi
          }else{
            this.showTop = false
          }
          console.log(error.response.data.error)
          // this.apierror = true
          // this.errors = error.response.data.error
        })
      }
    },
        mounted(){
       const message = this.$localStorage.get('messagePass')
       if(message){
          this.message = message
               this.showTop = true
              setTimeout(() => {
            this.showTop = false;
                  }, 2000);
       }
        
    }


}
</script>

<style scoped>
.global-container{
    height:100%;
    display:flex;
    align-items:center;
    justify-content: center;
}

.login-form{
    height:auto;
    width: 330px;
    padding:20px;
    background: #F3F3F3;
/* Nonjol/22 */

box-shadow: 0px 7px 22px rgba(0, 0, 0, 0.25);
border-radius: 5px;
top: 50pxpx;
}

.col-sm-8{
    background:#794B93 ;
    height: 100vh;
}

.img2{
    height: 350px;
    width:350px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 70px;
}

.img3{
  height: 60px;
  width: 60px;
  margin-top:0px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  
}

input[type="name"],
input[type="email"],
input[type="password"]{
    background: #F3F3F3;
    
}

.btn{
  background:#794B93;
}

a{
  font-size: 13px;
  color: #794B93;
  font-weight: bolder;
}

p{
  font-size: 13px;
  color: #794B93;
}

h4, h6{
  color: white;
  font-weight:600;
  
}

.form-label{
  color:gray;
}

.imglogin{
    width: 16px;
    height: 18px;
}

.img5{
    width:50px;
    height: 60px;
    display: block;
  margin-left: auto;
  margin-right: auto;
}


</style>
