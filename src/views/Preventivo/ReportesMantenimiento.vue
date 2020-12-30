<template>
    <div>
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