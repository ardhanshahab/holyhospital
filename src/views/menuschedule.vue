<template>
    <div class="container my-2">
      <div class="row my-2 justify-align-center">
        <div class="col-md-6">
          <b-card title="Doctor" img-src="/assets/doctor.jpg" img-alt="Image" img-top>
            <b-card-text>
              Input Doctor Schedule
            </b-card-text>
            <template #footer>
              <b-button href="/adddoctorschedule" pill variant="primary">Click here</b-button>
            </template>
          </b-card>
        </div>
        <div class="col-md-6">
            <b-card title="Nurse" img-src="/assets/nurse.jpg" img-alt="Image" img-top>
              <b-card-text>
                Input Nurse Schedule
              </b-card-text>
              <template #footer>
                <b-button href="/addnurseschedule" pill variant="primary">Click here</b-button>
              </template>
            </b-card>
        </div>
      </div>
    </div>
</template>

<script>
//import gql from 'graphql-tag'
export default {
    name: 'menuSchedule',
    computed: {
    },


    data() {
      return {
        values: '',
       
      }
    },
    
    methods: {


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