<template>
    <div>
        <Nav></Nav>
        <div v-if="$route.params.tipoUsuario == 4">
            <BotonesAdmin></BotonesAdmin>            
        </div>
        <div v-else-if="$route.params.tipoUsuario == 7">            
            <BotonesCapufe></BotonesCapufe>
        </div>  
        <div>
            <BotonesTecnico></BotonesTecnico>
        </div>      
    </div>
</template>

<script>
import Nav from "../../components/Navbar";
import BotonesAdmin from "../../components/Botones/BotonesAdm"
import BotonesTecnico from "../../components/Botones/BotonesTec"
import BotonesCapufe from "../../components/Botones/BotonesCapufe"
export default {
    name: 'Preventivo',
    components:{
        Nav,
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