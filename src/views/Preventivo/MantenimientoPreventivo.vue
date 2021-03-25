<template>
    <div>     
        <transition name="slide-fade">
            <div v-if="$route.params.tipoUsuario == 4">
                <BotonesAdmin></BotonesAdmin>
            </div>        
            <div v-else-if="$route.params.tipoUsuario == 7">
                <BotonesCapufe></BotonesCapufe>
            </div>        
            <div v-else>
                <BotonesTecnico></BotonesTecnico>
            </div> 
        </transition>
    </div>
</template>
<script>
import BotonesAdmin from "../../components/Botones/BotonesAdm"
import BotonesTecnico from "../../components/Botones/BotonesTec"
import BotonesCapufe from "../../components/Botones/BotonesCapufe"
export default {
    name: 'Prevntivo',
    components:{        
        BotonesAdmin,
        BotonesTecnico,
        BotonesCapufe 
    },
    data(){
        return{

        }
    },
    beforeMount(){        
    }
}
</script>
