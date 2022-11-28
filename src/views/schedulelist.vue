<template>
    <div class="container my-2">
    <b-alert
      v-model="showTop"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000;"
      variant="secondary"
    >
      {{message}}
    </b-alert>
        <div class="d-flex">
            <img src="@/assets/Icon/schedule list.svg" width="70"/>
            <h3 class="textmargin">LIST JADWAL DOKTER & PERAWAT</h3>
        </div>
        <div class="d-block">
            <b-card bg-variant="light" class="card text-center mx-2 my-2 text-purple">
            <div class="d-flex">
            <p class="m-0 p-2">Tanggal</p>
            <b-form-datepicker id="example-datepicker" v-model="values" class="mb-2 hdrop"></b-form-datepicker>
            </div>

            <template v-if="values">
                <ApolloQuery
                    :query="require('../graphql/schedulelist.gql')"
                    :variables="{value : this.values}"
                >
                    <template v-slot="{ result: { loading, error, data } }">
                    <!-- Loading -->
                    <div v-if="loading" class="loading apollo">Loading...</div>

                    <!-- Error -->
                    <div v-else-if="error" class="error apollo">An error occurred</div>

                    <!-- Result -->
                    <div v-else-if="data" class="result apollo">
                        <div v-if="data.schedule.length < 1" class="no-result apollo"><b-icon icon="x-lg" variant="danger"></b-icon><p>data tidak ditemukan :(</p></div>
                        <ul class="list-group list-group-light" v-for="schedule in data.schedule" :key="schedule.id">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="text-align-left">
                            <div class="fw-bold">{{schedule.nurse_table.name.toUpperCase()}}</div>
                            <div class="text-muted">PERAWAT</div>
                            </div>
                            <span class="">{{schedule.date}}</span>
                        </li>
                        </ul>
                        <ul class="list-group list-group-light" v-for="schedule in data.schedule" :key="schedule.id">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="text-align-left">
                            <div class="fw-bold">{{schedule.doctor_table.name.toUpperCase()}}</div>
                            <div class="text-muted">DOKTER {{schedule.doctor_table.medic_facility.name.toUpperCase()}}</div>
                            </div>
                            <span class="">{{schedule.session.name.toUpperCase()}} : {{schedule.session.time}}</span>
                        </li>
                        </ul>
                    </div>
                    <!-- No result -->
                    <div v-else class="no-result apollo">
                        <b-card>
                        <b-skeleton animation="fade" width="25%"></b-skeleton>
                        <b-skeleton animation="fade" width="55%"></b-skeleton>
                        </b-card>
                        <b-card>
                        <b-skeleton animation="fade" width="25%"></b-skeleton>
                        <b-skeleton animation="fade" width="55%"></b-skeleton>
                        </b-card>
                        </div>
                    </template>
                </ApolloQuery>
                </template>
            </b-card>
        </div>
    </div>
</template>

<script>
//import gql from 'graphql-tag'
export default {
    name: 'scheduleList',
    computed: {
    },


    data() {
      return {
        values: '',
        showTop: false
       
      }
    },
    
    methods: {


    },
    mounted() {
        const message = this.$localStorage.get('schedule')
       if(message){
          this.message = message
               this.showTop = true
              setTimeout(() => {
            this.showTop = false;
            localStorage.removeItem('schedule');
                  }, 3000);
       }
    },
}
</script>

<style scoped>

.text-align-left{
    text-align: left;
}

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