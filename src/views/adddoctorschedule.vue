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
              <label class="mt-2" aria-controls="fieldset-6">Nama Dokter</label>
            </b-col>
              <b-col cols="10">
                <b-form-select v-model="doctor_id" class="hdrop w100">
                    <option :value="null" disabled>-- Pilih --</option>
                    <option v-for="nurse in dokter" :key="nurse.id" :value="nurse.id">
                      {{ nurse.name }}
                    </option>
                  </b-form-select>
                        <div v-if="toggleLength" class="d-flex mx-2 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.doctor_code}}
          </div>
              </b-col>
          </b-row>

            <b-row class="my-3">
            <b-col cols="2">
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
              <label class="mt-2" aria-controls="fieldset-6">Sesi</label>
            </b-col>
              <b-col cols="10">
                <b-form-select v-model="session_id" class="hdrop w100">
                    <option :value="null" disabled>-- Pilih --</option>
                    <option v-for="nurse in sesi" :key="nurse.id" :value="nurse.id">
                      {{ nurse.name }}
                    </option>
                  </b-form-select>
                        <div v-if="toggleLength" class="d-flex mx-2 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.doctor_code}}
          </div>
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
          session_id: null,
          doctor_id: null,
          nurse_id: null,
          sesi: [
          ],
          dokter: [
          ],
          perawat: [
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
  .w100{
  width: 100%;
}
  /* .selectWrapper{
    border-radius:5px;
    overflow:hidden;
    background:#ffffff;
    border:1px solid #1b1515;
  } */
  </style>