<template>
<div class="noscroll">
    <component :is="layout">
      <router-view></router-view>
    </component>
</div>
</template>

<script>
//import defaultlayoutVue from './layout/defaultlayout.vue'
//import defaultLayout from './layout/defaultlayout.vue'
const defaultLayout = 'default'
export default {
  name: 'App',
  computed: {
    layout(){
      return(this.$route.meta.layout || defaultLayout ) + '-layout'
    }
  },
  components: {
  //  defaultLayout
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
