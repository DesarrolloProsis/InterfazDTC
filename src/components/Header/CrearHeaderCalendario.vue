<template>
    <div>
        <!--///////////////////////////////////////////////////////////////////
          ////                    Modal Escaneado                          ////
          ////////////////////////////////////////////////////////////////////-->
        <PdfEscaneado @limpiar-componente-escaneado="limpiar_componete_escaneado" :abrirModal="modalSubirSellado" :objInsert="objInsertEscaneado" :tipoReporte="'Calendario'"></PdfEscaneado>
        <div class="felx-auto ml-2 mr-2 mt-2 -mb-6">
            <div class="grid grid-cols-1 xl:grid-cols-2 sm:grid-cols-1 sm:px-2 sm:text-sm md:grid-cols-2 md:text-sm lg:grid-cols-2">
                <!--Logo-->
                <div class="flex mx-auto w-auto m-2 sm:grid-cols-1 ">    
                    <img src="../../assets/img/prosis-logo.jpg" class="h-12 w-auto m-2"/>
                </div>
                <!--Titulo-->
                <div class="flex font-titulo font-bold mx-auto">
                    <h1 class="mx-auto my-auto w-auto text-center text-4xl sm:text-lg md:text-xl">Calendario de Actividades</h1>
                </div>
                <!--Mes y Acciones-->
                <div class="grid grid-cols-1 mx-auto ">
                    <div class="flex m-3 sm: sm:mx-auto md:grid ">
                        <p class="font-titulo font-semibold md:mx-auto">Correspondiente al mes de:</p>
                        <h2 class="mx-auto font-titulo">{{ `${mesNombre} del ${año}` }}</h2>
                    </div>
                    <div class="flex m-3 h-12 sm:grid sm:grid-cols-1 sm:mx-auto sm:-mt-2 md:grid ">
                        <p class="font-titulo font-semibold sm:text-center md:mx-auto">Acciones:</p>
                        <multiselect v-model="value" @close="acciones_mapper()" class="w-68 sm:w-65 md:w-37 xl:-mt-2" placeholder="Seleccione una Accion" label="title" track-by="title" :options="opticones_select_acciones()" :option-height="100" :custom-label="customLabel" :show-labels="false">
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
                </div>
                <!--Plaza y Codigo de Colores-->
                <div class="grid grid-cols-1 mx-auto ">
                    <div class="flex m-3 sm:grid sm:grid-cols-1 sm:mx-auto md:grid xl:w-auto ">
                        <span class="font-titulo font-semibold mx-auto ">Plaza/Encargado: </span>
                        <p class="sm:-ml-3 xl:-mt-1">
                            <SelectPlaza @actualizar-plaza="cambiar_plaza" :vista="'Calendario'" :fullPlazas="true" :tipo="'tipoPlazaSelect'">
                            </SelectPlaza>
                        </p>
                    </div>
                    <div class="flex m-3 sm:grid sm:grid-cols-1 sm:mx-auto sm:-mt-2 md:grid xl:mx-auto ">
                        <span class="font-titulo font-semibold sm:mx-auto w-69 sm:w-32 md:w-32 md:mx-auto lg:ml-10 xl:w-auto">Código de Colores: </span>
                        <p class="md:mx-auto my-auto xl:-mt-1">
                            <select class="ml-20 w-48 is_valid sm:w-62 sm:mx-auto md:ml-0">
                                <option value="">Códgio de Colores</option>
                                <option class="bg-green-500 text-center text-gray-200" value="1">Semanal</option>
                                <option class="bg-red-500 text-center text-gray-200" value="2">Mensual</option>
                                <option class="bg-blue-500 text-center text-gray-200" value="3">Trimestral</option>
                                <option class="bg-pink-500 text-center text-gray-200" value="4">Semestral</option>
                                <option class="bg-orange-500 text-center text-gray-200" value="4">Anual</option>
                            </select>
                        </p>
                    </div>
                </div>
                <!-- Observaciones-->
                <div class="grid grid-cols-1 col-span-2 sm:col-auto sm:flex sm:flex-col md:flex md:flex-col lg:flex-col">
                    <ValidationObserver ref="observer" class="">  
                        <div class="w-auto xl:ml-56 xl:mr-61  mx-auto md:mx-auto lg:mx-auto">
                            <ValidationProvider name="ComentarioCalendario" rules="required:max:500" v-slot="{ errors }">
                                <span class="text-center font-titulo font-semibold text-gray-800 sm:flex sm:flex-col md:grid lg:grid">Observaciones</span>          
                                <textarea
                                    v-model="comentario"                                                               
                                    class="block container placeholder-gray-500 textAreaCalendario mt-3 ml-13 sm:mx-auto md:mx-auto lg:mx-auto"
                                    placeholder="jane@example.com"
                                    name="ComentarioCalendario"
                                    :maxlength="limite"
                                />
                                <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                                <span class="text-xs text-gray-500 ml-76 sm:ml-33 md:mx-67 lg:mx-72">{{ restante }}/500</span>    
                            </ValidationProvider>                    
                        </div>  
                    </ValidationObserver>
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