<template>
    <div>
      <b-overlay
          id="overlay-background"
          :variant="variant"
          :opacity="opacity"
          :blur="blur"
          :show="show"
          :rounded="rounded"
          :isLoading="isLoading"
          no-wrap
        ></b-overlay>
        <!-- <b-modal ref="my-modal" v-model="showModal" hide-footer title="Hapus Data Pasien">
      <div class="d-block text-center">
        <h3>Apakah anda yakin?</h3>
      </div>
      <div class="d-block text-center">
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Tidak</b-button>
      <b-button class="mt-3" variant="outline-success" block @click="hapusData">ya</b-button>
      </div>
      </b-modal> -->
    <div class="container" v-if="!show">
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

    <div class="row">
      <div class="col-6">          
            <b-button class="lightdark-a btn text-white" @click="addpatient()">TAMBAH PASIEN</b-button>
        </div>
        <div class="col-6 ">
      <div class="d-flex input-group mb-3">
         <input type="search" class="form-control" placeholder="Search Name" v-model="keyword">
         <button class="input-group-text" @click="searchItem()"><img class="img11" src="../assets/search.png"></button>
      </div>
    </div>
    </div>
    <template v-if="search">
      <ApolloQuery
    :query="require('../graphql/patientbyname.gql')"
    :variables="{value : this.keyword}"
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
          <td><button @click="redirect(user.id)" class="btn w100 btn-primary">EDIT</button>
              <button @click="hapus(user.id)" class="btn w100 btn-danger">DELETE</button></td>
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

    <template v-if="!search">  
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
          <td><button @click="redirect(user.id)" class="btn w100 btn-primary">EDIT</button>
              <button @click="hapus(user.id)" class="btn w100 btn-danger">DELETE</button></td>
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
</div> 
</div>
</template>

<script>
import gql from 'graphql-tag'
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
        variant: 'transparent',
        opacity: 0.85,
        blur: '5px',
        isLoading: true,
        show: false,
        rounded: 'lg',
        showModal: false,
        hapusData: false,
        search: false,
      }
    },
    methods: {
      searchItem(){
        if(this.search == false){
        this.search = true
        }else{
          this.keyword = ''
          this.search = false
        }
      },
      redirect(id) {
              this.$router.push('editpatient/' + id);
              console.log(id)
              },
      addpatient() {
          this.$router.push('/addpatient');
        },
        hapus(id){
          // if(!this.showModal){
          //   this.showModal = true
          // }
          // else{
          // this.showModal = false
          // }
          // if(this.hapusData == true){
          let user_id = id;
              this.$apollo.mutate({
                mutation: gql`
                mutation hapus($user_id: Int!) {
                  delete_patient_by_pk(id: $user_id){                  
                    id
                    full_name
                    patient_code
                    }
                  }
                `,
                variables: {
                  user_id,
                },
                // refetchQueries: ["getUsers"],
              });
              const message = 'Data Telah Berhasil Dihapus'
              this.$localStorage.set('patient', message)
              this.$router.go()
          // }else{
          //   this.hapusData = false
          // }
            },
                },
      
    mounted() {
      // this.$router.go(0)
        const message = this.$localStorage.get('patient')
       if(message){
        // location.reload(),
          this.message = message
               this.showTop = true
               this.show = true;
              setTimeout(() => {
            this.showTop = false;
            // this.show = false;
            location.reload();
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
    
    /* height: 33px; */
    width: auto;
    margin-left: 5px;
    margin-right: 5px;
    background: #794B93;
}
.input-group{
margin-left: 180px;
    width: 300px;
}

.search{
    margin-left:41rem ;
}

.img11{
    height:15px;
    width:15px; 
}
.search{
    margin-left:41rem ;
}


</style>

