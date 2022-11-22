<template>
  <div class="card-container">
    <div class="card-head">
      <img class="img1" src="../assets/list.svg"> 
           FORM EDIT PASIEN
    </div>
    <form>
    <div class="card-body">
      <div class="row mb-3">
        <label for="inputName3" class="col-sm-2 col-form-label">Nama Pasien</label>
          <div class="col-sm-10">
            <input type="name" v-model="patient.full_name" class="form-control" id="inputName3">
              <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
                <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.full_name}}
              </div>
          </div>
      </div>
      <div class="row mb-3">
        <label for="inputName3" class="col-sm-2 col-form-label">Alamat</label>
          <div class="col-sm-10">
            <input type="name" v-model="patient.address" class="form-control" id="inputName3">
              <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
                <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.full_name}}
              </div>
          </div>
      </div>
      <div class="row mb-3">
        <label for="inputName3" class="col-sm-2 col-form-label">Tanggal Lahir</label>
          <div class="col-sm-10">
            <b-datepicker v-model="patient.birthdate" class="form-control" dropright id="example-datepicker"></b-datepicker>
            <!-- <input type="name" v-model="patient.birthdate" class="form-control" id="inputName3"> -->
              <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
                <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.full_name}}
              </div>
          </div>
      </div>
      <div class="row mb-3">
        <label for="inputName3" class="col-sm-2 col-form-label">Golongan Darah</label>
          <div class="col-sm-10">
            <input type="name" v-model="patient.bloodtype" class="form-control" id="inputName3">
              <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
                <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.full_name}}
              </div>
          </div>
      </div>
      <div class="row mb-3">
        <label for="inputName3" class="col-sm-2 col-form-label">Jenis Kelamin</label>
          <div class="col-sm-10">
            <input type="name" v-model="patient.gender" class="form-control" id="inputName3">
              <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
                <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.full_name}}
              </div>
          </div>
      </div>
      <div class="row mb-3">
        <label for="inputName3" class="col-sm-2 col-form-label">NIK</label>
          <div class="col-sm-10">
            <input type="name" v-model="patient.national_id" class="form-control" id="inputName3">
              <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
                <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.full_name}}
              </div>
          </div>
      </div>
      <div class="row mb-3">
        <label for="inputName3" class="col-sm-2 col-form-label">Kode Pasien</label>
          <div class="col-sm-10">
            <input type="name" v-model="patient.patient_code" class="form-control" id="inputName3">
              <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
                <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.full_name}}
              </div>
          </div>
      </div>
      <div class="d-flex gap-2 d-md-flex justify-content-md-end">
        <button class="btn btn-primary me-md-2" type="submit" @click="submit">UPDATE</button>
      </div>
    </div>
  </form>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
    name: "editPatient",
    data(){
      return{
        items: [],
        toggleLength: false,
        error: [],
        national_id: '',
        full_name: '',
        gender: '',
        address: '',
        birthdate: '',
        blood_type: ''
      }
    },
    computed: {
      index () {
        const id = this.$route.params.id  
       return id
      },
    },
    apollo: { 
      patient: {
          query: gql`
           query MyQuery ($id: Int!){
              patient_by_pk(id: $id) {
                id
                full_name
                address
                birthdate
                bloodtype
                gender
                medic_record
                medic_session
                medic_staff
                national_id
                patient_code
              }
            }

          `,
          
          variables () {
              return {
                  id: this.index,
              }
            },
          update: (data) => {
            console.log(data.patient_by_pk)
            return data.patient_by_pk;
          },
      },
 },
    methods: {
     submit(e){
      e.preventDefault();
      // const data = {
      //   national_id: this.patient.national_id,
      //   full_name: this.patient.full_name,
      //   gender: this.patient.gender,
      //   address: this.patient.address,
      //   birthdate: this.patient.birthdate,
      //   blood_type: this.patient.bloodtype,
      //   patient_code: this.patient.patient_code,
      // }
      // console.log(data)
      this.$apollo.mutate({
        mutation: gql`
        mutation updatePatient ($id: Int!, $full_name: String, $gender: String, $bloodtype: String, $birthdate: date, $address: String, $national_id: numeric, $patient_code: String){
            update_patient_by_pk(pk_columns: {id: $id}, _set: {full_name: $full_name, gender: $gender, bloodtype: $bloodtype, birthdate: $birthdate, address: $address, national_id: $national_id, patient_code: $patient_code}) {
              id
              full_name
              patient_code
            }
          }
        `,
        variables: {
            id: this.index,
            national_id: this.patient.national_id,
            full_name: this.patient.full_name,
            gender: this.patient.gender,
            address: this.patient.address,
            birthdate: this.patient.birthdate,
            bloodtype: this.patient.bloodtype,
            patient_code: this.patient.patient_code,
        }
      });
              this.$router.push({name: 'patientData'})
              const message = 'Data Telah Berhasil Diubah'
              this.$localStorage.set('patient', message)
              console.log(message)
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
    padding-bottom:1px;
    width: 200px;
    background: #794B93;
}

.img1{
    height:50px;
    width:50px;

}
</style>