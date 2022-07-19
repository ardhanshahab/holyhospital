import axios from "axios";

const state = () => ({
  items: [],
});

const mutations = {
  setList(state, param) {
    state.items = param;
  },
};

const actions = {
// fetch
  fetchPatient(store) {
    axios.get('http://localhost:8080/api/patient', {
        // params:{
        //     apiKey: "pub_730855c7e0a49a0ba5011d5b35542f58a9a7",
        //     country: "id",
        //     language: "in",
        //     category: "health"
        // }
    })
      
      .then((response) => {
        store.commit("setList", response.data.data);
        console.log("reponse", response)
      })
      .catch((error) => {
        store.commit(error);
      });
  },
  fetchoutpatientReport(store) {
    axios.get('http://localhost:8080/api/outpatient/report', {
        // params:{
        //     apiKey: "pub_730855c7e0a49a0ba5011d5b35542f58a9a7",
        //     country: "id",
        //     language: "in",
        //     category: "health"
        // }
    })
      
      .then((response) => {
        store.commit("setList", response.data.data);
        console.log("reponse", response.data.data)
      })
      .catch((error) => {
        store.commit(error);
      });
  },
  fetchoutpatientList(store) {
    axios.get('http://localhost:8080/api/outpatient', {
        // params:{
        //     apiKey: "pub_730855c7e0a49a0ba5011d5b35542f58a9a7",
        //     country: "id",
        //     language: "in",
        //     category: "health"
    })
      
      .then((response) => {
        store.commit("setList", response.data.data);
        console.log("reponse", response.data.data)
      })
      .catch((error) => {
        store.commit(error);
      });
  },

// endfetch
 async patientPost(data){
    const token = localStorage.getItem('token')
    console.log(token)
      await axios.post('patient',data, {
        headers: { "Authorization" : 'Bearer' + token
        }
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

};

export default {
  state,
  mutations,
  actions,
}