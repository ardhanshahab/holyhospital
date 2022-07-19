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
       
            PATIENT DATA 
            
    </div>

 <div class="search">
    <div class="input-group mb-3">
  <input type="search" class="form-control" placeholder="Search Name" id="filter-input" v-model="keyword">
  <button class="input-group-text" id="basic-addon2"><img class="img11" src="../assets/search.png"></button>
    </div>
</div>
    <table class="table">
  <thead>
    <tr class="lightdark-a">
      <th scope="col">Kode Pasien</th>
      <th scope="col">Nama Pasien</th>
      <th scope="col">NIK</th>
      <th scope="col">Jenis Kelamin</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody v-if="totalRows > 1">
    <tr v-for="(user) in searchItem" :key="user.id" id="my-table" class="lightdark-b ">
      <td scope="row">{{user.code}}</td>
      <td scope="row">{{user.full_name}}</td>
      <td scope="row">{{user.national_id}}</td>
      <td scope="row">{{user.gender}}</td>
      <td><button @click="redirect(user.id)" class="btn w100 btn-primary">EDIT</button></td>
    </tr>
  </tbody>
  <tbody v-if="totalRows == 0" class="d-block justify-content-center w100 my-2 lightdark-b">
      <p>Sorry, no matches were found</p>
      <p>Try a new Search</p>
  </tbody>
</table>
    <!-- <div class="bTable"> -->
    <!-- <b-table
      id="my-table"
      :items="items"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      sort-desc

      class="text-center w100 lightdark-b"
    >
    <template #cell(id)>
      <button @click="redirect(id)" class="btn btn-primary me-md-2" type="button">EDIT</button>
    </template>
    </b-table> -->
    <!-- </div> -->

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
import axios from 'axios';
export default {
    name: "patientData",
    computed: {
      searchItem(){              
        
        const filter = this.keyword
              ? this.items.filter(item => item.full_name.includes(this.keyword))
              : this.listItem
              console.log(this.listItem)
              return filter
      },
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

              }
    },
    async mounted(){
         try {
    const response1 = await axios.get('patient');
   this.items = response1.data.data;
    console.log(response1.data)
  } catch(e) {
    console.log(e);
  }
  const message = this.$localStorage.get('messagePatient')
    if(message){
                this.message = message
               this.showTop = true
              setTimeout(() => {
            this.showTop = false;
                  }, 2000);
    }
  }
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
     margin-left: 60px;
    font-size: 20px;
    margin-top: 1.5rem;
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

