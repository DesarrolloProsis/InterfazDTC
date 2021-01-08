<template>
    <div class="mb-64">
        <Nav></Nav> 
        <router-view></router-view>       
    </div>    
</template>
<script>
import Nav from '../../components/Navbar'
export default {
    components:{
        Nav,        
    },
    data(){
        return{

        }
    }
}
</script>