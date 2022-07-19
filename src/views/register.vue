<template>
    <div>
  <div class="row">
    <div class="col-sm-4">
        <div class="global-container">
      <div class="card login-form">
        <div class="card-body">
            <img class="img3" src="../assets/regis.png">

            </div>

            <div class="card-text">
                <form @submit.prevent="register">
                    <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="name" class="form-control" id="name" placeholder="Name" v-model="full_name">
                  </div>
                  <div v-if="apierrorNama" class="d-flex mx-2 my-2 text-danger">
                      <b-icon icon="info-circle" class="mt-2 mx-2"></b-icon>{{errorsNama}}
                    </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="Email Address" v-model="email">
                  </div>
                  <div v-if="apierrorEmail" class="d-flex mx-2 my-2 text-danger">
                      <b-icon icon="info-circle" class="mt-2 mx-2"></b-icon>{{errorsEmail}}
                    </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
                  </div>
                  <div v-if="apierrorPassword" class="d-flex mx-2 my-2 text-danger">
                      <b-icon icon="info-circle" class="mt-2 mx-2"></b-icon>{{errorsPassword}}
                    </div>
                  
                  
                  <div class="d-grid gap-2"><button type="submit" class="btn btn-primary">REGISTER</button></div>
                </form>
                            </div>
                            <br>
                            <p class=" text-center">Already have an account?<strong><a href="/login" class="text2 text-decoration-none"> Sign In</a></strong></p>
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
export default {
    name: "registerPage",
    data() {
    return {
      full_name: "",
      email: "",
      password: "",
      facility_id: 1,
      gender: "Male",
      role_id: 1,
      errorsNama: '',
      errorsEmail: '',
      errorsPassword: '',

        apierrorEmail: false,
        apierrorPassword: false,
        apierrorNama: false,
    };
  },
  methods: {
    register() {
      let data = {
        full_name: this.full_name,
        email: this.email,
        password: this.password,
        facility_id: this.facility_id,
        gender: this.gender,
        role_id: this.role_id
      };
      this.$store.dispatch("register", data)
        .then(response => {
          const message = response
          console.log(message)

          this.$router.push({
            name: 'loginPage'
          })
        })
        .catch(error => {
          console.log(error.response.data.error)
          
          //const error = error.response.data.error
          const errorEmail = error.response.data.error.email
          const errorPassword = error.response.data.error.password
          const errorNama = error.response.data.error.full_name
          console.log(errorEmail)
          if(errorEmail){
            this.apierrorEmail = true
            this.errorsEmail = errorEmail
          }else{
            this.apierrorEmail = false
          }
          if(errorPassword){
            this.apierrorPassword = true
            this.errorsPassword = errorPassword
          }else{
            this.apierrorPassword = false
          }
          if(errorNama){
            this.apierrorNama = true
            this.errorsNama = errorNama
          }else{
            this.apierrorNama = false
          }
          
        })
        
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
  font-weight: bold;
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


</style>
