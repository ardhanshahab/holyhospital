<template>
    <div>
  <div class="row">
    <div class="col-sm-4">
      <div class="row global-container"></div>
        <div class="row global-container">
      <div class="d-block card login-form">
        <!-- <b-alert
      v-model="showTop"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000;"
      variant="danger"
      
    >
      {{message}}
    </b-alert> -->
            <div class="card-text">
                <form @submit.prevent="submitEmail">
                        <div class=" mb-7">
                        <div class="d-flex justify-content-center m-1 mb-4">
                        <img src="../assets/Icon/reset password.svg" width="50px" />
                        </div>
                      <label for="exampleInputEmail1" class="form-label my-2">Enter Registered Email</label>
                        <input type="email" v-model="email" class="form-control my-2 " placeholder="Email Address">
                        <div v-if="showTop" class="d-flex mx-2 my-2 text-danger">
                      <b-icon icon="info-circle" class=" mx-2"></b-icon>{{message}}
                    </div>
                        <div class="d-block mt-4">
                          <button type="submit" class="btn btn-primary w100">CONTINUE</button></div>
                          </div>
                </form>
            </div>
            
        </div>
        <div class="row global-container mt-1">
            <p class=" text-center">Back to<a href="/login" class="text2 text-decoration-none"> Login</a></p>
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
import axios from 'axios';
export default {
    name: "findEmail",
    data(){
      return{
        email: '',
        showTop: false,
        message: ''
      }
    },
    methods: {
     async submitEmail(){
        await axios.post('find_email', {email: this.email})
          .then(response => {
        console.log(response)
        const token = response.data.jwt.access_token
        console.log(token)
        this.$localStorage.set('token', token)
        if(token){
           this.$router.push('forgotpassword')   
          }
          })
          .catch(error => {
            console.log(error.response.data.message)
            if (error){
            const message = error.response.data.message
            this.message = message
             this.showTop = true
            //   setTimeout(() => {
            // this.showTop = false;
            //       }, 2000);
            }
          })
        
          
            
            
          

    //   const data = {
    //     email: this.email,
    //   };
    //   this.$store
    //     .dispatch("findEmail", data)
    //     .then(res => {
    //       console.log(this.email)
    //       console.log(res)

    //       const token = this.$localStorage.get('token')
    //      console.log(token)
    //     }).catch(error => {
    //       this.errors = error.response.data.errors
    //     })
     }
      },
    
}
</script>

<style scoped>
.w100{
  width: 100%;
}
.global-container{
    height:30%;
    display:flex;
    align-items:center;
    justify-content: center;
}

.login-form{
    height:300px;
    width: 330px;
    padding:20px;
    background: #F3F3F3;
/* Nonjol/22 */

box-shadow: 0px 7px 22px rgba(0, 0, 0, 0.25);
border-radius: 5px;
top: 50pxpx;
}

.col-sm-8{
    background:#64387E ;
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