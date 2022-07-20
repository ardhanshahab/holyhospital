<template>
    <div class="container">
        <div class="d-flex">
              <img src="../assets/Icon/outpatient data form.svg" width="40px"/>

            <h3 class="mt-1 m-1">OUTPATIENT DATA FORM</h3>
        </div>
        <div class="d-block cardinput">
        <b-card bg-variant="light" class="card text-center mx-2 my-2 text-purple">
          <b-form @submit="onSubmit">
          <b-row class="my-3">  
            <b-col cols="2" class="d-flex justify-content-start">
              <label class="mt-2" aria-controls="fieldset-1">Kode Pasien</label>
            </b-col>
              <b-col cols="10">
              <b-form-group
                id="fieldset-1"
              >
          <b-form-input id="input-1" v-model="patient_code" trim class="hdrop" placeholder="RM"></b-form-input>
          <div v-if="toggleLength" class="d-flex mx-2 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.patient_code}}
          </div>
        </b-form-group>
              </b-col>
          </b-row>

          <b-row class="my-3">
            <b-col cols="2" class="d-flex justify-content-start">
              <label class="mt-2" aria-controls="fieldset-2">Nama Pasien</label>
            </b-col>
              <b-col cols="10">
              <b-form-group
                id="fieldset-2"
              >
          <b-form-input id="input-2" v-model="patient_name" trim class="hdrop"></b-form-input>
          </b-form-group>
              </b-col>
          </b-row>

        <b-row class="my-3">
            <b-col cols="2" class="d-flex justify-content-start">
              <label class="mt-2" aria-controls="fieldset-5">Tanggal Kontrol</label>
            </b-col>
              <b-col cols="10">
           <b-form-datepicker id="example-datepicker" v-model="date_check" class="mb-2 hdrop"></b-form-datepicker>
          <div v-if="toggleLength" class="d-flex mx-2 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.date_check}}
          </div>
              </b-col>
          </b-row>
          <b-row class="my-3">
            <b-col cols="2" class="d-flex justify-content-start">
              <label class="mt-2" aria-controls="fieldset-3">Keluhan</label>
            </b-col>
              <b-col cols="10">
              <b-form-group
                id="fieldset-3"
              >
          <b-form-input id="input-3" v-model="complaint" trim class="hdrop"></b-form-input>
          <div v-if="toggleLength" class="d-flex mx-2 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon><p>{{error.complaint}}</p>
          </div>

        </b-form-group>
              </b-col>
          </b-row>

          <b-row class="my-3">
            <b-col cols="2" class="d-flex justify-content-start">
              <label class="mt-2" aria-controls="fieldset-6">Jenis Poli</label>
            </b-col>
              <b-col cols="10">
                <b-form-select
                          id="input-6"
                          v-model="facility"
                          :options="poli"
                          required
                           class="hdrop w100"
                        ></b-form-select>
            <div v-if="toggleLength" class="d-flex mx-2 toggle text-danger">
                  <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.facility_id}}
          </div>
              </b-col>
          </b-row>

          <b-row class="my-3">
            <b-col cols="2" class="d-flex justify-content-start">
              <label class="mt-2" aria-controls="fieldset-6">Jadwal Sesi</label>
            </b-col>
              <b-col cols="10">
                <b-form-select
                          id="input-6"
                          v-model="jadwal_sesi"
                          :options="sesi"
                          required
                           class="hdrop w100"
                        ></b-form-select>
                        <div v-if="toggleLength" class="d-flex mx-2 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.session_id}}
                      </div>
              </b-col>
          </b-row>

          <b-row class="my-3">
            <b-col cols="2" class="d-flex justify-content-start">
              <label class="mt-2" aria-controls="fieldset-6">Nama Dokter</label>
            </b-col>
              <b-col cols="10">
                <b-form-select
                          id="input-6"
                          v-model="doctor"
                          :options="dokter"
                          required
                           class="hdrop w100"
                        >
                        </b-form-select>
                        <div v-if="toggleLength" class="d-flex mx-2 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.doctor_code}}
          </div>
              </b-col>
          </b-row>

          <b-row class="my-3">
            <b-col cols="2" class="d-flex justify-content-start">
              <label class="mt-2" aria-controls="fieldset-4">Nomor Antrian</label>
            </b-col>
              <b-col cols="10">
              <b-form-group
                id="fieldset-4"
              >
          <b-form-input id="input-4" v-model="queue" trim class="hdrop"></b-form-input>
        </b-form-group>
        <div class="d-flex justify-content-end">
        <b-btn class="unguprimary" @click="onSubmit()">Submit</b-btn>
        <b-btn class="unguprimary" @click="onReset()">Reset</b-btn>
        </div>

              </b-col>
          </b-row>

      </b-form>          
        </b-card>

        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "outpatientAdd",
        computed: {

   
           },
    data() {
      return {
        name: '',
        patient_code: '',
        patient_name: '',
        complaint: '',
        queue: '',
        date_check: '',
        facility: null,
        jadwal_sesi: null,
        doctor: null,
        toggleLength : false,
        error: [],

      poli: [{ text: 'Pilih Poli', value: null }, {text:'Umum', value: 1 }, {text:'Anak', value: 2 }, {text:'Gigi', value: 3 }],
      sesi: [{ text: 'Pilih Sesi', value: null }, {text:'Pagi (08.00 - 11.00)', value: 1}, {text:'Siang (13.00 - 15.00)', value: 2 }, {text:'Sore (16.00 - 18.00)', value: 3 }],
      dokter: [{ text: 'Pilih Dokter', value: null }, {text:'dr. Alshad Ahmad', value: 'DCR00001' }, {text:'dr. Adira Putri', value: 'DCR00002' }, {text:'dr. Shelley Herman', value: 'DCR00003' }, {text:'dr. Christie', value: 'DCR00004'}],
      kode_pasien: [],
}
    },
    methods: {
     async onSubmit() {
          const data = {
            patient_code: this.patient_code,
            complaint: this.complaint,
            date_check: this.date_check,
            facility_id: this.facility,
            session_id: this.jadwal_sesi,
            doctor_code: this.doctor
          }
          const token = this.$localStorage.get('token')
        console.log(token)
        await axios.post('outpatient',data, {
        headers: { "Authorization" : 'Bearer ' + token
        }
      })
      .then(response => {
        console.log(response)
        const messageTrue = response.data.message
        this.$localStorage.set('messageOutpatient', messageTrue)
        this.$router.push('outpatientlist')
      })
      .catch(error => {
        console.log(error.response.data.error)
        const errorinput = error.response.data.error
        if(error){
              this.error = errorinput
              this.toggleLength = true
        }
        
      })
              
      },
      onReset() {
        this.toggleLength = false,
      this.doctor = null,
      this.patient_name = '',
      this.jadwal_sesi = null,
      this.facility = null,
      this.queue = null,
      this.complaint = null,
      this.kode_pasien = '',
      this.date_check = null  
      },

    },
   

//  async mounted(){
//     try {
//     const response1 = await axios.get('patient');
//     this.kode_pasien = response1.data.data
//     console.log(response1.data.data)

//   } catch(e) {
//     console.log(e);
//   }
//   console.log(this.patient_code)
//   }

  
}
</script>

<style scoped>
.unguprimary {
    background-color: #50266A;
}

.btnset {
  margin: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 24px;
  padding-right: 24px;
}
.w100{
  width: 100%;
}
.inputdata {
    border-color: black;
}
.tablerow {
    margin: 10px;
}
.textmargin {
    margin-top: 8px;
    margin-bottom: 16px;
    margin-left: 24px;
    margin-right: 0px;
}
.hdrop {
  height: 38px;
  margin-top: 5px;
  margin-bottom: 5px;
 border-radius: 5px; 
 border: 1px solid #1b1515;
 background: #F3F3F3;
}

</style>

<!-- <b-form-group id="input-group-3" label="Food:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group> -->
