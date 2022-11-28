<template>
   <div class="card-container">
    <div class="card-head">
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

    <div class="search">
      <div class="input-group mb-3">
         <input type="search" class="form-control" placeholder="Search Name" v-model="keyword">
         <button class="input-group-text" @click="searchItem()"><img class="img11" src="../assets/search.png"></button>
      </div>
    </div>
    <template v-if="search">
        <ApolloQuery
                    :query="require('../graphql/getuserbyname.gql')"
                    :variables="{value : this.keyword}"
                >
                <template v-slot="{ result: { loading, error, data } }">
                    <!-- Loading -->
                    <div v-if="loading" class="loading apollo">Loading...</div>

                    <!-- Error -->
                    <div v-else-if="error" class="error apollo">An error occurred {{error}}</div>

                    <!-- Result -->
                    <div v-else-if="data" class="result apollo">
                      <div class="card-body">
                        <div v-if="data.user.length < 1" class="no-result apollo"><b-icon icon="x-lg" variant="danger"></b-icon><p>data tidak ditemukan :(</p></div>
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
                                          <td scope="row"><b-button @click="redirect(user.id)" v-b-popover.hover.top="'Edit'" class="btn-success"><b-icon icon="pencil-square"></b-icon></b-button></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
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

    <div class="card-body" v-if="!search">
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
          <tr v-for="user in users" :key="user.id" id="my-table">
                        <td scope="row">{{user.username}}</td>
                        <td scope="row">{{user.email}}</td>
                        <td scope="row">{{user.gender}}</td>
                        <td scope="row">{{user.role.name}}</td>
                        <td><b-button @click="redirect(user.id)" v-b-popover.hover.top="'Edit'" class="btn-success"><b-icon icon="pencil-square"></b-icon></b-button></td>
          </tr>
        </tbody>
      </table>
    </div>

              <!-- No result -->
              <!-- <div v-else class="no-result apollo">
                <b-skeleton-table
                        :rows="7"
                        :columns="10"
                        :table-props="{ bordered: true, striped: true }"
                      ></b-skeleton-table>
                    </div> -->
    <div class="d-flex my-2 ">
    <p class="mx-4">Total Data User: {{totalRows}}</p>    
    </div>
</div> 
    
</template>

<script>
import gql from 'graphql-tag'

export default {
    name: "manageUser",
    data(){
      return{
        search: false,
        items: [],
        perPage: 5,
        currentPage: 1,
        showTop: false,
        message: '',
        keyword: '',
        toggle: false,
        variant: 'transparent',
        opacity: 0.85,
        blur: '5px',
        isLoading: true,
        show: false,
        rounded: 'lg'
      }
    },
    apollo: { 
      users: {
          query: gql`
          query getuser {
            user {
            id
            email
            password
            username
            gender
            role {
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
            console.log(data.user)
            return data.user;
          },
      },
 },
    computed: {
    totalRows() {
      const datauser = this.users.length
        return datauser
        }, 
        totalPage() {
            const x = this.perPage
            const y = this.totalRows
            const z = y / x  
            return Math.floor(z) + 1       
            },
              listItem() {
                return this.users.slice(
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
              },
      searchItem(){
        if(this.search == false){
        this.search = true
        }else{
          this.keyword = ''
          this.search = false
        }
      }
    },
  mounted() {
    console.log(this.totalRows)
  const message = this.$localStorage.get('userMessage')
    if(message){
                this.message = message
               this.showTop = true
               this.show = true;
              setTimeout(() => {
            this.showTop = false;
            // this.show = false;
            location.reload();
            this.$localStorage.remove('userMessage')
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