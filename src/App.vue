<template>
  <b-overlay
          id="overlay-background"
          :variant="variant"
          :opacity="opacity"
          :blur="blur"
          :show="show"
          :rounded="rounded"
          :isLoading="isLoading"
        >
<div class="noscroll">
    <component :is="layout">
      
      <router-view v-if="!isLoading"></router-view>
    </component>
</div>
</b-overlay>
</template>

<script>
//import Loadingscreen from './components/loadingscreen.vue';

const defaultLayout = 'default'
export default {
  name: 'App',
  computed: {
    layout(){
      return(this.$route.meta.layout || defaultLayout ) + '-layout'
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
