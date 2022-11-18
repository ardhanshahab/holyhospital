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

  <template>
  <ApolloQuery
    :query="require('../graphql/outpatientreport.gql')"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occurred</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <table class="table">
  <thead class="lightdark-a">
    <tr class="text-center">
     <th scope="col">Nomor Antrian</th>
    <th scope="col">Kode Pasien</th>
    <th scope="col">Nama Pasien</th>
    <th scope="col">Golongan Darah</th>
    <th scope="col">Jenis Kelamin</th>
    <th scope="col">Nama Dokter</th>
    <!-- <th scope="col">Tanggal Kontrol</th> -->
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in data.patient" :key="item.id" class="text-center">
      <td scope="row">{{item.id}}</td>
    <td scope="row">{{item.patient_code}}</td>
    <td scope="row">{{item.full_name}}</td>
    <td scope="row">{{item.bloodtype}}</td>
    <td scope="row">{{item.gender}}</td>
    <!-- <td scope="row">{{item.medical_staff.name}}</td> -->
    <!-- <td scope="row">{{item.medicSessionByMedicSession.datecheck}}</td> -->
    </tr>    
  </tbody>
</table>
      </div>
      <!-- No result -->
      <div v-else class="no-result apollo">
        <b-skeleton-table
                :rows="7"
                :columns="10"
                :table-props="{ bordered: true, striped: true }"
              ></b-skeleton-table>
          </div>
    </template>
  </ApolloQuery>
</template>

        
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
// import axios from 'axios'
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
// filterItem() {
//       let filterType = this.selectedType;
//       let startDate = this.startDate;
//       let endDate = this.endDate;      
//       const itemsByType = filterType ? this.items.filter(item => item.type === filterType) : this.items
//       return itemsByType
//         .filter(item => {
//           const itemDate = new Date(item.datecheck)
//           if (startDate && endDate) {
//             return startDate <= itemDate && itemDate <= endDate;
//           }
//           if (startDate && !endDate) {
//             return startDate <= itemDate;
//           }
//           if (!startDate && endDate) {
//             return itemDate <= endDate;
//           }
//           return true;
//         })
//     },
//  listPatient() {
//             const items = this.$store.state.pokemon.items
//             return items;
//             },
    },

    data() {
      return {
        selectedType: '',
        startDate:null,
        endDate:null,
        value: '',
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
