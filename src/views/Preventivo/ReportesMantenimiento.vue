<template>
    <div class="mb-64">        
        <transition name="slide-fade"> 
            <router-view></router-view>    
        </transition>   
    </div>    
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
