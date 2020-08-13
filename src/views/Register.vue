<template>
    <div class="">
        <Nav></Nav>
        <TablaEquipoMalo   
            :listaComponentes="lista"      
            :dateSinester="dato">
        </TablaEquipoMalo>        
    </div>
</template>


<script>
import TablaEquipoMalo from "../components/DTC/TablaEquipoMalo";
import Nav from '../components/Navbar'
export default {

    components: {

        TablaEquipoMalo,
        Nav
    },
    data() {

        return {

            lista: [],
            datos: ''

        }
    }
    
}
</script>