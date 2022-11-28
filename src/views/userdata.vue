<template>
<div class="card-container">
  <div class="card-head">
    <img class="img1" src="../assets/list.svg">
            USER DATA
  </div>
    <div class="card-body">
      <form>
        <div class="row mb-3">
          <label for="inputName3" class="col-sm-2 col-form-label">Nama User</label>
            <div class="col-sm-10">
              <input type="name" v-model="user.username" class="form-control" id="inputName3">
                <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
                  <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.full_name}}
                </div>
            </div>
        </div>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input type="email" v-model="user.email" class="form-control" id="inputEmail3">
                <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
                  <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.email}}
                </div>
            </div>
        </div>
        <div class="row mb-3">
          <label for="inputGender3" class="col-sm-2 col-form-label">Jenis Kelamin</label>
            <div class="col-sm-10">
              <input type="gender" v-model="user.gender" class="form-control" id="inputGender3">
                <div v-if="toggleLength" class="d-flex my-1 toggle text-danger">
                  <b-icon icon="info-circle" class="mx-2"></b-icon>{{error.gender}}
                </div>
            </div>
        </div>
        <div class="row mb-3">
          <label for="inputRole3" class="col-sm-2 col-form-label">Role</label>
            <div class="col-sm-10">
              <select class="form-select" v-model="user.role.id" aria-label="Default select example">
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
              <select class="form-select" v-model="user.facility_id">
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
          <button class="btn btn-primary me-md-2" @click="submit">UPDATE</button>
        </div>
      </form>
    </div>

      <!-- No result -->
      <!-- <div v-else class="no-result apollo">
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
      </div> -->
      
  </div>
</template>

<script>
import gql from 'graphql-tag';
export default {
    name: "userData",
    data(){
      return{
        // newsData: [],
        error: [],
        toggleLength: false
      }
    },
    computed: {
      index () {
        const id = this.$route.params.id  
       return id
      },
    },
    apollo: { 
      user: {
          query: gql`
          query MyQuery ($id: Int!){
            user_by_pk(id: $id) {
              id
              email
              password
              username
              gender
              role_id
              role {
                id
                name
              }
              facility_id
              medic_facility {
                id
                name
              }
            }
          }
          `,
          
          variables () {
              return {
                  id: this.index,
              }
            },
          update: (data) => {
            console.log(data.user_by_pk)
            return data.user_by_pk;
          },
      },
 },
  methods: {
      submit(e){
      e.preventDefault();
      // const data = {
      //   email: this.user.email,
      //   username: this.user.username,
      //   gender: this.user.gender,
      //   role_id: parseInt(this.user.role_id),
      //   facility_id: parseInt(this.user.facility_id), }
      // console.log(data)
      this.$apollo.mutate({
        mutation: gql`
        mutation MyMutation ($id: Int!, $email: String, $gender: String, $facility_id: Int, $username: String, $role_id: Int) {
          update_user_by_pk(pk_columns: {id: $id}, _set: {email: $email, gender: $gender, facility_id: $facility_id, username: $username, role_id: $role_id}) {
            id
            username
          }
        }
        `,
        variables: {
            id: this.index,
            email: this.user.email,
            username: this.user.username,
            gender: this.user.gender,
            role_id: this.user.role_id,
            facility_id: this.user.facility_id
        }
      });
              this.$router.push({name: 'manageUser'})
              const message = 'Data Telah Berhasil Diubah'
              this.$localStorage.set('userMessage', message)
              console.log(message)
      }
      },

  mounted(){
    console.log(this.user)
  //        try {
  //   const response1 = await axios.get(`user/${this.index}`);
  //  this.newsData = response1.data.data;
  //   console.log(response1.data)
  // } catch(e) {
  //   console.log(e);
  // }
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