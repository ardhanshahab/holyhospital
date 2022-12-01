<template>
    <div class="container">
        <div class="d-flex">
              <img src="../assets/Icon/outpatient data form.svg" width="40px"/>
            <h3 class="mt-1 m-1">FORM PASIEN RAWAT JALAN</h3>
        </div>
        <div class="d-block cardinput">
          <ApolloMutation
          :mutation="require('../graphql/outpatientpost.gql')"
          :variables="{ patient_code, datecheck, complaint, medic_session, doctor_id, nurse_id }"
          @done="onDone()"
          >
          <template v-slot="{mutate, loading, error}">
            <div v-if="loading">
              <b-overlay
              id="overlay-background"
              :variant="variant"
              :opacity="opacity"
              :blur="blur"
              :show="show"
              :rounded="rounded"
              :isLoading="isLoading"
              no-wrap
            ></b-overlay>
            </div>
            <div v-if="error">
              <b-alert
              v-model="showTop"
              class="position-fixed fixed-top m-0 rounded-0"
              style="z-index: 2000;"
              variant="secondary"
              >
              {{error}}
            </b-alert>
          </div>
        <b-card bg-variant="light" class="card text-center mx-2 my-2 text-purple">
          <!-- <b-form @submit="onSubmit"> -->
          <b-row class="my-3">  
            <b-col cols="2" class="d-flex justify-content-start">
              <label class="mt-2" aria-controls="fieldset-1">Kode Pasien</label>
            </b-col>
              <b-col cols="10">
              <b-form-group
                id="fieldset-1"
              >
              <b-form-select v-model="patient_code" class="hdrop w100">
                    <option :value="null" disabled>-- Pilih --</option>
                    <option v-for="kode in kode_pasien" :key="kode.id" :value="kode.patient_code">
                      {{ kode.patient_code }} {{kode.full_name}}
                    </option>
                  </b-form-select>
          <div v-if="toggleLength" class="d-flex mx-2 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.patient_code}}
          </div>
        </b-form-group>
              </b-col>
              <!-- <b-col cols="1">
                <b-button class="unguprimary" style=" margin-top: 5px;" @click="btncodes()">CEK</b-button>
              </b-col> -->
          </b-row>

        <b-row class="my-3">
            <b-col cols="2" class="d-flex justify-content-start">
              <label class="mt-2" aria-controls="fieldset-5">Tanggal Kontrol</label>
            </b-col>
              <b-col cols="10">
           <b-form-datepicker id="example-datepicker" v-model="datecheck" class="mb-2 hdrop"></b-form-datepicker>
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
          <b-form-input id="input-3" v-model="complaint" trim class="hdrop" placeholder="Keluhan"></b-form-input>
          <div v-if="toggleLength" class="d-flex mx-2 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon><p>{{error.complaint}}</p>
          </div>
        </b-form-group>
              </b-col>
          </b-row>

          <b-row class="my-3">
            <b-col cols="2" class="d-flex justify-content-start">
              <label class="mt-2" aria-controls="fieldset-6">Jadwal Sesi</label>
            </b-col>
              <b-col cols="10">
                <b-form-select v-model="medic_session" class="hdrop w100">
                    <option :value="null" disabled>-- Pilih --</option>
                    <option v-for="session in sesi" :key="session.id" :value="session.id">
                      {{ session.name }} {{session.time}}
                    </option>
                  </b-form-select>
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
                <b-form-select v-model="doctor_id" class="hdrop w100">
                    <option :value="null" disabled>-- Pilih --</option>
                    <option v-for="doctor in dokter" :key="doctor.id" :value="doctor.id">
                      {{ doctor.name }}
                    </option>
                  </b-form-select>
                        <div v-if="toggleLength" class="d-flex mx-2 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.doctor_code}}
          </div>
              </b-col>
          </b-row>

          <b-row class="my-3">
            <b-col cols="2" class="d-flex justify-content-start">
              <label class="mt-2" aria-controls="fieldset-6">Nama Perawat</label>
            </b-col>
              <b-col cols="10">
                <b-form-select v-model="nurse_id" class="hdrop w100">
                    <option :value="null" disabled>-- Pilih --</option>
                    <option v-for="nurse in perawat" :key="nurse.id" :value="nurse.id">
                      {{ nurse.name }}
                    </option>
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
          <b-form-input id="input-4" v-model="queue" trim class="hdrop" disabled></b-form-input>
        </b-form-group>
        <div class="d-flex justify-content-end">
        <b-btn class="unguprimary" @click="mutate()">Submit</b-btn>
        <b-btn class="unguprimary" @click="onReset()">Reset</b-btn>
        </div>
              </b-col>
          </b-row>
      <!-- </b-form>           -->
        </b-card>
          </template>
          </ApolloMutation>
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
        btncode: false,
        name: '',
        patient_code: null,
        patient_name: '',
        complaint: '',
        queue: '',
        datecheck: '',
        facility: null,
        medic_session: null,
        doctor_id: null,
        nurse_id: null,
        toggleLength : false,
        error: [],
        sesi: [],
        dokter: [],
        perawat: [],
        kode_pasien: [],
        showTop: true,
        variant: 'transparent',
        opacity: 0.85,
        blur: '5px',
        isLoading: true,
        show: true,
        rounded: 'lg',
}
    },
    methods: {
      btncodes(){
        if(this.btncode == false){
          this.btncode = true
        }else{
          this.btncode = false
        }
      },
     async onDone() {
      const data = {
            patient_code: this.patient,
            complaint: this.complaint,
            date_check: this.date_check,
            nurse_id: this.nurse_id,
            session_id: this.jadwal_sesi,
            doctor_id: this.doctor_id,
            queue: this.queue,
          }
          console.log(data)
          this.$router.push('/outpatientreport')
              const message = 'Data Telah Tersimpan'
              this.$localStorage.set('outpatient', message)
              console.log(message)
      
    },
    //       const data = {
    //         patient_code: this.patient_code,
    //         complaint: this.complaint,
    //         date_check: this.date_check,
    //         facility_id: this.facility,
    //         session_id: this.jadwal_sesi,
    //         doctor_code: this.doctor
    //       }
    //       const token = this.$localStorage.get('token')
    //     console.log(token)
    //     await axios.post('outpatient',data, {
    //     headers: { "Authorization" : 'Bearer ' + token
    //     }
    //   })
    //   .then(response => {
    //     console.log(response)
    //     const messageTrue = response.data.message
    //     this.$localStorage.set('messageOutpatient', messageTrue)
    //     this.$router.push('outpatientlist')
    //   })
    //   .catch(error => {
    //     console.log(error.response.data.error)
    //     const errorinput = error.response.data.error
    //     if(error){
    //           this.error = errorinput
    //           this.toggleLength = true
    //     }
        
    //   })
              
    //   },
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
   

 async mounted(){
    try {
    const response = await axios.get('antrian');
    const antrian = response.data.medic_record.length
    const dokter = response.data.doctor_table
    const perawat = response.data.nurse_table
    const pasien = response.data.patient
    const session = response.data.session
    this.kode_pasien = pasien 
    this.perawat = perawat
    this.dokter = dokter
    this.queue = antrian + 1
    this.sesi = session
    
    console.log(response.data.medic_session.length)
  } catch(e) {
    console.log(e);
  }
  }

  
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
