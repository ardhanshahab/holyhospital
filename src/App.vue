<template>
<div class="noscroll">
    <component :is="layout">
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
        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
      <router-view v-if="!isLoading"></router-view>
    </component>
</div>

</template>

<script>
//import Loadingscreen from './components/loadingscreen.vue';

const defaultLayout = 'default'
export default {
  name: 'App',
  computed: {
    layout(){
      return(this.$route.meta.layout || defaultLayout ) + '-layout'
    },
    alert () {
            return this.$store.state.alert
        }
  },
  components: {
    //Loadingscreen
  },
  data() {
    return {
      variant: 'transparent',
        opacity: 0.85,
        blur: '5px',
      isLoading: true,
      show: true,
      rounded: 'lg'
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
      this.show = false;
    }, 3000);
  },
    watch:{
        $route (){
            // clear alert on location change
            this.$store.dispatch('alert/clear');
        }
    } 
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap");

div {
font-family: 'Nunito', sans-serif;
;
}

.noscroll {
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
}

</style>
