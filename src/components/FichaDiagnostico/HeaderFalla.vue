<template>
    <div>
        <!--/////////////////////////////////////////////////////////////////////
        /////                       DECSRIPCION                             ////
        ////////////////////////////////////////////////////////////////////-->      
        <div class="mt-2 sm:text-xs sm:ml-3 mb-16 mr-5 ml-5" v-if="tipo == 'DIAG'">
            <!--/////////////////////////////////////////////////////////////////////
            /////                           FILA TRES                           ////
            ////////////////////////////////////////////////////////////////////--> 
            <div class="mt-6 w-full grid grid-cols-2 ">
                <div class=" mr-10">
                    <span class="">DESCRIPCIÓN DE LA FALLA REPORTADA:</span>
                    <textarea
                        v-model="descripcion"
                        class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                        placeholder="jane@example.com"
                        name="Observaciones"
                        v-bind:maxlength="limite"
                    />
                    <span class="text-gray-500">{{ restante_desc }}/300</span>
                </div>
                <div class="mr-10">
                    <span class="">DIAGNOSTICO DE LA FALLA REPORTADA:</span>
                    <textarea
                        v-model="diagnostico"
                        class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                        placeholder="jane@example.com"
                        name="Observaciones"
                        v-bind:maxlength="limite"
                    />
                    <span class="text-gray-500">{{ restante_diag }}/300</span>
                </div>
                <div class="mt-5 mr-10">
                    <span class="">CAUSAS DE LA FALLA REPORTADA:</span>
                    <textarea
                        v-model="causaFalla"
                        class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                        placeholder="jane@example.com"
                        name="CausaDeLaFalla"
                        v-bind:maxlength="limite"
                    />
                    <span class="text-gray-500">{{ restante_causa }}/300</span>
                </div>
                <!-- /////////////////////////////////////////////////////////////////////
                ////                         IMAGENES                             ////
                ///////////////////////////////////////////////////////////////////// -->
            </div>
        </div>
        <!-- /////////////////////////////////////////////////////////////////////
        ////                            FICHA                             ///////
        //////////////////////////////////////////////////////////////////// -->
        <div v-if="tipo == 'FICHA'"> 
            <div class="grid grid-cols-2 ml-5">
                <div class="">
                    <span>TIPO DE FALLA:</span>
                </div>
                <div class="grid grid-cols-3 -ml-69">
                    <div class="text-center">
                        <p>POR OPERACIÓN</p>
                        <input type="checkbox">
                    </div>
                    <div class="text-center">
                        <p>POR SINIESTRO</p>
                        <input type="checkbox">
                    </div>
                    <div class="text-center">
                        <p>POR FIN DE VIDA ÚTIL</p>
                        <input type="checkbox">
                    </div>
                </div>
            </div>
            <div class="ml-5">   
                <div class="mt-6 w-full grid grid-cols-2 ">
                    <div class="mr-10">
                        <span class="">DESCRIPCIÓN DE LA FALLA REPORTADA:</span>
                        <textarea
                            v-model="descripcion"
                            class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                            placeholder="jane@example.com"
                            name="Observaciones"
                            v-bind:maxlength="limite"
                        />
                        <span class="text-gray-500">{{ restante_desc }}/300</span>
                    </div>
                    <div class="mr-10">
                        <span class="">SOLUCIÓN y/o INTERVENCION REALIZADA PARA LA FALLA REPORTADA:</span>
                        <textarea
                            v-model="solucion"
                            class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-gray-400 rounded-lg py-4 mb-0 h-40 placeholder-gray-500 border"
                            placeholder="jane@example.com"
                            name="Observaciones"
                            v-bind:maxlength="limite"
                        />
                        <span class="text-gray-500">{{ restante_sol }}/300</span>
                    </div>
                    <!-- /////////////////////////////////////////////////////////////////////
                    ////                         IMAGENES                             ////
                    ///////////////////////////////////////////////////////////////////// -->
                </div> 
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Diagnostico",
    props:{
        tipo:
        {
            type: String,
            default: () => ''
        } 
    },
    ///////////////////////////////////////////////////////////////////////
    ////                      DATA                                    ////
    /////////////////////////////////////////////////////////////////////
    data(){
        return{
            limite:300,
            causaFalla: "",
            descripcion: "",
            diagnostico: "",
            solucion:"",
        }
    },
/////////////////////////////////////////////////////////////////////
////                          COMPUTADAS                          ////
/////////////////////////////////////////////////////////////////////
computed:{
    restante_causa(){
        return this.causaFalla.length
    },
    restante_desc(){
        return this.descripcion.length
    },
    restante_diag(){
        return this.diagnostico.length
    },
    restante_sol(){
        return this.solucion.length
    },
},
methods:{
    validarCampos(){
        if(this.causaFalla != '' && this.descripcion !='' && this.diagnostico != '' && this.solucion != ''){
            this.$notify.success({
                title: "Ok!",
                msg: `SE GENERÓ CORRECTAMENTE.`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                    },
            });
            return true
        }
        else{
            this.$notify.warning({
                title: "Ups!",
                msg: `NO SE HA LLENADO LOS CAMPOS.`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                },
            });
            return false
        }
    }
},
}
</script>

<style>

</style>