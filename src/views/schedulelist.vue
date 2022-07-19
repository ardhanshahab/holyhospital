<template>
    <div class="container my-2">
        <div class="d-flex">
            <img src="@/assets/Icon/schedule list.svg" width="70"/>
            <h3 class="textmargin">SCHEDULE LIST</h3>
        </div>
        <div class="d-block">
            <b-card bg-variant="light" class="card text-center mx-2 my-2 text-purple">
            <div class="d-flex">
            <p class="m-0 p-2">Tanggal</p>
            <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2 hdrop"></b-form-datepicker>
            </div>
            <div v-if="value">
                <div class="cardlist" >
                    <b-card-text class="d-flex justify-content-start" >Perawat (08.00 - 16.00) </b-card-text>
                    <img src="../assets/Icon/drop downblack.svg" @click="togglescheduleSus()" width="30px" class="ddown d-flex justify-content-end"/>
            </div>
            <div v-if="togglejadwalSus">
                    <div class="cardlist" v-for="schedule in searchNurse" :key="schedule" >
                        <p>{{schedule.doctor_name}}</p>
                    </div>
                </div>
                <div class="cardlist" >
                    <b-card-text class="d-flex justify-content-start" >Dokter Pagi (08.00 - 10.00) </b-card-text>
                    <img src="../assets/Icon/drop downblack.svg" @click="toggleschedulePagi()" width="30px" class="ddown d-flex justify-content-end"/>
            </div>
            <div v-if="togglejadwalPagi">
                     <div class="cardlist" v-for="schedule in searchList" :key="schedule" >
                        <p>{{schedule.doctor_name}}</p>
                    </div>
                </div>
                <div class="cardlist" >
                    <b-card-text class="d-flex justify-content-start" >Dokter Siang (13.00 - 16.00) </b-card-text>
                    <img src="../assets/Icon/drop downblack.svg" @click="togglescheduleSiang()" width="30px" class="ddown d-flex justify-content-end"/>
            </div>
            <div v-if="togglejadwalSiang">
                     <div class="cardlist" v-for="schedule in searchList" :key="schedule" >
                        <p>{{schedule.doctor_name}}</p>
                    </div>
                </div>
                <div class="cardlist" >
                    <b-card-text class="d-flex justify-content-start" >Dokter Sore (16.00 - 18.00) </b-card-text>
                    <img src="../assets/Icon/drop downblack.svg" @click="togglescheduleSore()" width="30px" class="ddown d-flex justify-content-end"/>
            </div>
            <div v-if="togglejadwalSore">
                    <div class="cardlist" v-for="schedule in searchList" :key="schedule" >
                        <p>{{schedule.doctor_name}}</p>
                    </div>
                </div>
                </div>
                <div v-if="!value">
                <p>Sorry, no matches were found</p>
                <p>Try a new Search</p>
                </div>
            </b-card>

        </div>
        
    </div></template>

<script>
import axios from 'axios'
//import { response } from 'express'
export default {
    name: 'scheduleList',
    computed: {
searchList(){              
        const filter = this.value
              ? this.schedules.filter(item => item.tanggal.includes(this.value) && item.role.includes(this.doctor)  )
              : this.schedules
              console.log(this.value)
       return filter
      },
searchNurse(){              
        const filter = this.value
              ? this.schedules.filter(item => item.tanggal.includes(this.value) && item.role.includes(this.nurse) )
              : this.schedules
              console.log(this.value)
       return filter
      },
// searchTanggal(){              
//         const filter = this.value
//               ? this.schedules.filter(item => item.tanggal.includes(this.value) )
//               : this.schedules
//               console.log(this.value)
//        return filter
//       },
 
    },
    data() {
      return {
        value: '',
        nurse: 'nurse',
        jadwal: 'pagi',
        doctor: 'doctor',
        togglejadwalSus: false,
        togglejadwalPagi: false,
        togglejadwalSiang: false,
        togglejadwalSore: false, 
        schedules: [],
       
      }
    },
    methods: {
        togglescheduleSus(){
            if(!this.togglejadwalSus){
                this.togglejadwalSus = true
            }else{
                this.togglejadwalSus = false
            }
        },
        toggleschedulePagi(){
            if(!this.togglejadwalPagi){
                this.togglejadwalPagi = true
                this.jadwal = 'pagi'
                console.log(this.jadwal)
            }else{
                this.togglejadwalPagi = false
                this.jadwal = ''
            }
        },
        togglescheduleSiang(){
            if(!this.togglejadwalSiang){
                this.togglejadwalSiang = true
                this.jadwal = 'siang'
            }else{
                this.togglejadwalSiang = false
                this.jadwal = ''
            }
        },
        togglescheduleSore(){
            if(!this.togglejadwalSore){
                this.togglejadwalSore = true
                this.jadwal = 'sore'
            }else{
                this.togglejadwalSore = false
                this.jadwal = ''
            }
        }


    },
    async mounted(){
    try {
    const response = await axios.get('https://flexible-marmoset-78.hasura.app/api/rest/schedule/get');
    this.schedules = response.data.schedule;
    console.log(response.data.schedule)
  } catch(e) {
    console.log(e);
  }
    }
}
</script>

<style scoped>

.lightdark-a {
  background-color: #DDDDDD;
;

;
}
.lightdark-b {
background-color: #F3F3F3;

;
}

.hdrop {
  height: 38px;
  margin-top: 5px;
  margin-bottom: 5px;
 border-radius: 5px; 
 border: 1px solid #1b1515;
 background: #F3F3F3;
}

.textmargin {
    margin-top: 20px;
}
.ddown {
    justify-items: end;
    justify-content: end;
    display: flex;
}
.cardlist{
    padding: 15px;
    margin: 5px;
    background-color:white;
;
    display: flex;
    justify-content: space-between;
}
</style>