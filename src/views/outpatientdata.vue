<template>
    <div class="container">
        <div class="d-flex mt-2">
          <img src="../assets/Icon/outpatient report.svg" width="40px"/>
            <h3 class="titlehero">OUTPATIENT REPORT</h3>
        </div>
        <div class="d-flex justify-content-end  my-3" v-if="sortBy === ''">          
            <b-button class="lightdark-a text-black"   @click="sortnew()">SORT BY OLDEST TO NEWEST <img src="../assets/Icon/sort oldest to newest.svg" width="28px"/></b-button>
        </div>

        <div class="d-flex justify-content-end  my-3" v-if="sortBy === 'date_check'">          
            <b-button class="lightdark-a text-black"   @click="sortnew()">SORT BY NEWEST TO OLDEST <img src="../assets/Icon/sort newest to oldest.svg" width="28px"/></b-button>
        </div>
        <div class="d-block">

    <b-table
      id="my-table"
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :per-page="perPage"
      :current-page="currentPage"
      sort-desc

      class="text-center lightdark-b"
    >

        <template #cell(show_detail)="row">
        <div v-if="row.detailsShowing" class="d-flex justify-content-center">
        <b-button size="sm"  @click="row.toggleDetails" class="mr-2  lightdark">
        View Report <b-icon icon="caret-up-fill"></b-icon>
        </b-button>
        </div>
        <div v-if="!row.detailsShowing" class="d-flex justify-content-center">
        <b-button size="sm" variant="success" @click="row.toggleDetails" class="mr-2">
        View Report <b-icon icon="caret-down-fill"></b-icon>
        </b-button>
        </div>
        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        
      </template>

      <template #row-details="row">
      <b-card class="textdetail lightdark-a">      
                    <b-row class="mb-2">
            <b-col cols="2" class="text-sm-right"><b>Keluhan</b></b-col>
            <b-col cols="1" class="d-flex justify-content-end">:</b-col>
            <b-col cols="9"><b-card class="">{{ row.item.medic_records[0].complaint }}</b-card></b-col>
          </b-row>

                    <b-row class="mb-2">
            <b-col cols="2" class="text-sm-right"><b>Hasil Diagnosa</b></b-col>
            <b-col cols="1" class="d-flex justify-content-end">:</b-col>
            <b-col cols="9"><b-card class="">{{ row.item.medic_records[0].diagnose }}</b-card></b-col>
          </b-row>

                    <b-row class="mb-2">
            <b-col cols="2" class="text-sm-right"><b>Resep Obat</b></b-col>
            <b-col cols="1" class="d-flex justify-content-end">:</b-col>
            <b-col cols="9"><b-card class="">{{ row.item.medic_records[0].drug }}</b-card></b-col>
          </b-row>
      </b-card>
      </template>

      
    </b-table>
<div class="d-flex my-2 ">
<p class="mx-4">Page {{currentPage}} of {{totalPage}}</p>    
<b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      aria-controls="my-table"
      label-next-page="nextPage"
      label-prev-page="prevPage"
    >
    </b-pagination>        
    </div>

</div>
      <!-- <b-button aria-label="nextPage" aria-controls="my-table">&lsaquo;</b-button>
      <b-button aria-label="prevPage" aria-controls="my-table">&rsaquo;</b-button> -->
      
    </div>
</template>

<script>

import axios from 'axios'
export default {
    name: "outpatientReport",
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
    //         listPatient() {
    //         const items = this.$store.state.outpatient.items
    //         return items;
            
    // },

},

    data() {
      return {
        fields: [
                { key: 'patient_code', label: 'Kode Pasien', thStyle: {background: '#DDDDDD', color: 'black'} },
                { key: 'full_name', label: 'Nama Pasien', thStyle: {background: '#DDDDDD', color: 'black'} },
                { key: 'medic_records[0].medic_facility.name', label: 'Jenis Poli', thStyle: {background: '#DDDDDD', color: 'black'} }, 
                { key: 'medic_records[0].medicalStaffByMedicalStaff.name', label: 'Nama Dokter', thStyle: {background: '#DDDDDD', color: 'black'} },
                { key: 'medic_records[0].datecheck', label: 'Tanggal Kontrol', thStyle: {background: '#DDDDDD', color: 'black'} },
                { key: 'show_detail', label: 'Action', thStyle: {background: '#DDDDDD', color: 'black'} },                
                ],
        items:[],
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
        sortnew() {
            if (this.sortBy == ''){
                this.sortBy = 'date_check'
              console.log(this.currentPage)
            }
            else {
                this.sortBy = ''
            }
        },
        // fetchOutpatient(){
        //   this.$store.dispatch('outpatient/fetchoutpatientReport')
        //   this.items = this.$store.state.outpatient.items
        //   console.log('test', this.items)
        // }
    
  },
  async mounted(){
   // this.fetchOutpatient()
  try {
    const response1 = await axios.get('outpatient/report');
   this.items = response1.data.patient;
//    const dataOne = response1.data.data
    console.log(response1.data.patient)
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


.unguprimary {
    background-color: #50266A;
}
.textdetail {
  text-align: start;
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

.cardpadding {
    padding: 8px;
}
.btnset {
  margin: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 24px;
  padding-right: 24px;
}

.hdrop {
  height: 38px;
  margin-top: 5px;
  margin-bottom: 5px;
 border-radius: 5px; 
 border: 1px solid #1b1515;
 background: #F3F3F3;
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
.titlehero {
  margin-top: 10px;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-left: 5px;
}

</style>

