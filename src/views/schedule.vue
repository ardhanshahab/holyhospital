//Profile.vue
<template>
  <div class="row">
    <div class="col-md-4">
 <label for="">Type</label>
  <select v-model="selectedType">
    <option value="" disabled selected hidden>Type</option>
    <option value="mercedes">Mercedes</option>
    <option value="bmw">BMW</option>
  </select>
  
  <label for="">From</label>
  <input type="date" v-model="startDate">
  
  <label for="">To</label>
  <input type="date" v-model="endDate">
  
  <div class="list-item" >
    <div class="card">
        <table>
  <tr>
    <th>Name</th>
    <th>Date</th>
  </tr>
  <tr v-for="item in filterItem" :key="item">
    <td>{{item.patient_name}}</td>
    <td>{{item.date_check}}</td>
  </tr>
  </table>
      <!-- <p>Name: {{ item.patient_name }}</p>
      <p>Car: {{ item.type }}</p>
      <p>Date: {{ formatDate(item.date_check) }}</p>
      <p>Country: {{ item.country }}</p> -->
    </div>
  </div>
</div>
    </div>
  
</template>
<script>
import axios from 'axios';
  export default {
        name: 'homePage',
        data() {
          return{
    selectedType: '',
    startDate:null,
    endDate:null,
    items: []
    }
  },
  computed: {
    filterItem() {
      let filterType = this.selectedType;
      let startDate = this.localizeDate(this.startDate);
      let endDate = this.localizeDate(this.endDate);
      console.log(startDate)
      console
      
      const itemsByType = filterType ? this.items.filter(item => item.type === filterType) : this.items
      return itemsByType
        .filter(item => {
          const itemDate = new Date(item.date_check)
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
    }
  },
   async mounted(){
         try {
    const response1 = await axios.get('http://localhost:8080/api/outpatient/report');
   this.items = response1.data.data;
//    const dataOne = response1.data.data
    console.log(response1.data)
    } catch(e) {
    console.log(e);
  }
  }
  }
</script>
