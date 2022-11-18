<template>

                <div class="ungusecondary sidebar m-0 pl1">
                    <a class="d-flex justify-content-between align-items-center border-bottom list-group-item ungusecondary text-white p-3 " @click="togglepatient = !togglepatient" @dblclick="togel()"><div><img src="../assets/Icon/patientsidebar.svg" width="50" class="svgmx"/>Patient</div><img src="../assets/Icon/drop down.svg" width="30" class="iconmx"/></a>        
<!-- toggle -->                   
                        <div class="sub-menu" v-if="togglepatient">
                            <a class="list-group-item ungusecondary border-bottom text-white p-3" href="/addpatient">Add Patient</a>
                            <a class="list-group-item ungusecondary border-bottom text-white p-3" href="/patientdata">Patient Data</a>
                        </div>
<!-- ENDtoggle -->
                    <a class="d-flex justify-content-between align-items-center border-bottom list-group-item ungusecondary text-white p-3" @click="toggleoutpatient = !toggleoutpatient" @dblclick="togel()"><div><img src="../assets/Icon/outpatientsidebar.svg" width="50" class="svgmx"/>Outpatient</div> <img src="../assets/Icon/drop down.svg" width="30" class="iconmx"/></a>        
<!-- toggle -->                   
                        <div class="sub-menu" v-if="toggleoutpatient">
                            <a class="list-group-item ungusecondary border-bottom text-white p-3" href="/addoutpatient">Add Outpatient</a>
                            <a class="list-group-item ungusecondary border-bottom text-white p-3" href="/outpatientreport">Outpatient Report</a>
                            <!-- <a class="list-group-item ungusecondary border-bottom text-white p-3" href="/outpatientlist">Outpatient List</a> -->
                        </div>
<!-- ENDtoggle -->
                    <a class="d-flex justify-content-between align-items-center border-bottom list-group-item ungusecondary text-white p-3" @click="toggleschedule = !toggleschedule" @dblclick="togel()"><div><img src="../assets/Icon/schedulesidebar.svg" width="50" class="svgmx"/>Schedule</div> <img src="../assets/Icon/drop down.svg" width="30" class="iconmx"/></a>        
<!-- toggle -->                   
                        <div class="sub-menu" v-if="toggleschedule">
                            <a class="list-group-item ungusecondary border-bottom text-white p-3" href="/adddoctorschedule">Add Schedule</a>
                            <a class="list-group-item ungusecondary border-bottom text-white p-3" href="/schedulelist">Schedule List</a>
                        </div>
<!-- ENDtoggle -->
                    <a class="d-flex justify-content-between align-items-center border-bottom list-group-item ungusecondary text-white p-3" @click="toggleusers = !toggleusers" @dblclick="togel()"><div><img src="../assets/Icon/usersidebar.svg" width="50" class="svgmx"/>User Menu</div> <img src="../assets/Icon/drop down.svg" width="30" class="iconmx"/></a>        
<!-- toggle -->                   
                        <div class="sub-menu" v-if="toggleusers">
                            <a class="list-group-item ungusecondary border-bottom text-white p-3" href="/manageuser">Manage User</a>

                        </div>
<!-- ENDtoggle -->

                </div>
</template>

<script>
export default {
    name: "navdrawVue",
    data() {
        return {
            togglepatient: false,
            toggleoutpatient: false,
            toggleschedule: false,
            toggleusers:false,
        }
    
    },
}
</script>

<style scoped>
.unguprimary {
    background-color: #50266A;
}
.ungusecondary {
    background-color: #794B93;
}
.sidebar {
   min-height: 100vh;
}
.pl1 {
    padding-left: 10px;
}
.ml1 {
    margin-left: 10px;
}
.w100 {
    width: 100%;
}
.w10px {
    width: 10px;
}
.svgmx {
margin-left: 2px;
margin-right: 10px;
color: white;
}
.iconmx {
    margin-left: 0px;
    
}
</style>