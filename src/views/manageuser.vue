<template>
   <div class="card-container">
    <div class="card-head">
      <b-alert
      v-model="showTop"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000;"
      variant="secondary"
    >
      {{message}}
    </b-alert>
        <img class="img1" src="../assets/list.svg">
       
            USER LIST
            
    </div>

    <!-- <div class="search">
    <div class="input-group mb-3">
  <input type="search" class="form-control" placeholder="Search Name or Email" v-model="keyword">
  <button class="input-group-text" @click="searchItem()"><img class="img11" src="../assets/search.png"></button>
    </div>
</div> -->

    <div class="card-body">
      <template>
  <ApolloQuery
    :query="require('../graphql/getuser.gql')"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occurred</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
                  <table class="table" id="my-table">
            <thead>
              <tr>
                <th scope="col">Nama User</th>
                <th scope="col">Email</th>
                <th scope="col">Jenis Kelamin</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in data.user" :key="user.id" id="my-table">
                <td scope="row">{{user.username}}</td>
                <td scope="row">{{user.email}}</td>
                <td scope="row">{{user.gender}}</td>
                <td scope="row">{{user.role.name}}</td>
                <td><button @click="redirect(user.id)">EDIT</button></td>
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

    </div>
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
//import axios from 'axios'

export default {
    name: "manageUser",
    data(){
      return{
        // fields: [
        //         { key: 'username', label: 'Nama User', thStyle: {background: '#DDDDDD', color: 'black'} },
        //         { key: 'email', label: 'Email', thStyle: {background: '#DDDDDD', color: 'black'} }, 
        //         { key: 'gender', label: 'Jenis Kelamin', thStyle: {background: '#DDDDDD', color: 'black'} },
        //         { key: 'role', label: 'Role', thStyle: {background: '#DDDDDD', color: 'black'} },
        //         { key: 'id', label: 'Action', thStyle: {background: '#DDDDDD', color: 'black'} },                
        //         ],
        items: [],
        perPage: 10,
        currentPage: 1,
        showTop: false,
        message: '',
        keyword: '',
        toggle: false,
      }
    },
    computed: {
    searchItem(){              

        const filter = this.keyword
              ? this.items.filter(item => item.full_name.includes(this.keyword) || item.email.includes(this.keyword))
              : this.listItem
              console.log(this.listItem) 
       return filter
      }, 
      // pageList(){
        

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
  //return slice
    },
    methods: {
      redirect(id) {
              this.$router.push('userdata/' + id);
              console.log(id)

              }
    },
  async mounted() {
  //           try {
  //   const response1 = await axios.get('user');
  //  this.items = response1.data.user;
  //   console.log(response1.data.user)
  // } catch(e) {
  //   console.log(e);
  // }
  const message = this.$localStorage.get('messageUser')
    if(message){
                this.message = message
               this.showTop = true
              setTimeout(() => {
                this.$localStorage.remove('messageUser')
            this.showTop = false;
                  }, 2000);
    }
  }
}
</script>

<style scoped>
p {
  justify-content: center;
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
    width: 900px;
    height:auto;
    margin: 2rem auto;
    background:#F3F3F3;;
    padding-bottom: 3px;
}
.btn{
    
    height: 33px;
    width: 55px;
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