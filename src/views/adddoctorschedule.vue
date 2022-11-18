<template>
  <div class="container my-2">
          <div class="d-flex text-center">
              <!-- <img src="@/assets/Icon/add doctor schedule.svg" width="70"/> -->
              <h3 class="textmargin">ADD DOCTOR & NURSE SCHEDULE</h3>
          </div>
          <ApolloMutation
          :mutation="require('../graphql/schedulepost.gql')"
          :variables="{ date, doctor_id, nurse_id, session_id}"
          @done="onDone()"
          >
          <template v-slot="{mutate, loading, error}">
            <div class="d-block">
              <b-card bg-variant="light" class="card text-center mx-2 my-2 text-purple">
              <!-- <b-form @submit="onSubmit" @reset="onReset"> -->
            <b-row class="my-3">
              <b-col cols="2">
                <label class="mt-2" aria-controls="fieldset-1">Nama Doctor</label>
              </b-col>
                <b-col cols="10">
                          <b-form-select
                          id="input-3"
                          v-model="doctor_id"
                          :options="dokter"
                          required
                          class="w-100 hdrop selectWrapper"
                        ></b-form-select>
                </b-col>
            </b-row>
            <b-row class="my-3">
              <b-col cols="2">
                <label class="mt-2" aria-controls="fieldset-1">Nama Nurse</label>
              </b-col>
                <b-col cols="10">
                          <b-form-select
                          id="input-3"
                          v-model="nurse_id"
                          :options="nurse"
                          required
                          class="w-100 hdrop selectWrapper"
                        ></b-form-select>
                </b-col>
            </b-row>
            <b-row class="my-3">
              <b-col cols="2">
                <label class="mt-2" aria-controls="fieldset-1">Jenis Perawatan</label>
              </b-col>
                <b-col cols="10">
                    <b-form-group id="fieldset-1">
                        <b-form-input id="input-1" disabled v-model="jenis_perawatan" trim class="hdrop"></b-form-input>
                    </b-form-group>
              </b-col>
            </b-row>
            <b-row class="my-3">
              <b-col cols="2">
                <label class="mt-2" aria-controls="fieldset-1">Pilih Hari</label>
              </b-col>
                <b-col cols="10">
                 <b-form-datepicker id="example-datepicker" v-model="date" class="mb-2 hdrop"></b-form-datepicker>
                </b-col>
            </b-row>
                  <b-row class="my-3">
                      <b-col cols="2">
                        <label class="mt-2" aria-controls="fieldset-1">Pilih Sesi</label>
                      </b-col>
                      <b-col cols="10">
                        <b-form-select
                          id="input-3"
                          v-model="session_id"
                          :options="sesi"
                          required
                          class="w-100 hdrop"
                        >
                      </b-form-select>
                      </b-col>
                  </b-row>
              <div class="d-flex mx-2 justify-content-end">
              <b-button :disabled="loading" @click="mutate()" class="unguprimary btnset">Submit</b-button>
              </div>
          </b-card>
          </div>
          <div v-if="mutate">
            <b-modal id="modalPopover" title="Modal with Popover" ok-only>
                <p>
                  Data Telah tersimpan 
                  <b-button pills href="/schedulelist">OK</b-button>
                  </p>
              </b-modal>
          </div>
          <div v-if="error">
            {{error}}
          </div>
          </template>
          </ApolloMutation>      
      </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
      name: 'addnurseSchedule',
      computed: {
        stateJP() {
          return this.jenis_perawatan.length >= 4
        },
        invalidfeedbackKP() {
          if (this.jenis_perawatan.length > 0) {
            return 'Minimal 4 huruf characters.'
          }
          return 'Harap masukan Kode Pasien.'
        },
  
      },
      data() {
        return {
          jenis_perawatan: 'Rawat Jalan',
          date: '',
          session_id: '',
          doctor_id: '',
          nurse_id: '',
          sesi: [
            { value: null, text: 'Pilih' },
            { value: '1', text: 'Pagi' },
            { value: '2', text: 'Siang' },
            { value: '3', text: 'Malam' }
          ],
          dokter: [
            { value: null, text: 'Pilih' },
            { value: '1', text: 'Hanna' }
          ],
          nurse: [
            { value: null, text: 'Pilih' },
            { value: '2', text: 'Eli' }
          ],        
     }
      },
      methods: {
          onDone() {
              console.log(this.hari)
              console.log(this.jenis_perawatan)
              console.log(this.jadwal_sesi)
              console.log(this.nama_dokter)
              this.$router.push('/schedulelist')
              const message = 'Data Telah Tersimpan'
              this.$localStorage.set('schedule', message)
              console.log(message)
          }
      },
      async mounted() {
          try {
            const response = await axios.get('wsschedule');
          // this.dokter = response.data.medical_staff
          // this.sesi = response.data.session 
            console.log(response.data)
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
  .ungusecondary {
      background-color: #794B93;
  }
  .hdrop {
    height: 38px;
    margin-top: 5px;
    margin-bottom: 5px;
   border-radius: 5px; 
   border: 1px solid #1b1515;
   background: #F3F3F3;
  }
  /* .selectWrapper{
    border-radius:5px;
    overflow:hidden;
    background:#ffffff;
    border:1px solid #1b1515;
  } */
  </style>