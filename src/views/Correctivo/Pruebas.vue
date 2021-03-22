<template>
    <div class="relative">
        <Nav></Nav>
                            <div>
                                <span class="">Fecha:</span>
                                <input class="ml-16 bg-white border-gray-400" 
                                type="date" 
                                v-model="fecha"
                                />
                            </div>
                            <div class="mt-5">
                                <span class="">Hora INICIO:</span>
                                <input class="ml-4 bg-white border-gray-400 mr-4 sm:ml-8" type="time" v-model="horaInicio"/>
                            </div>
                            <div class="mt-5">
                                <span class="">Hora FIN:</span>
                                <input class="ml-10 bg-white border-gray-400 sm:ml-12" type="time" v-model="horaFin"/>
                            </div>
                            <br>
                            <div>
                                <button @click="crearDiagnostico" class="botonIconCrear">
                                    <img src="../../assets/img/add.png" class="mr-2" width="35" height="35" />
                                    <span>Crear</span>
                                </button>
                            </div>
    </div>
</template>

<script>

import Nav from "../../components/Navbar";

export default {
    name: "HeaderGenerico",
    components: {
    
    Nav
    },
    data (){
        return{
            horaInicio:"",
            horaFin:"",
            fecha:""
        }
        
    },
    methods:{
    validar_horas(){
        if(this.horaInicio != '' && this.horaFin != ''){
            let horaISplite = this.horaInicio.split(':')            
            let horaFSplite = this.horaFin.split(':')            
            let dateInicio = new Date(1995,11,17,horaISplite[0],horaISplite[1],0);
            let dateFin = new Date(1995,11,17,horaFSplite[0],horaFSplite[1],0);             
            if(dateInicio < dateFin){                
                return true
            }
            else{            
                return false
            }
        }
        else {                 
            return false    
        }
    },
    crearDiagnostico (){
        if( this.fecha!='' && this.validar_horas() == true) {
            this.$notify.success({
                title: "Ok!",
                msg: `SE GENERÓ CORRECTAMENTE EL DIAGNOSTICO.`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                    },
            });
        }    
        else{
            this.$notify.warning({
                title: "Ups!",
                msg: `NO SE HA LLENADO LOS CAMPOS CORRECTAMENTE O ESTAN INCOMPLETOS.`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                },
            });
        }        

    },
    },
}
</script>
