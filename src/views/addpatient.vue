<template>
<div class="card-container">
    <div class="card-head">
        <img class="img1" src="../assets/Icon/add patient data.svg">
       
            NEW PATIENT DATA FORM
            
    </div>

    <div class="card-body">
<form @submit.prevent="inputPatient">
  <div class="row mb-3">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Nama Pasien</label>
    <div class="col-sm-10">
      <input type="name" v-model="full_name" class="form-control" id="inputEmail3">
      <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.full_name}}
                      </div>
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputNik3" class="col-sm-2 col-form-label">NIK</label>
    <div class="col-sm-10">
      <input type="number" v-model="national_id" class="form-control" id="inputNik3">
      <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.national_id}}
                      </div>

    </div>
  </div>
  <div class="row mb-3">
    <label for="inputAlamat3" class="col-sm-2 col-form-label">Alamat</label>
    <div class="col-sm-10">
      <input type="text" v-model="address" class="form-control" id="inputAlamat3">
      <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.address}}
                      </div>

    </div>
  </div>
  <div class="row mb-3">
    <label for="inputGender3" class="col-sm-2 col-form-label">Jenis Kelamin</label>
    <div class="col-sm-10">
      <input type="text" v-model="gender" class="form-control" id="inputGender3">
      <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.gender}}
                      </div>

    </div>
  </div>
  <div class="row mb-3">
    <label for="inputDate3" class="col-sm-2 col-form-label">Tanggal Lahir</label>
    <div class="col-sm-10">
      <b-datepicker v-model="birthdate" class="form-control" dropright id="example-datepicker"></b-datepicker>
      <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.birthdate}}
                      </div>

      </div>
  </div>
  <div class="row mb-3">
    <label for="inputBlood3" class="col-sm-2 col-form-label">Golongan Darah</label>
    <div class="col-sm-10">
      <input type="text" v-model="blood_type" class="form-control" id="inputBlood3">
      <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.blood_type}}
                      </div>

    </div>
  </div>
<br><br>
  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
   <button type="submit" class="btn btn-primary me-md-2" >SUBMIT</button>
  <button class="btn btn-primary" type="reset">RESET</button>
</div>
</form>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: "addPatient",
    data(){
      return{
        national_id: '',
        full_name: '',
        gender: '',
        address: '',
        birthdate: '',
        blood_type: '',
        toggleLength: false,
        error: [],
      }
    },
    methods: {
    async  inputPatient(){
        const data = {
          national_id: this.national_id,
          full_name: this.full_name,
          gender: this.gender,
          address: this.address,
          birthdate: this.birthdate,
          blood_type: this.blood_type
        }
        console.log(this.birthdate)
        const token = this.$localStorage.get('token')
        console.log(token)
        await axios.post('patient',data, {
        headers: { "Authorization" : 'Bearer ' + token
        }
      })
      .then(response => {
        console.log(response)
        const messageTrue = response.data.message
        this.$localStorage.set('messagePatient', messageTrue)
        this.$router.push('patientdata')
      })
      .catch(error => {
        console.log(error.response.data.error)
        const errorinput = error.response.data.error
        if(error){
              this.error = errorinput
              this.toggleLength = true
        }
      })
      }
    },

}
</script>

<style scoped>
.card-body{
    width: 900px;
    height:auto;
    margin: 2rem auto;
    background:#F3F3F3;;
    padding-bottom: 3px;
}

.card-head{
    margin-left: 60px;
    font-size: 20px;
    margin-top: 1.5rem;
}

.btn{
    color:rgb(255, 255, 255);
    background: #794B93;
}

.img1{
    height:50px;
    width:50px;

}

</style>