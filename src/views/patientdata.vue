<template>
   <div class="container">
     <b-alert
      v-model="showTop"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000;"
      variant="secondary"
    >
      {{message}}
    </b-alert>
    <div class="card-head">
        <img class="img1" src="../assets/Icon/add patient data.svg">
            DATA PASIEN 
    </div>
    <div class="d-flex justify-content-end my-3">          
            <b-button class="lightdark-a text-black" @click="addpatient()">TAMBAH PASIEN <img src="../assets/Icon/sort oldest to newest.svg" width="28px"/></b-button>
        </div>

<template>
  <ApolloQuery
    :query="require('../graphql/patientdata.gql')"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occurred</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
            <table class="table">
      <thead>
        <tr class="lightdark-a">
          <th scope="col">Kode Pasien</th>
          <th scope="col">Nama Pasien</th>
          <th scope="col">NIK</th>
          <th scope="col">Golongan Darah</th>
          <th scope="col">Tanggal Lahir</th>
          <th scope="col">Jenis Kelamin</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in data.patient" :key="user.id" id="my-table" class="lightdark-b ">
          <td scope="row">{{user.patient_code}}</td>
          <td scope="row">{{user.full_name}}</td>
          <td scope="row">{{user.national_id}}</td>
          <td scope="row">{{user.bloodtype}}</td>
          <td scope="row">{{user.birthdate}}</td>
          <td scope="row">{{user.gender}}</td>
          <td><button @click="redirect(user.id)" class="btn w100 btn-primary">EDIT</button></td>
        </tr>
      </tbody>
    </table>
      </div>
      <!-- No result -->
      <div v-else class="no-result apollo">
        <b-skeleton-table
                :rows="5"
                :columns="10"
                :table-props="{ bordered: true, striped: true }"
              ></b-skeleton-table>
          </div>
    </template>
  </ApolloQuery>
</template>

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
</template>

<script>
//import axios from 'axios';
export default {
    name: "patientData",
    computed: {
      // searchItem(){              
      //   const filter = this.keyword
      //         ? this.items.filter(item => item.full_name.includes(this.keyword))
      //         : this.listItem
      //         console.log(this.listItem)
      //         return filter
      // },
        totalRows() {
        return this.items.length
        }, 
        totalPage() {
            const x = this.perPage
            const y = this.totalRows
            const z = y / x  
            return Math.floor(z) + 1       
            },
                listItem() {
                    return this.items.slice(
                    (this.currentPage - 1) * this.perPage,
                    this.currentPage * this.perPage,
                      )
                }
           },
    data(){
      return{
        items: [],
        message: '',
        showTop: false,
        perPage: 10,
        currentPage: 1,
        keyword: '',
        
      }
    },
    methods: {
      redirect(id) {
              this.$router.push('editpatient/' + id);
              console.log(id)
              },
      addpatient() {
          this.$router.push('/addpatient');
        },
    },
    mounted() {
      // this.$router.go(0)
        const message = this.$localStorage.get('patient')
       if(message){
        // location.reload(),
          this.message = message
               this.showTop = true
              setTimeout(() => {
            this.showTop = false;
            localStorage.removeItem('patient');
                  }, 3000);
                  
       }
    },
}
</script>

<style scoped>

.w100 {
  width: 100%;
}

.table {
  text-align: center;
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
.img1{
    height:50px;
    width:50px;

}
.card-head{
    font-size: 20px;
    margin-top: 1.5rem;
    margin-bottom: 60px;
}

.card-body{
    width: auto;
    height:auto;
    margin: 2rem auto;
    background:#F3F3F3;;
    padding-bottom: 3px;
}
.btn{
    
    height: 33px;
    width: auto;
    background: #794B93;
}
.input-group{
    width: 300px;
}

.search{
    margin-left:41rem ;
}

.img11{
    height:15px;
    width:15px; 
}

</style>

