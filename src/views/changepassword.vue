<template>
    <div class="container">
        <div class="d-flex">
            <img src="../assets/Icon/change password.svg" width="100"/>
            <h3>Password</h3>
        </div>
        <div class="d-block cardinput">
            <b-card bg-variant="light" class="card text-center mx-2 my-2 text-purple">
            <form @submit.prevent="submitPass">
            <div class="d-flex my-2 mx-2">
            <p class="m-0">Password Baru</p>
            <b-form-input :id="`type-${type}`" :type="type" class="inputpass" v-model="password"></b-form-input>
            </div>
            <div v-if="showTop" class="d-flex mx-2 my-2 text-danger">
                      <b-icon icon="info-circle" class=" mx-2"></b-icon>{{message}}
                    </div>
            <div class="d-flex justify-content-end submit">
            <b-button type="submit" class="ungusecondary">SUBMIT</b-button>
            </div>
            </form>
            </b-card>

        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "changePassword",
    data() {
        return{
            type: 'password',
            password: '',
            message: '',
            showTop: false
        }
    },
    methods:{
         async submitPass(){
            // if(this.password == 0 ){
            // this.message = "Cannot be Blank"
            // this.showTop = true
            // }
            // if(this.password == 1 < 8 ){
            // this.message = "Password must have at least 8 character"
            // this.showTop = true
            // }else{
      const token = this.$localStorage.get('token')
       await axios.post('profile/change_password', {
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
             this.showTop = true
              setTimeout(() => {
            this.showTop = false;
                  }, 2000);
            }
       })
       } 
         //}   
    }
}
</script>

<style scoped>
.ungusecondary {
    background-color: #794B93;
}
.submit {
    margin-top: 10px;
    margin-right: 20px;
}
.inputpass {
    width: 85%;
    margin-left: 20px;
}
</style>