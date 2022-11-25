<template>
<div class="row">
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
    <navbar-vue></navbar-vue>
        <div class="col-3 sidebarungu">    
            <navdraw-vue></navdraw-vue>
        </div>
        <div class="col-9 p-0">
            <slot></slot>
        </div>
</div>
</template>

<script>
import navbarVue from '../components/navbar.vue'
import navdrawVue from '../components/navdraw.vue'
export default {
    name: "defaultLayout",
    components: {
        navbarVue,
        navdrawVue,
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

<style scoped>
.sidebarungu {
    padding-left: 0px;
    padding-right: 0px;
    margin: 0px;
    background-color: #794B93;
    min-height: 100vh;

}
</style>