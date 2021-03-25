<template>
    <div class="mb-64">
        <Nav></Nav> 
        <transition name="fade"> 
            <router-view></router-view>    
        </transition>   
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