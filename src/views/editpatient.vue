<template>
<div class="card-container">
    <div class="card-head">
<img class="img1" src="../assets/Icon/add patient data.svg">
       
          EDIT PATIENT DATA FORM
    </div>

    <div class="card-body">
<form @submit.prevent="submitData">
  <div class="row mb-3">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Nama Pasien</label>
    <div class="col-sm-10">
      <input type="name" v-model="items.full_name" class="form-control" id="inputEmail3">
           <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.full_name}}
                      </div>

    </div>
  </div>
  <div class="row mb-3">
    <label for="inputNik3" class="col-sm-2 col-form-label">NIK</label>
    <div class="col-sm-10">
      <input type="nik" v-model="items.national_id" class="form-control" id="inputNik3">
           <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.national_id}}
                      </div>

    </div>
  </div>
  <div class="row mb-3">
    <label for="inputAlamat3" class="col-sm-2 col-form-label">Alamat</label>
    <div class="col-sm-10">
      <input type="alamat" v-model="items.address" class="form-control" id="inputAlamat3">
     <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.address}}
                      </div>

    </div>
  </div>
  <div class="row mb-3">
    <label for="inputGender3" class="col-sm-2 col-form-label">Jenis Kelamin</label>
    <div class="col-sm-10">
      <input type="gender" v-model="items.gender" class="form-control" id="inputGender3">
           <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.gender}}
                      </div>

    </div>
  </div>
  <div class="row mb-3">
    <label for="inputDate3" class="col-sm-2 col-form-label">Tanggal Lahir</label>
    <div class="col-sm-10">
      <input type="date" v-model="items.birthdate" class="form-control" id="inputDate3">
      <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.birthdate}}
                      </div>
    </div>
     
  </div>
  <div class="row mb-3">
    <label for="inputBlood3" class="col-sm-2 col-form-label">Golongan Darah</label>
    <div class="col-sm-10">
      <input type="blood" v-model="items.blood_type" class="form-control" id="inputBlood3">
           <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.blood_type}}
                      </div>

    </div>
  </div>
<br><br>
  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
   <button class="btn btn-primary me-md-2" type="submit">UPDATE</button>
  
</div>
</form>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: "editPatient",
    data(){
      return{
        items: [],
        toggleLength: false,
        error: []
      }
    },
    computed: {
      index () {
        const id = this.$route.params.id  
       return id
   },
    },
    methods: {
     async submitData(){
      const data = {
        national_id: this.items.national_id,
        full_name: this.items.full_name,
        gender: this.items.gender,
        address: this.items.address,
        birthdate: this.items.birthdate,
        blood_type: this.items.blood_type
      }
  
    await axios.put(`patient/${this.index}/update`, data)
      .then(response => {
        console.log(response)
        const messageTrue = response.data.message
        this.$localStorage.set('messagePatient', messageTrue)
        this.$router.push({name: 'patientData'})
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
    async mounted(){
         try {
    const response1 = await axios.get(`patient/${this.index}`);
   this.items = response1.data.data;
    console.log(response1.data)
  } catch(e) {
    console.log(e);
  }
}
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
    padding-bottom:1px;
    width: 200px;
    background: #794B93;
}

.img1{
    height:50px;
    width:50px;

}
</style>