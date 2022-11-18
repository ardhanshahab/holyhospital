<template>
<div class="card-container">
    <div class="card-head">
<img class="img1" src="../assets/list.svg">
       
            USER DATA
    </div>

    <div class="card-body">

      <template>
  <ApolloQuery
    :query="require('../graphql/getuserbypk.gql')"
    :variables="{ index }"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occurred</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <form @submit.prevent="submitData">
  <div class="row mb-3">
    <label for="inputName3" class="col-sm-2 col-form-label">Nama User</label>
    <div class="col-sm-10">
      <input type="name" v-model="data.user_by_pk.username" class="form-control" id="inputName3">
      <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.full_name}}
                      </div>

    </div>
  </div>
  <div class="row mb-3">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="email" v-model="data.user_by_pk.email" class="form-control" id="inputEmail3">
      <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.email}}
                      </div>

    </div>
  </div>
 
  <div class="row mb-3">
    <label for="inputGender3" class="col-sm-2 col-form-label">Jenis Kelamin</label>
    <div class="col-sm-10">
      <input type="gender" v-model="data.user_by_pk.gender" class="form-control" id="inputGender3">
      <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.gender}}
                      </div>

    </div>
  </div>
  <div class="row mb-3">
    <label for="inputRole3" class="col-sm-2 col-form-label">Role</label>
    <div class="col-sm-10">
     <select class="form-select" v-model="data.user_by_pk.role.id" aria-label="Default select example">
  <option selected>Pilih Role</option>
  <option value="2">Dokter</option>
  <option value="3">Perawat</option>
  <option value="1">Admin</option>

</select>
<div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.role_id}}
                      </div>

      
    </div>
  </div>
  <div class="row">
    <label for="inputFacility3" class="col-sm-2 col-form-label">Fasilitas</label>
    <div class="col-sm-10">
      <select class="form-select" v-model="data.user_by_pk.facility_id">
  <option selected>Pilih Fasilitas</option>
  <option value="1">Umum</option>
  <option value="2">Anak</option>
  <option value="3">Gigi</option>
  </select>
  <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
            <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.facility_id}}
                      </div>

    </div>
  </div>
<br><br>
  <div class="d-flex gap-2 d-md-flex justify-content-md-end">
   <button class="btn btn-primary me-md-2" type="submit">UPDATE</button>
  
</div>
</form>
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">
        <div class="row mb-3">
          <label for="inputBlood3" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-10">
        <b-skeleton type="input"></b-skeleton>
        </div>
      </div>
      <div class="row mb-3">
          <label for="inputBlood3" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-10">
        <b-skeleton type="input"></b-skeleton>
        </div>
      </div>
      <div class="row mb-3">
          <label for="inputBlood3" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-10">
        <b-skeleton type="input"></b-skeleton>
        </div>
      </div>
      <div class="row mb-3">
          <label for="inputBlood3" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-10">
        <b-skeleton type="input"></b-skeleton>
        </div>
      </div>
      <div class="row mb-3">
          <label for="inputBlood3" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-10">
        <b-skeleton type="input"></b-skeleton>
        </div>
      </div>
      <div class="row mb-3">
          <label for="inputBlood3" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-10">
        <b-skeleton type="input"></b-skeleton>
        </div>
      </div>
      
      </div>
    </template>
  </ApolloQuery>
</template>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: "userData",
    data(){
      return{
        newsData: [],
        error: [],
        toggleLength: false
      }
    },
    computed: {
   index () { 
       return this.$route.params.id
   },
  },
  methods: {
     async submitData(){
      const data = {
        email: this.newsData.email,
        full_name: this.newsData.full_name,
        gender: this.newsData.gender,
        role_id: parseInt(this.newsData.role_id),
        facility_id: parseInt(this.newsData.facility_id),
      }
  
    await axios.put(`user/${this.index}/update`, data)
      .then(response => {
        console.log(response)
        const messageTrue = response.data.message
        this.$localStorage.set('messageUser', messageTrue)
        this.$router.push({name: 'manageUser'})
      })
      .catch(error => {
        console.log(error.response.data.error)
        const errorinput = error.response.data.error
        if(error){
              this.error = errorinput
              this.toggleLength = true
        }
        
      })
      }
    },
async mounted(){
         try {
    const response1 = await axios.get(`user/${this.index}`);
   this.newsData = response1.data.data;
    console.log(response1.data)
  } catch(e) {
    console.log(e);
  }
}
}
</script>

<style scoped>
.card-body{
    width: 900px;
    height:450px;
    margin: 2rem auto;
    background:#F3F3F3;;
    padding-bottom: 3px;
}

.card-head{
     margin-left: 60px;
    font-size: 20px;
    margin-top: 1.5rem;
}

.btn{
    padding-bottom:1px;
    width: 200px;
    background: #794B93;
}

.img1{
    height:50px;
    width:50px;

}
</style>