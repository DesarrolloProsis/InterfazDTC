<template>
    <div>
        <!--///////////////////////////////////////////////////////////////////
          ////                    Modal Escaneado                          ////
          ////////////////////////////////////////////////////////////////////-->
        <PdfEscaneado @limpiar-componente-escaneado="limpiar_componete_escaneado" :abrirModal="modalSubirSellado" :objInsert="objInsertEscaneado" :tipoReporte="'Calendario'"></PdfEscaneado>
        <!--///////////////////////////////////////////////////////////////////
          ////                             HEADER                          ////
          ////////////////////////////////////////////////////////////////////-->
        <div class="">
            <div class="text-2xl text-center inline-flex sm:inline-block w-full mt-1 sm:w-67 border border-gray-700">
                <div class="w-auto mx-auto justify-center sm:ml-16 sm:-mb-6 border border-gray-700">
                    <div class="w-66 p-5">
                        <img src="../../assets/img/prosis-logo.jpg" class="h-12 w-48"/>
                    </div>
                </div>
                <div class="w-2/3 sm:w-auto sm:mt-3 sm:text-sm sm:-mb-6 md:-ml-18 flex justify-start sm:justify-center border border-gray-700">
                    <div class="border-gray-200 p-5 pt-0 ml-4 sm:ml-0">
                        <h1 class="mt-5 border-purple-800 w-72 sm:w-full font-titulo font-bold">{{ `Calendario de Actividades` }}</h1>            
                    </div>
                </div>
            </div>
            <div class="inline-flex md:flex-col sm:inline-block -mb-3 ml-1 w-full h-full sm:w-67 sm:-ml-1 md:grid-cols-2 md:ml-2">
                <!--///////////////////////////////////////////////////////////////////
                  ////                     COLUMNA IZQUIERDA                        ////
                  ////////////////////////////////////////////////////////////////////-->
                <div class="w-full sm:w-full inline-flex sm:flex-col text-base sm:text-xs md:text-sm md:flex-col ">
                    <div class="w-1/2 h-62 grid grid-cols-1 sm:w-67 sm:h-48 md:w-full md:h-48 md:grid-cols-2 p-1 sm:p-2 -mb-12 ">
                        <div class="flex mt-10 ml-5 -mb-10 sm:-mt-1 sm:p-1 sm:ml-2 sm:-mb-10 w-full sm:w-66 sm:h-6 md:w-auto md:ml-0 md:h-10 md:mt-1 border border-gray-700">
                            <p class="font-titulo sm:ml-1 font-semibold md:ml-1 md:mt-1 border border-gray-700">Correspondiente al mes de:</p>
                            <h2 class="ml-5 sm:ml-16 font-titulo md:ml-8 md:mt-1  md:mb-3 border border-gray-700">{{ `${mesNombre} del ${año}` }}</h2>
                        </div>                    
                        <div class="-mb-6 -mt-6 md:grid-cols-2 lg:flex sm:w-66 grid grid-cols-1 justify-start sm:ml-2 sm:p-1 sm:mb-1 sm:mt-8 md:ml-1 ml-5 md:-mt-1">
                            <span class="font-titulo mt-1 font-semibold mr-4 sm:-mb-4 sm:ml-1 md:mt-2 md:h-10 border border-gray-700">Plaza/Encargado: </span>
                            <p class="ml-18  -mt-20 sm:ml-1 sm:mt-4 md:mt-1 md:-ml-32 md:h-10 border border-gray-700"><SelectPlaza @actualizar-plaza="cambiar_plaza" :vista="'Calendario'" :fullPlazas="true" :tipo="'tipoPlazaSelect'"></SelectPlaza></p>
                        </div>
                        <div class="grid grid-cols-1 sm:w-66 sm:p-1 sm:mb-8 ml-5 -mt-16 sm:mt-4 sm:ml-2 md:ml-1 md:-mt-1 md:h-10 border border-gray-700">
                            <span class="font-titulo font-semibold mr-4 sm:-mb-4 sm:ml-1 md:mt-2">Acciones:</span>
                            <multiselect v-model="value" @close="acciones_mapper()" class="-mt-24 ml-33 sm:ml-1 sm:w-full sm:mt-4 md:-mt-8 md:mb-10 md:ml-32 w-36 border border-gray-700" placeholder="Seleccione una Accion" label="title" track-by="title" :options="opticones_select_acciones()" :option-height="200" :custom-label="customLabel" :show-labels="false">
                                <template slot="singleLabel" slot-scope="props">
                                    <div class=" inline-flex">
                                        <img :src="props.option.img" class="mr-5" width="15" height="15">                                                               
                                        <span class="option__title">{{ props.option.title }}</span>
                                    </div>
                                </template>
                                <template slot="option" slot-scope="props">                                                
                                    <div class="option__desc"><span class="option__title inline-flex">
                                        <img :src="props.option.img" class="mr-5" width="15" height="15">    
                                        {{ props.option.title }}</span>
                                    </div>
                                </template>
                            </multiselect>             
                        </div>
                        <div class="sm:hidden lg:hidden xl:hidden h-10 md:grid-cols-2 grid justify-start md:ml-1 md:-mt-1 border border-gray-700">
                            <span class="font-titulo mt-1 font-semibold mr-4 sm:-mb-4 sm:ml-1 md:mt-2">Código de Colores: </span>
                            <p class="ml-18 -mt-20 sm:ml-1 sm:mt-4 md:mt-1 md:-ml-32 border border-gray-700">
                                <select class="ml-20 w-48 is_valid">
                                    <option value="">Códgio de Colores</option>
                                    <option class="bg-green-500" value="1">Semanal</option>
                                    <option class="bg-red-500" value="2">Mensual</option>
                                    <option class="bg-blue-500" value="3">Trimestral</option>
                                    <option class="bg-pink-500" value="4">Semestral</option>
                                    <option class="bg-orange-500" value="4">Anual</option>
                                </select>
                            </p>
                        </div>
                    </div>
                    <div class="w-1/2 sm:mt-12 sm:ml-0 sm:w-67 sm:h-48 md:w-full border border-gray-700">
                    <ValidationObserver ref="observer" class="-ml-16">  
                        <div class="w-auto -mt-4 ml-20 sm:ml-5 sm:-mt-6 sm:w-66 p-8 sm:p-1 md:p-1 md:ml-1 md:w-32">
                            <ValidationProvider name="ComentarioCalendario" rules="required:max:500"  v-slot="{ errors }">
                                <span class="text-center font-titulo font-semibold text-gray-800 sm:ml-0 border border-gray-700">Observaciones</span>          
                                <textarea
                                    v-model="comentario"                                                               
                                    class="block container placeholder-gray-500 sm:mt-2 sm:mb-1 textAreaCalendario mt-6 md:w-76 md:ml-5 md:mt-4"
                                    placeholder="jane@example.com"
                                    name="ComentarioCalendario"
                                    :maxlength="limite"
                                />
                                <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                                <span class="text-xs text-gray-500 sm:ml-33 md:ml-66 ">{{ restante }}/500</span>    
                            </ValidationProvider>                    
                        </div>  
                    </ValidationObserver>            
                    </div>
                </div>
                <!--///////////////////////////////////////////////////////////////////////
                  ////                     CODIGO DE COLORES                          ////
                  ////////////////////////////////////////////////////////////////////-->
                <div class="w-1/2 ml-16 sm:ml-0 sm:w-67 uppercase text-xs p-10 sm:p-5 md:hidden">
                    <p class="font-titulo font-semibold sm:ml-2">Codigo de Colores:</p>
                    <div class="flex justify-between mt-2 ml-2">
                        <p class="font-titulo">Semanal</p>
                        <div class="bg-green-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center rounded-xl border-none -mt-1">
                            <p class="mt-1 font-titulo">Verde</p>
                        </div>
                    </div>
                    <div class="flex justify-between mt-2 ml-2">
                        <p class="font-titulo">Mensual</p>
                        <div class="bg-red-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center rounded-xl border-none -mt-1">
                            <p class="mt-1 font-titulo">Rojo</p>
                        </div>
                    </div>
                    <div class="flex justify-between mt-2 ml-2">
                        <p class="font-titulo">Trimestral</p>
                        <div class="bg-blue-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center rounded-xl border-none -mt-1">
                            <p class="mt-1 font-titulo">Azul</p>
                        </div>
                    </div>
                    <div class="flex justify-between mt-2 ml-2">
                        <p class="font-titulo">Semestral</p>
                        <div class="bg-pink-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center rounded-xl border-none -mt-1">
                            <p class="mt-1 font-titulo">Rosa</p>
                        </div>
                    </div>
                    <div class="flex justify-between mt-2 ml-2">
                        <p class="font-titulo">Anual</p>
                        <div class="bg-orange-500 text-gray-200 border-gray-800 border w-16 h-6 ml-3 text-center rounded-xl border-none -mt-1">
                            <p class="mt-1 font-titulo">NARANJA</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ServiceActividades from '../../services/ActividadesService'
import SelectPlaza from '../Header/SelectPlaza'
import Multiselect from "vue-multiselect";
import ReportesPDFService from '../../services/ReportesPDFService'
import PdfEscaneado from '../PdfEscaneado.vue'


export default {
    components:{
        SelectPlaza,
        Multiselect,
        PdfEscaneado
    },
    props:{
        comentario:{
            type: String,
            default: () => ''
        },
        mes: {
            type: Number,
            default: () => 0
        },
        año: {
            type: Number,
            default: () => 0
        },
        numeroActividades: {
            type: Number,
            default: () => 0
        },
        calendarioEscaneado: {
            type: Boolean,
            default: () => false
        }
    },
    data(){
        return {                        
            limite:500,                            
            value: '',                
            //Modal Escaneado   
            modalSubirSellado:false,
            objInsertEscaneado: {}

        }
    },    
    destroyed(){        
        if(this.comentario == '' && this.numeroActividades > 0){
            this.$router.push({ path: 'CalendarioActividades' })
            this.$notify.warning({
                title: "Ups!",
                msg: `NO PUEDES TENER CALENDARIO SIN COMENTARIO`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                },          
            });          
        }
        else if(this.numeroActividades == 0 && this.comentario != ''){
            this.$router.push({ path: 'CalendarioActividades' })
            this.$notify.warning({
                title: "Ups!",
                msg: `NO PUEDES TENER CALENDARIO SIN ACTIVIDADES`,
                position: "bottom right",
                styles: {
                    height: 100,
                    width: 500,
                },          
            });  
        }                                    
    },    
    methods: {
        acciones_mapper(){            
            if(this.value.title == 'Crear Calendario'){
                this.generar_pdf()
            }
            if(this.value.title == 'Sellado'){                
                let referenciaPlaza = this.$store.state.Login.plazaSelecionada.refereciaPlaza
                this.objInsertEscaneado = {
                    referenceNumber: referenciaPlaza,
                    mes: this.mes,
                    año: this.año,
                    idUser: this.idUser
                }                
                this.modalSubirSellado = true
            }
            if(this.value.title == 'Calendario Sellado'){
                this.obtener_escaneado_calendario()
            }
            this.value = ''
        },
        opticones_select_acciones(){
            let options = [
                { title: 'Crear Calendario', img: '/img/nuevoDtc.90090632.png' },                                                
                { title: 'Sellado', img: '/img/upload.8d26bb4f.png'},
                { title: 'Calendario Sellado', img: '/img/download.ea0ec6db.png' }
            ]
            if(!this.calendarioEscaneado){
                return options.splice(0,2)
            }
            else{
                return options
            }         
        },
        generar_pdf:  async function(){     
            let isValid = await this.$refs.observer.validate();    
            if(isValid){      
                this.$emit('generar-pdf', this.comentario)
            }
        },      
        limpiar_componete_escaneado(){            
            this.modalSubirSellado = false
            this.objInsertEscaneado = {}
            let numPlaza = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID'].numPlaza
            this.$emit("actualizar-actividad", numPlaza);  
        },
        customLabel ({ title }) { return `${title}` },        
        cambiar_plaza(numeroPlaza) { this.$emit("actualizar-actividad", numeroPlaza) },              
        obtener_escaneado_calendario(){ ReportesPDFService.generar_pdf_calendario_escaneado(this.año, this.mes) },
    },
    computed:{
        idUser(){
            return this.$store.state.Login.cookiesUser.userId
        },
        restante(){
            return  this.comentario.length
        },
        mesNombre(){
            return ServiceActividades.numero_to_nombre(this.mes)
        }
    },
    watch: {
        comentario(newValue){            
            this.$emit('actualizar-comentario', newValue)
        }
    }

}
</script>