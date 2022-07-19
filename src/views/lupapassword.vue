<template>
    <div>
  <div class="row">
    <div class="col-sm-4">
        <div class="global-container">
      <div class="card login-form">
        <b-alert
      v-model="showTop"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000;"
      variant="secondary"
      
    >
      {{message}}
    </b-alert>
    <!-- <b-alert
      v-model="showError"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000;"
      variant="danger"
      
    >
      {{messageError}}
    </b-alert> -->
   

            <div class="card-text">
                <!-- <form> -->
                      <div class=" mb-3">
                        <div class="d-flex justify-content-center m-1">
                        <img src="../assets/Icon/reset password.svg" width="50px" />
                        </div>
                      <label for="exampleInputEmail1" class="form-label my-2">Change Password</label>
                        <input type="text" v-model="password" class="form-control my-2" placeholder="New Password">
                        <div v-if="showPass" class="d-flex mx-2 my-2 text-danger">
                      <b-icon icon="info-circle" class=" mx-2"></b-icon>{{messagePass}}
                    </div>
                        <label for="exampleInputEmail1" class="form-label my-2">Confirm New Password</label>
                        <input type="text" v-model="confirmpass" class="form-control mt-2 mb-2" placeholder="New Password">
                        <div v-if="showPass" class="d-flex mx-2 my-2 text-danger">
                      <b-icon icon="info-circle" class=" mx-2"></b-icon>{{messagePass}}
                    </div>
                        <div class="d-block mt-4">
                          <button @click="submitPass()" class="btn btn-primary w100">CONFIRM</button></div>
                      </div>
                <!-- </form> -->
            </div>
            <br><br>
            <!-- <p class=" text-center">Back to<a href="/login" class="text2 text-decoration-none"> Login</a></p> -->
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
import axios from 'axios'

export default {
    name: "forgotPassword",
    data(){
      return{
        dismissSecs: 5,
        dismissCountDown: 0,
        confirmpass: '',
        password: '',
        message: '',
        messagePass: '',
        showTop: false,
        showPass: false,
      }
    },
    methods: {
//await axios.post('find_email', data)
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
     async submitPass(){
      if(this.password.length == 0 || this.confirmpass.length == 0){
        this.messagePass = "Cannot be Blank"
      }
      if(this.password.length == 1 < 8 || this.confirmpass.length == 1 < 8){
        this.messagePass = "Password must have at least 8 character"
      }
      if(this.password !== this.confirmpass){
         this.messagePass = 'Incorrect Password'
         console.log(this.messagePass)
         this.showPass = true
      }else{
      const token = this.$localStorage.get('token')
       await axios.post('forgot_password', {
        password: this.password
       },{
        params: {
          token: token
        }
       }).then(response => {
        console.log(response)
        this.$router.push('login')
      if (response.status === 200){
        //alert(response.message)
        const message = response.data.message
        this.$localStorage.set('messagePass', message)
        console.log(response.data.message)
       }

      }).catch(error => {
        console.log(error)
        if (error){
            const message = error.response.data.error.password
            this.message = message
            this.showPass = true
            //  this.showTop = true
            //   setTimeout(() => {
            // this.showTop = false;
            //       }, 2000);
            }
       })
       }
       }
    },
    mounted(){
       const message = this.$localStorage.get('messageEmail')
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

.w100{
  width: 100%;
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