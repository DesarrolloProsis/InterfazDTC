<template>
    <div>
        <Nav></Nav>
        <div v-if="$route.params.tipoUsuario == 4">
            <BotonesAdmin></BotonesAdmin>
        </div>
        <div v-else>
            <BotonesTecnico></BotonesTecnico>
        </div>        
    </div>
</template>

<script>
import Nav from "../../components/Navbar";
import BotonesAdmin from "../../components/Botones/BotonesAdm"
import BotonesTecnico from "../../components/Botones/BotonesTec"
export default {
    name: 'Preventivo',
    components:{
        Nav,
        BotonesAdmin,
        BotonesTecnico
    },
    data(){
        return{

        }
    },
    beforeMount(){
        console.log(this.$route.params.tipoUsuario)
    }
}
</script>