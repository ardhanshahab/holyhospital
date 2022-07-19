<template>
<div class="row">
<navbar-vue></navbar-vue>
<div class="col-3 sidebarungu">    
<navdraw-vue></navdraw-vue>
</div>
<div class="col-9 p-0">
    <slot></slot>
</div>
<div class="d-flex">
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