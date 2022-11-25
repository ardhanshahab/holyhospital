<template>
    <div class="bodyimage">
        <b-container>
        <div class="row align-items-center vh-100"> 
            <b-row >
            <b-col cols="1"></b-col>
            <b-col cols="10">
            <div class="">
<b-card img-src="https://i.ibb.co/LY0qTqj/banner.png" img-width="55%" img-alt="Card image" img-left class="text-center p-3">
            <b-card-title>Hospital Management System</b-card-title>
            <div class="my-3">
            <b-button block class="ungubutton width90" to="/login" >LOGIN</b-button>
            </div>
            <div class="my-3">
            <b-button block variant="white" class="ungu width90" to="/register">REGISTER</b-button>
            </div>
    </b-card>
    </div>
    </b-col>
    <b-col cols="1"></b-col>
    </b-row>
  </div>
  <div></div>
  </b-container>
    </div>

</template>

<script>
export default {
    name: "landingPage"
}

</script>

<style scoped>
.bodyimage {
    background-image: url("https://i.ibb.co/Vpcht5r/landingpage.png");
    background-size: 100%;
    background-position: center;
}
.ungubutton {
    background-color: #8E5FA8;
}
.ungu {
    color: #8E5FA8;
}
.centercard {
    align-content: center;
    justify-content: center;
    margin-top: 50px;
}
.width90 {
    width: 90%;
}
</style>

