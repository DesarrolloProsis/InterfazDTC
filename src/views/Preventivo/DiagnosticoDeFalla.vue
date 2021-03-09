<template>
    <div>
        <Nav></Nav>
        <div class="justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">
                <div class="mt-1 relative mb-16 sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols sm:mb-20">
                    <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold" v-if="this.type == 'DIAG' ">Diagnostico de Falla</h1>
                    <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold" v-else>Ficha Técnica de Atención</h1>        
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                       DECSRIPCION                             ////
                    ////////////////////////////////////////////////////////////////////-->      
                    <HeaderFalla :tipo="type" @actualizar-header="actualizar_header"></HeaderFalla>
                    <!--/////////////////////////////////////////////////////////////////////
                    /////                           BOTONES                             ////
                    ////////////////////////////////////////////////////////////////////--> 
                    <div class="mb-10 ml-12 sm:mb-6">
                        <div>
                            <button @click="enviar_header_diagnostico" class="botonIconCrear">
                                <img src="../../assets/img/add.png" class="mr-2" width="35" height="35" />
                                <span>Crear</span>
                            </button>
                        </div>
                    </div>    
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "../../components/Navbar";
import HeaderFalla from '../../components/FichaDiagnostico/HeaderFalla';

export default {
    name: "Diagnostico",
    components: {
        Nav,        
        HeaderFalla        
    },
    props:{
        tipo:{
            type: String,
            default: () => ''
        } 
    }, 
    ///////////////////////////////////////////////////////////////////////
    ////                      DATA                                    ////
    /////////////////////////////////////////////////////////////////////
    data (){
        return{    
            datosHeader: {},      
            type:"DIAG"
        }
    },

/////////////////////////////////////////////////////////////////////
////                           METODOS                           ////
/////////////////////////////////////////////////////////////////////
methods:{
    actualizar_header(header){
        this.datosHeader = header
    },
    enviar_header_diagnostico(){    
        let llavesHeader = Object.keys(this.datosHeader)
        if(llavesHeader.length == 10){            
            let valueHeader = Object.values(this.datosHeader)
            let validar = valueHeader.some(prop => prop == '')
            
            if(validar){

                alert('falta llenar campos')
            }
            else{
                console.log()
                alert('estoy completo')
            }            
        }
    },
},

}
</script>

<style>

</style>