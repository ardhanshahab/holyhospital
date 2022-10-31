<template>
    <div class="container">
        <div class="d-flex mt-2">
          <img src="../assets/Icon/outpatient list.svg" width="40px"/>
            <h3 class="titlehero">OUTPATIENT LIST</h3>
        </div>
        <div class="d-flex justify-content-end mb-4">
          <p class="mx-2 mt-2">Sort Tanggal Kontrol From :</p>
          <!-- <b-button @click="mindateA()">test</b-button> -->
          <div class="d-flex justify-content-end">
          <input type="date" v-model="startDate">
          </div>
          <h2 class="mx-3">-</h2>
          <div class="d-flex justify-content-end">
          <input type="date" v-model="endDate">
          </div>
        </div>
        <div class="d-block cardinput lightdark-b tablelong">
<!-- <div class="card-body"> -->
        <table class="table ">
  <thead class="lightdark-a">
    <tr class="text-center">
     <th scope="col">Nomor Antrian</th>
    <th scope="col">Kode Pasien</th>
    <th scope="col">Nama Pasien</th>
    <th scope="col">Golongan Darah</th>
    <th scope="col">Jenis Kelamin</th>
    <!-- <th scope="col">Nama Dokter</th> -->
    <th scope="col">Tanggal Kontrol</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in filterItem" :key="item" class="text-center">
      <td scope="row">{{item.medicSessionByMedicSession.queue}}</td>
    <td scope="row">{{item.patient_code}}</td>
    <td scope="row">{{item.full_name}}</td>
    <td scope="row">{{item.bloodtype}}</td>
    <td scope="row">{{item.gender}}</td>
    <!-- <td scope="row">{{item.doctor}}</td> -->
    <td scope="row">{{item.medicSessionByMedicSession.datecheck}}</td>
    </tr>    
  </tbody>
</table>
<!-- </div> -->
</div>

        <div class="d-flex my-2 ">
<p class="mx-4">Page {{currentPage}} of {{totalPage}}</p>    
 <b-pagination
          
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
          class="my-0"
        />
    </div>
   
    </div>
</template>

<script>
//import Vue from 'vue'
import axios from 'axios'
export default {
    name: "outpatientList",
        computed: {
        totalRows() {
        return this.items.length
        }, 
        totalPage() {
            const x = this.perPage
            const y = this.totalRows
            const z = y / x  
            return Math.floor(z) + 1       
            },
filterItem() {
      let filterType = this.selectedType;
      let startDate = this.localizeDate(this.startDate);
      let endDate = this.localizeDate(this.endDate);      
      const itemsByType = filterType ? this.items.filter(item => item.type === filterType) : this.items
      return itemsByType
        .filter(item => {
          const itemDate = new Date(item.medicSessionByMedicSession.datecheck)
          if (startDate && endDate) {
            return startDate <= itemDate && itemDate <= endDate;
          }
          if (startDate && !endDate) {
            return startDate <= itemDate;
          }
          if (!startDate && endDate) {
            return itemDate <= endDate;
          }
          return true;
        })
    },
//  listPatient() {
//             const items = this.$store.state.pokemon.items
//             return items;
//             },
    },

    data() {
      return {
        // paginatedItems: this.items,
        selectedType: '',
        startDate:null,
        endDate:null,
        value: '',
        // fields: [
        //         { key: 'id', label: 'Nomor Antrian', thStyle: {background: '#DDDDDD', color: 'black'} }, 
        //         { key: 'serial_number', label: 'Kode Pasien', thStyle: {background: '#DDDDDD', color: 'black'} },
        //         { key: 'patient_name', label: 'Nama Pasien', thStyle: {background: '#DDDDDD', color: 'black'} },
        //         { key: 'date_check', label: 'Tanggal Daftar', thStyle: {background: '#DDDDDD', color: 'black',} },
        //         { key: 'facility', label: 'Jenis Poli', thStyle: {background: '#DDDDDD', color: 'black'} }, 
        //         { key: 'doctor', label: 'Nama Dokter', thStyle: {background: '#DDDDDD', color: 'black'} },
        //         { key: 'date_check', label: 'Tanggal Kontrol', thStyle: {background: '#DDDDDD', color: 'black'} },
        //         // { key: 'show_detail', label: 'Action', thStyle: {background: '#DDDDDD', color: 'black'} },                
                
        //         ],
        items: [],
        tableVariants: [
          'primary',
          'secondary',
          'info',
          'danger',
          'warning',
          'success',
          'light',
          'dark'
        ],
        striped: false,
        hover: true,
        headVariant: 'light',
        tableVariant: 'secondary',
        sortBy: '',
        perPage: 10,
        currentPage: 1,


        
}
    },
 
    methods: {
      localizeDate(date) {
      // Date picker uses ISO format (yyyy-mm-dd), which is UTC. The data
      // contains locale specific date strings (mm/dd/yyyy), which `Date`
      // parses with local time-zone offset instead of UTC. Normalize the
      // ISO date so we're comparing local times.
      if (!date || !date.includes('-')) return date
      const [yyyy, mm, dd] = date.split('-')
      return new Date(`${mm}/${dd}/${yyyy}`)
    },
    formatDate(date) {
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(date))
    },
    // fetchOutpatient(){
    //       this.$store.dispatch('outpatient/fetchoutpatientList')
    //       const listItems = this.$store.state.outpatient.items
    //       this.items = listItems
    //     },
    },
 async mounted(){
    //this.fetchOutpatient()
    try {
    const response1 = await axios.get('outpatient/list');
   this.items = response1.data.patient;
//    const dataOne = response1.data.data
    console.log(response1.data)
//    console.log(response1.data.data.id)
    // const response2 = await axios.get(`http://localhost:8080/api/outpatient/:id/process`);
    // this.arrayTwo = response2.data.data;
    // console.log(this.arrayTwo)
  } catch(e) {
    console.log(e);
  }
  }
}
</script>

<style scoped>
.img1{
    height:50px;
    width:50px;

}

.card-head{
     margin-left: 60px;
    font-size: 20px;
    margin-top: 1.5rem;
}



.btn{
    
    height: 33px;
    width: 55px;
    background: #794B93;
}
.tablefix {
  width: 100%;
  height: auto;
  padding: 8px 20px;
}
td td {
  border: 1px solid black;
    padding: 8px 20px;
}

.titlehero {
  margin-top: 10px;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-left: 5px;
}
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

.tablelong {
  padding-bottom: 30px;
}

tr {
    
   text-align:left; 
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
