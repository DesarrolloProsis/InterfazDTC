<template>
    <div class="sm:w-56 ">    
        <ValidationObserver ref="observer">             
            <!--/////////////////////////////////////////////////////////////////////
            /////                   DATOS DEL REPORTE                           ////
            ////////////////////////////////////////////////////////////////////--> 
            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mt-2 sm:text-xs sm:ml-0 mb-10 sm:mb-2">
            <!--/////////////////////////////////////////////////////////////////////
            /////                           FILA UNO                            ////
            ////////////////////////////////////////////////////////////////////--> 
            <div class=" mt-6 ml-10 w-full sm:grid grid-cols-1 sm:ml-0 sm:mr-1 sm:w-66 md:w-auto md:mx-auto font-titulo ">
            <!-- Referencia -->
                <div class="grid grid-cols-2 sm:grid md:grid ">
                    <span class="sm:ml-2">  
                    No. De Reporte:
                    </span>
                    <p class="-ml-34 sm:-ml-1 sm:w-32 md:ml-48 lg:ml-1" >{{ datosDiagnostico.referenceNumber }} 
                    </p>
                </div>
                <!-- Plaza -->
                <div class="mt-5 grid grid-cols-2 sm:grid ">
                    <div>
                        <span class="sm:ml-2">Plaza de Cobro/Encargado de plaza:</span>
                    </div>
                    <!-- Diagnostico de Falla Crear -->
                    <div class="-ml-64 -mt-1 sm:-ml-10 md:ml-22 lg:-ml-31" :class="{'hidden': blockInput == true || $route.params.tipoVista != 'Crear'}">
                        <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true" :tipo="'tipoPlazaSelect'" ></SelectPlaza>
                        <div class="mx-56 -mt-6 sm:hidden md:hidden w-6" :class="{'hidden':tipo == 'FICHA'}">
                            <span class="" v-tooltip.right =" { ref:'toolencargadoplaza', class: 'tooltip-custom tooltip-other-custom'}">
                            <img src="@/assets/img/pregunta.png" class="flex items-center  w-5 h-5 "/>
                        </span>

                        <div ref="toolencargadoplaza" class="font-titulo">
                        <p class="text-center text-gray-800">Aquí puedes seleccionar la plaza y el encargado al que se le entregará el diagnóstico</p>
                        </div>
                        </div>  
                    </div>
                    <div class="-ml-64 -mt-1 sm:-ml-1" :class="{'hidden': blockInput == true || $route.params.tipoVista == 'Crear' }">
                        <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true" :tipo="'editDTC'"></SelectPlaza>
                    </div>
                    <div class="-ml-64 -mt-1 sm:-ml-10 " :class="{'hidden': blockInput == false}">
                        <p class="sm:-ml-1"><SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true" :tipo="'editDTC'"></SelectPlaza></p>
                        <div class="ml-20 sm:-ml-10 sm:w-auto ">
                            <span v-if="blockInput" class="block -ml-44 text-red-400 text-xs font-titulo font-normal sm:-ml-20">No se puede modificar, viene del Diagnóstico de Falla</span>
                        </div>
                        
                    </div>
                </div>
                <!-- Carril -->
                <div class="mt-1 grid sm:grid sm:grid-cols-2 ">
                    <span class="mr-20 sm:mr-0 sm:ml-9 sm:mt-3 md:mt-3 lg:mt-4 xl:mt-6">Ubicación:</span>                   
                    <div class="-ml-34 w-64 sm:-ml-9 sm:w-48 md:ml-68 md:-mt-8 lg:ml-48 lg:-mt-8 xl:ml-48 xl:-mt-6" :class="{'cursor-not-allowed':blockInput==true}">
                        <ValidationProvider immediate name="Carriles" rules="required"  v-slot="{ errors }">                            
                            <multiselect
                                :disabled="blockInput"
                                v-model="datosDiagnostico.ubicacion"  
                                :custom-label="label_multi_select"                                                  
                                :close-on-select="false"
                                :clear-on-select="true"
                                :hideSelected="false"
                                track-by="lane"                        
                                placeholder="Selecciona..."
                                :options="carriles_plaza"
                                :multiple="true"   
                                name="Carriles"    
                                select-label=""
                                class=""                 
                            >
                                <template slot="selection" slot-scope="{ values, isOpen }">
                                    <span class="" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Carriles</span>
                                </template>
                            </multiselect>
                            <span class="text-red-600 text-xs block md:ml-10">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                </div>
            </div>
            <!--/////////////////////////////////////////////////////////////////////
            /////                           FILA DOS                            ////
            ////////////////////////////////////////////////////////////////////--> 
            <div class=" mt-6 ml-32 sm:ml-1 font-titulo w-full sm:w-66 sm:mr-1 sm:flex sm:flex-col md:w-auto md:mx-auto lg:w-auto lg:ml-0 xl:w-auto ">
                <!-- Fecha -->
                <div class=" ">
                    <ValidationProvider immediate name="Fecha Diagnostico" rules="required|fechaMenorNow" :custom-messages="{ fechaMenorNow: 'La fecha debe ser menor que la fecha actual' }" v-slot="{ errors }">                   
                        <span class="sm:ml-2" :class="{'ml-24 sm:ml-2':tipo == 'FICHA'}">Fecha:</span>                        
                        <input v-model="datosDiagnostico.fechaDiagnostico" @change="crear_referencia" class="ml-32  fechaDiag sm:ml-32 md:ml-48"  type="date" name="FechaDiagnostico"/>
                        <span class="text-red-600 text-xs block sm:ml-8 md:ml-16">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <!-- Fecha/Hora Inicio -->
                <div class="mt-5 mb-10">
                    <ValidationProvider immediate name="Fecha/Hora Inicio" :rules="{required: true, maxTime: datosDiagnostico.horaFin}" :custom-messages="{ maxTime: 'La Fecha/Hora Inicio debe ser menor que la Fecha/Hora Fin' }"  v-slot="{ errors }">
                        <span class="sm:ml-2" :class="{'ml-24 sm:ml-2':tipo == 'FICHA'}">Fecha/Hora INICIO:
                        </span>
                        <datetime class="ml-33 -mt-6 md:ml-49" :class="{'ml-63 sm:ml-34':tipo == 'FICHA'}" v-model="datosDiagnostico.horaInicio"  use12-hour :max-datetime="datosDiagnostico.horaFin" type="datetime" name="HoraInicio"></datetime>
                        <!-- <input v-model="datosDiagnostico.horaInicio" class="ml-4 fechaDiag mr-4 sm:ml-3" :class="{'fechaFicha':blockInput == true}" :disabled="blockInput"  type="time" name="HoraInicio"/> -->
                        <span class="text-red-600 text-xs block sm:ml-8 md:ml-16">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <div class="mx-67 -mt-10 sm:hidden md:hidden w-6" :class="{'hidden':tipo == 'FICHA'}">
                            <span class="" v-tooltip.right =" { ref:'tooltipRef', class: 'tooltip-custom tooltip-other-custom'}">
                            <img src="@/assets/img/pregunta.png" class="flex items-center  w-5 h-5 -mr-32" />
                        </span>

                        <div ref="tooltipRef" class="font-titulo">
                        <p class="text-center text-gray-800">Se debe indicar la fecha y hora que se recibe el reporte de Falla.</p>
                        </div>
                    </div>
                </div>
                <!-- Fecha/Hora Fin -->
                <div class="mt-5 ">
                    <ValidationProvider immediate name="Fecha/Hora Fin" :rules="{required: true}" v-slot="{ errors }">
                        <span class="sm:ml-2" :class="{'ml-24 sm:ml-2':tipo == 'FICHA'}">Fecha/Hora FIN:</span>
                        <datetime class="ml-33 -mt-6 md:ml-49" :class="{'ml-63 sm:ml-34':tipo == 'FICHA'}" v-model="datosDiagnostico.horaFin" use12-hour type="datetime" name="HoraFin"></datetime>
                        <!-- <input v-model="datosDiagnostico.horaFin" class="ml-10 fechaDiag sm:ml-8" :class="{'fechaFicha':blockInput == true}" :disabled="blockInput" name="HoraFin" type="time" /> -->
                        <span class="text-red-600 text-xs block sm:ml-8 md:ml-16">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <div class="mx-67 -mt-10 sm:hidden md:hidden w-6" :class="{'hidden':tipo == 'FICHA'}">
                            <span class="" v-tooltip.right =" { ref:'tooltipfechafin', class: 'tooltip-custom tooltip-other-custom'}">
                            <img src="@/assets/img/pregunta.png" class="flex items-center  w-5 h-5 -mr-32" />
                        </span>

                        <div ref="tooltipfechafin" class="font-titulo">
                        <p class="text-center text-gray-800">Se debe indicar la fecha y hora en la que se determina el Diagnostico de la Falla.</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>    
            <!--/////////////////////////////////////////////////////////////////////
            /////                             FOLIOS                            ////
            ////////////////////////////////////////////////////////////////////--> 
            <div v-if="blockInput" class="ml-69 -mb-6 sm:ml-1 sm:w-auto text-xs sm:-mb-1 "><span class="text-red-400 sm:text-xs">No se puede modificar, vienen del Diagnóstico de Falla</span></div>
            <div class="ml-48 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:mx-auto lg:grid-cols-2 xl:grid-cols-2 mt-2 sm:text-xs sm:w-66 sm:ml-1 mb-10 sm:mt-0 md:mx-auto font-titulo ">
                <!-- Folios Span -->
                <div class="mt-6 -ml-32 w-full sm:-ml-6 sm:grid sm:grid-cols-1 md:my-auto md:mx-0 md:w-51 md:ml-10 ">
                    <div class="text-center w-32 ml-64 mr-40 sm:ml-3 sm:-mt-1 md:mx-30 lg:mb-12 xl:mb-12">
                        <span class="">Folio de FALLA:</span>                   
                    </div>
                    <div class="mt-5 text-center w-32 ml-64 sm:ml-3 sm:mt-6 md:mx-30 md:mt-6 lgm:mt-2">
                        <span class="">No. De Siniestro:</span>
                    </div>
                    <div class="mt-5 text-center w-56 ml-40 sm:ml-1 sm:mt-1 sm:w-auto md:mt-6 md:-mx-4 ">
                        <span class="sm:hidden">Técnico Responsable PROSIS:</span>
                        <span class="sm:show sm:-ml-1 md:hidden lg:hidden xl:hidden">Tec.Res. PROSIS:</span>
                    </div>
                </div>
                <!-- Input Folios -->
                <div class="mt-5 mr-16 ml-56 grid grid-cols-1 sm:mr-2 sm:-ml-12 sm:w-auto md:-mt-1 md:-ml-21 " :class="{'w-10':tipo == 'FICHA'}">
                    <div class="-ml-69 sm:ml-1 md:mx-auto">
                        <ValidationProvider immediate name="Folio de Falla" rules="required|max:20" v-slot="{ errors }" :class="{'-ml-1':tipo == 'FICHA'}">                   
                            <input v-model="datosDiagnostico.folioFalla" :class="{'inputFicha':blockInput == true}" class="inputDiag sm:w-48 md:w-58 text-center" :disabled="blockInput" name="FolioFalla" :maxlength="20" />
                            <span class="text-red-600 text-xs block sm:-ml-3 md:text-xs">{{ errors[0] }}</span><span class="text-gray-500 text-xs ml-56 sm:hidden md:ml-33 " :class="{'mx-auto':tipo == 'FICHA'}">{{ restante_folio }}/20</span>
                        </ValidationProvider>
                        <div class="mx-72 -mt-16 sm:hidden md:hidden w-6" :class="{'hidden':tipo == 'FICHA'}">
                            <span class="" v-tooltip.right =" { ref:'tooltipfoliofalla', class: 'tooltip-custom tooltip-other-custom'}">
                            <img src="@/assets/img/pregunta.png" class="flex items-center  w-5 h-5 "/>
                        </span>

                        <div ref="tooltipfoliofalla" class="font-titulo">
                        <p class="text-center text-gray-800">Se debe indicar el Número de Folio de Falla como aparece en el Módulo Institucional de CAPUFE.</p>
                        </div>
                        </div>
                    </div>
                    
                    <br>
                    <div class="-mt-1 -ml-69 sm:ml-1 sm:mt-1 md:mx-auto">
                        <ValidationProvider immediate name="Numero de Reporte" rules="max:30" v-slot="{ errors }" :class="{'-ml-1':tipo == 'FICHA'}">    
                            <input v-model="datosDiagnostico.numeroReporte" :class="{'inputFicha':blockInput == true}" class="inputDiag sm:w-48 md:w-58 text-center" :disabled="blockInput" name="NumeroReporte" :maxlength="30"/>
                            <span class="text-red-600 text-xs block ">{{ errors[0] }}</span><span class="text-gray-500 text-xs ml-56 sm:hidden md:ml-33 md" :class="{'ml-33':tipo == 'FICHA'}">{{ restante_siniestro }}/30</span>
                        </ValidationProvider>    

                        <div class="mx-72 -mt-16 sm:hidden md:hidden w-6" :class="{'hidden':tipo == 'FICHA'}">
                            <span class="" v-tooltip.right =" { ref:'tooltipsiniestro', class: 'tooltip-custom tooltip-other-custom'}">
                            <img src="@/assets/img/pregunta.png" class="flex items-center  w-5 h-5 "/>
                        </span>

                        <div ref="tooltipsiniestro" class="font-titulo">
                        <p class="text-center text-gray-800">Se debe indicar el Número de Reporte o Número de Siniestro que proporciona la Plaza de Cobro.
                            NOTA: Este Número se indica si dicha falla corresponde a un Siniestro.</p>
                        </div>
                        </div>                
                    </div>
                    
                    

                    <div class="mt-6 -ml-69  sm:mx-auto sm:mt-1 md:ml-1">
                        <p class="border-gray-400 w-69 text-center sm:w-35 sm:-mx-21 md:-ml-13">{{ nombre_usuario }}</p>
                    </div>
                </div>
            </div>
            <!--/////////////////////////////////////////////////////////////////////
            /////                 DECSRIPCION DIAGNÓSTICO                       ////
            ////////////////////////////////////////////////////////////////////-->      
            <div class="mt-2 sm:text-xs sm:ml-1 mb-16 mr-5 ml-5 sm:w-66 font-titulo " v-if="tipo == 'DIAG'">
                <div class="mt-16 w-full ml-5 grid grid-cols-3 sm:grid-cols-2">
                    <div class="mr-10 sm:w-32 sm:mb-10 sm:-mt-10 ">

                        

                        <ValidationProvider immediate name="Descripción de Falla" rules="required|max:300" v-slot="{ errors }">
                            <div class="grid grid-cols-3">
                                <span class="col-span-2">DESCRIPCIÓN DE LA FALLA REPORTADA:</span>
                                <div class="sm:hidden md:hidden w-6 ">
                            <span class="" v-tooltip.bottom  =" { ref:'tooltipdescripcionfalla', class: 'tooltip-custom tooltip-other-custom'}">
                            <img src="@/assets/img/pregunta.png" class="flex items-center  w-5 h-5 "/>
                        </span>

                        <div ref="tooltipdescripcionfalla" class="font-titulo">
                        <p class="text-center text-gray-800">Se debe indicar la Descripción de Falla como aparece en el Módulo Institucional de CAPUFE.</p>
                        </div>
                        </div> 
                            </div>
                            
                            
                            <textarea
                                v-model="datosDiagnostico.descripcionFalla"
                                class="mx-auto is_valid py-4 mb-0 h-40 ph-center-observaciones"
                                placeholder="Descripción de la Falla Reportada"
                                name="DescripcionFalla"
                                :maxlength="limite"
                            />
                            <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                            <span class="text-gray-500 ml-33 sm:ml-12 md:mx-16">{{ restante_desc }}/300</span>
                        </ValidationProvider>
                        
                    </div>
                    <div class="mr-10 sm:w-32 sm:-mt-10">
                        <ValidationProvider immediate name="Diagnóstico de Falla" rules="required|max:300" v-slot="{ errors }">
                            <div class="grid grid-cols-3 ">
                            <span class="col-span-2">DIAGNÓSTICO DE LA FALLA REPORTADA:</span>
                            <div class="sm:hidden md:hidden w-6">
                            <span class="" v-tooltip.bottom =" { ref:'tooltipdiagnotiscofalla', class: 'tooltip-custom tooltip-other-custom'}">
                            <img src="@/assets/img/pregunta.png" class="flex items-center  w-5 h-5 "/>
                        </span>

                        <div ref="tooltipdiagnotiscofalla" class="font-titulo">
                        <p class="text-center text-gray-800">Se debe indicar la Descripción de Falla identificada por el Técnico de acuerdo al Sistema de Peaje PROSIS.</p>
                        </div>
                        </div> 
                        </div>
                            <textarea
                                v-model="datosDiagnostico.diagnosticoFalla"
                                class="mx-auto is_valid py-4 mb-0 h-40 ph-center-observaciones"
                                placeholder="Diagnostico de la Falla Reportada"
                                name="DiagnosticoFalla"
                                :maxlength="limite"
                            />
                            <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                            <span class="text-gray-500 ml-33 sm:ml-12 md:mx-16">{{ restante_diag }}/300</span>
                        </ValidationProvider>
                    </div> 
                    <div class="mr-10 sm:w-32 sm:mt-0 sm:mb-10 ">
                        <ValidationProvider immediate name="Causa de Falla" rules="required|max:300" v-slot="{ errors }">
                            <div class="grid grid-cols-3">
                                <span class="col-span-2">CAUSAS DE LA FALLA REPORTADA:</span>
                                <div class="sm:hidden md:hidden w-6">
                            <span class="" v-tooltip.top =" { ref:'tooltipcausafalla', class: 'tooltip-custom tooltip-other-custom'}">
                            <img src="@/assets/img/pregunta.png" class="flex items-center  w-5 h-5 "/>
                        </span>

                        <div ref="tooltipcausafalla" class="font-titulo">
                        <p class="text-center text-gray-800">Se debe indicar la causa o raíz que origina esta Falla. Ej: Variación de Voltaje, Descarga Electrica, Golpe de Usuario, etc.
NOTA: Se debe indicar si la Falla requiere de Refaccionamiento por Siniestro o Fin de Vida Útil.</p>
                        </div>
                        </div> 
                            </div>
                            
                            
                            <textarea
                                v-model="datosDiagnostico.causaFalla"
                                class="mx-auto is_valid py-4 mb-0 h-40 ph-center-observaciones"
                                placeholder="Causa de la Falla Reportada"
                                name="CausaFalla"
                                :maxlength="limite"
                            />
                            <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                            <span class="text-gray-600 ml-33 sm:ml-12 md:mx-16">{{ restante_causa }}/300</span>
                        </ValidationProvider>
                    </div>         
                </div>
            </div>
            <!-- /////////////////////////////////////////////////////////////////////
            ////                   DESCRIPCIÓN FICHA                          ///////
            //////////////////////////////////////////////////////////////////// -->
            <div class="font-titulo sm:-mt-6" v-if="tipo == 'FICHA'"> 
                <div v-if="modalAdvertencia && this.$route.params.tipoVista != 'Crear'" class="absolute justify-items-center rounded-lg border border-gray-400 shadow-xl inset-x-0 bg-white w-74 h-69 sm:h-73 sm:w-66 mx-auto px-10 py-5 text-gray-600">
                    <div>
                        <h1 class="mb-10 text-center font-titulo font-bold text-4xl sm:text-xl">
                            <img src="../../assets/img/warning.png" class="ml-20 sm:-ml-6" width="35" height="35" />
                            <p class="-mt-10 text-black sm:ml-6 sm:-mt-6">Advertencia</p>
                            <img src="../../assets/img/warning.png" class="ml-68 -mt-12 sm:-mt-10 sm:ml-49" width="35" height="35" />
                        </h1>
                        <div>
                            <p>*Si cambia el tipo de falla para este diagnostico es necesario eliminar el DTC con referencia {{ referenciaDtc }}</p>                                   
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <ValidationObserver ref="observerModal">                        
                            <ValidationProvider immediate name="comentarioBorrar" rules="required:max:300"  v-slot="{ errors }">    
                                <p class="text-md mb-1 font-semibold text-gray-900 mt-5">Motivo</p>
                                <textarea v-model="comentarioBorrarDtc" class="bg-white is_valid appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 w-69 mb-0 h-20 placeholder-gray-500 border" name="comentarioBorrar"/>              
                                <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <div class="mt-10 text-center">
                                <button @click="aceptar_borrar_dtc" class="botonIconCrear">Confirmar</button>
                                <button @click="cancelar_borrado_dtc" class="botonIconCancelar font-boton">Cancelar</button>
                            </div>
                        </ValidationObserver>                
                    </div>
                </div>
                <!-- Tipo de Fallas -->
                <div class="grid sm:grid-cols-1 grid-cols-2 ml-5 sm:text-xs sm:ml-0">

                    <div class="sm:ml-2 grid grid-cols-3">
                    <span class="lg:-mt-8 lg:ml-8">TIPO DE FALLA:</span>
                    <div class="sm:hidden md:hidden w-6 -ml-20 lg:ml-2 lg:-mt-8" :class="{'hidden':tipo != 'FICHA'}">
                            <span class="" v-tooltip.right =" { ref:'tooltipsiniestro', class: 'tooltip-custom tooltip-other-custom'}">
                            <img src="@/assets/img/pregunta.png" class="flex items-center  w-5 h-5 "/>
                        </span>

                        <div ref="tooltipsiniestro" class="font-titulo">
                        <p class="text-center text-gray-800">Se debe seleccionar el tipo de falla de acuerdo a lo indicado en el Diágnostico.</p>
                        </div>
                        </div> 
                    </div>

                    <div class="grid grid-cols-1 sm:mx-auto -ml-62 sm:w-20 sm:ml-50">
                        <ValidationProvider immediate name="TipoFalla" rules="required" v-slot="{ errors }" class="grid grid-cols-3 sm:grid-cols-2">    
                            <div class="text-center -ml-66 sm:mr-8">
                                <p>POR OPERACIÓN</p>                        
                                <input v-if="hiddenCheck" v-model="datosDiagnostico.tipoFalla" type="checkbox" true-value="1" false-value="0" @change="bloquear_checboxes(1)" name="Tipo de Falla" :disabled="blockCheckBox[0]">
                            </div>
                            <div class="text-center -ml-66 sm:-ml-32">
                                <p>POR SINIESTRO</p>
                                <input v-model="datosDiagnostico.tipoFalla" type="checkbox" true-value="2" false-value="0" @change="bloquear_checboxes(2)" name="Tipo de Falla" :disabled="blockCheckBox[1]">
                            </div>
                            <div class="text-center -ml-66 sm:-ml-67">
                                <p>POR FIN DE VIDA ÚTIL</p>
                                <input v-model="datosDiagnostico.tipoFalla" type="checkbox" true-value="3" false-value="0" @change="bloquear_checboxes(3)" name="Tipo de Falla" :disabled="blockCheckBox[2]">
                            </div>
                            <span class="text-red-400 text-xs block sm:-ml-22 sm:mt-5">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>   
                </div>
                <!-- Descripciones Ficha -->
                <div class="ml-5 sm:text-xs sm:ml-0 sm:w-66 xl:w-auto xl:ml-0">   
                    <div class="mt-6 w-full grid sm:grid-cols-2 grid-cols-2 lg:grid-cols-2 xl:mx-24">
                        <div class="mr-10 sm:mr-1 sm:ml-3 sm:mb-6 sm:w-32 lg:w-69 w-74">
                            <ValidationProvider immediate name="DescripcionFalla" rules="required|max:300" v-slot="{ errors }">    
                                <span class="">DESCRIPCIÓN DE LA FALLA REPORTADA:</span>
                                <textarea
                                    v-model="datosDiagnostico.descripcionFalla"
                                    class="mx-auto py-4 mb-0 h-40 textareaFicha ph-center-observaciones sm:w-32 sm:mt-5 sm:ml-1"
                                    placeholder="jane@example.com"
                                    name="DescripcionFalla"
                                    :maxlength="limite"
                                    readonly
                                />
                                <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                                <span class="text-gray-500 sm:ml-12">{{ restante_desc }}/300 <span class="text-red-400 ml-1 sm:hidden md:hidden text-xs">Este dato no se puede modificar, viene del Diagnóstico de Falla</span></span>            
                                <div class="text-red-400 sm:ml-2 lg:hidden xl:hidden">Este dato no se puede modificar, viene del Diagnóstico de Falla</div>
                            </ValidationProvider>
                        </div>
                        <div class="mr-10 ml-1 sm:ml-0 w-73 sm:ml-3 sm:w-32 lg:w-69">
                            <ValidationProvider immediate name="SolucionFallas" rules="required|max:300" v-slot="{ errors }">
                                <div class="grid">
                                    <span class="text-sm sm:hidden lg:text-xs">SOLUCIÓN y/o INTERVENCION REALIZADA PARA LA FALLA REPORTADA:</span>
                                <span class="xl:hidden lg:hidden md:hidden">SOLUCIÓN y/o INTERVENCION REALIZADA:</span>
                                <div class="-mt-6 ml-72 sm:hidden md:hidden lg:-mt-6 lg:ml-auto w-6" :class="{'hidden':tipo != 'FICHA'}">
                            <span class="" v-tooltip.right =" { ref:'tooltipintervencion', class: 'tooltip-custom tooltip-other-custom'}">
                            <img src="@/assets/img/pregunta.png" class="flex items-center  w-5 h-5 "/>
                        </span>

                        <div ref="tooltipintervencion" class="font-titulo">
                        <p class="text-center text-gray-800">Se debe indicar las acciones realizadas por parte del Técnico de Servicio para la solución y/o atención de la falla.</p>
                        </div>
                        </div> 
                                </div>
                                
                                <textarea
                                    v-model="datosDiagnostico.solucionFalla"
                                    class="mx-auto py-4 mb-0 h-40 is_valid ph-center-observaciones sm:w-32 sm:-ml-1"
                                    placeholder="Intervencion Realizada"
                                    name="SolucionFallas"
                                    :maxlength="limite"
                                />
                                <span class="text-gray-500 sm:ml-6">{{ restante_sol }}/300</span>
                                <span class="text-red-400 text-xs block sm:mt-0">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>                                  
                    </div>                 
                </div>            
            </div>
        </ValidationObserver>
    </div>
</template>

<script>
import SelectPlaza from '../../components/Header/SelectPlaza'
import ServiceReportePDF from '../../services/ReportesPDFService';
import moment from "moment";
import Multiselect from "vue-multiselect";
import EventBus from '../../services/EventBus'
import CookiesService from '../../services/CookiesService';
import { Datetime } from 'vue-datetime';
export default {
name: "Diagnostico",
props:{
    tipo: {
        type: String,
        default: () => ''
    },
    reporteInsertado: {
        type: Boolean,
        default: () => false
    } 
},
components:{
    SelectPlaza,
    Multiselect, 
    Datetime   
},
///////////////////////////////////////////////////////////////////////
////                      DATA                                    ////
/////////////////////////////////////////////////////////////////////
data(){
    return{
        limite:300, 
        boolCambiarPlaza: false,                                                                                     
        datosDiagnostico:{
            referenceNumber: "",
            ubicacion: '',
            fechaDiagnostico: '',
            horaInicio: '',
            horaFin: '',
            folioFalla: '',
            numeroReporte: '',
            descripcionFalla: '',
            diagnosticoFalla:'',
            causaFalla:''
        },
        listaPlazas: [],
        arrayReference: [],
        headerSelecionado: {},
        plazaSeleccionada:"",
        arraySelect:{},
        type:"DIAG",
        blockInput: false,
        blockCheckBox: [false, false, false],     
        referenciaDtc: '',
        modalAdvertencia: false,
        comentarioBorrarDtc: '',
        tipoFallaOriginal: '',  
        prueba: '2021-06-01T1:27:00',
        hiddenCheck: true          
    }
},
created(){
    EventBus.$on('validar_header_diagnostico', (value) => this.validar_campos_header(value))
},
beforeMount: async function(){      
    //Bloque para editar
    if(this.$route.query.referenceNumberFinishDiagnostic != undefined){        
        this.hiddenCheck = false
    } 
    if(this.$route.params.tipoVista != 'Crear'){   
        //Editar Ficha            
        if(this.$route.query.data != undefined){      
            this.referenciaDtc = this.$route.query.referenciaDtc                                  
            this.plazaSeleccionada = this.$store.state.Login.plazaSelecionada.numeroPlaza;
            this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
            this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)                               
            this.datosDiagnostico = this.$route.query.data        
            delete this.datosDiagnostico["diagnosticoFalla"]
            delete this.datosDiagnostico["causaFalla"]
            this.tipoFallaOriginal = this.datosDiagnostico.tipoFalla       
            this.blockInput = true
            this.boolCambiarPlaza = true
        }     
        //Editar Diagnostico 
        else{                          
            let paramRoute = this.$route.query.item                       
            let { plazaSelect } = await CookiesService.actualizar_plaza(paramRoute.adminSquareId)        
            this.plazaSeleccionada = plazaSelect.numeroPlaza;
            this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
            this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)
            let todosCarriles = await this.$store.getters["Refacciones/GET_CARRILES_STATE"];                  
            let ubicacion = []
            if(paramRoute.lanes != 'Sin lineas asignadas'){
                ubicacion = paramRoute.lanes
                    .split(',')
                    .map(carril => {                        
                        return todosCarriles.find(item => item.lane == carril)                        
                })     
            }
            let fecha = moment(paramRoute.diagnosisDate).format('YYYY-MM-DD')    
            this.datosDiagnostico = {
                referenceNumber: paramRoute.referenceNumber,
                ubicacion: ubicacion,
                fechaDiagnostico: fecha,
                horaInicio: paramRoute.start,
                horaFin: paramRoute.end,
                folioFalla: paramRoute.failuerNumber,
                numeroReporte: paramRoute.siniesterNumber,
                descripcionFalla: paramRoute.failureDescription,
                diagnosticoFalla:paramRoute.failureDiagnosis,
                causaFalla:paramRoute.causeFailure
            }
        }        
    }
    //Bloque para crear
    else{                            
        this.plazaSeleccionada = this.$store.state.Login.plazaSelecionada.numeroPlaza;
        this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
        this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)          
        //Bloque para crear Ficha      
        if(this.$route.query.data != undefined){                                
            this.datosDiagnostico = this.$route.query.data                     
            delete this.datosDiagnostico["diagnosticoFalla"]
            delete this.datosDiagnostico["causaFalla"]
            this.blockInput = true
        }   
    }               
    this.$emit('actualizar-header', { header: this.datosDiagnostico, value: undefined, crear: false })
},
destroyed(){
    if(this.tipo == 'FICHA')
        EventBus.$off('validar_header_diagnostico')
},
/////////////////////////////////////////////////////////////////////
////                          COMPUTADAS                          ////
/////////////////////////////////////////////////////////////////////
computed:{
    nombre_usuario(){
        return this.$store.getters["Header/GET_HEADER_SELECCIONADO"].nombre;    
    },
    carriles_plaza(){
        return this.$store.getters["Refacciones/GET_CARRILES_STATE"];    
    },
    restante_desc(){
        return  this.datosDiagnostico.descripcionFalla.length
    },
    restante_diag(){
        return this.datosDiagnostico.diagnosticoFalla.length
    },
    restante_causa(){
        return this.datosDiagnostico.causaFalla.length
    },
    restante_sol(){
        if(this.datosDiagnostico.solucionFalla != undefined)
            return this.datosDiagnostico.solucionFalla.length
        return 0
    },
    restante_folio(){
        return this.datosDiagnostico.folioFalla.trim().length
    },
    restante_siniestro(){
        return this.datosDiagnostico.numeroReporte.trim().length
    }
},
watch:{
    tipo(newValue){
        if(newValue == 'FICHA'){
            delete this.datosDiagnostico["descripcionFalla"]
            delete this.datosDiagnostico["diagnosticoFalla"]
            delete this.datosDiagnostico["causaFalla"]
            this.blockInput = true
        }
    }, 
},
methods:{  
    aceptar_borrar_dtc: async function(){
        let userId = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']         
        let obj = { "refNum": this.referenciaDtc, "userId": userId.idUser, comentario: this.comentarioBorrarDtc }                                                      
        await this.$store.dispatch("DTC/BORRAR_DTC",obj)
            .then(() => {
                this.$notify.success({
                    title: "Ok!",
                    msg: `EL DTC CON LA REFERENCIA ${this.referenciaDtc} SE ELIMINO CORRECTAMENTE.`,
                    position: "bottom right",
                    styles: { height: 100, width: 500 },
                })    
            })
            .catch(() => {
                this.$notify.error({
                    title: "Ups!",
                    msg: `EL DTC CON LA REFERENCIA ${this.referenciaDtc} NO SE PUDO ELIMINAR.`,
                    position: "bottom right",
                    styles: { height: 100, width: 500 },
                })
            }) 
        this.referenciaDtc = '--'
        this.modalAdvertencia = false                                                                                                                        
    },
    cancelar_borrado_dtc(){
        this.modalAdvertencia = false
        this.comentarioBorrarDtc = ''
        this.datosDiagnostico.tipoFalla = this.tipoFallaOriginal
    },
    bloquear_checboxes(tipo){   
        this.$emit('mapear-tipo-falla', tipo)     
        if(tipo == 1){
            this.blockCheckBox = [true, false, false]    
            if(this.referenciaDtc != '--')  
                this.modalAdvertencia = true
        }    
        if(tipo == 2)
            this.blockCheckBox = [false, true, false]
        if(tipo == 3)
            this.blockCheckBox = [false, false, true]            
    },
    crear_referencia: async function () {              
        if(this.$route.params.tipoVista == 'Crear') {   
            let objReference  = await ServiceReportePDF.crear_referencia(
                moment(this.datosDiagnostico.fechaDiagnostico,"YYYY-MM-DD").format("DD-MM-YYYY"), 
                this.headerSelecionado.referenceSquare, true
            )    
            this.datosDiagnostico.referenceNumber = objReference.referenceNumber   
        }           
    },
    async cambiar_plaza(numeroPlaza) {                 
        this.plazaSeleccionada = numeroPlaza 
        this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
        this.arrayCarriles = this.$store.dispatch('Refacciones/BUSCAR_CARRILES',this.plazaSeleccionada)
        this.crear_referencia()               
    },
    validar_campos_header: async function(value){      
        try {                                                   
            let validacion = false
            Object.entries(this.datosDiagnostico).forEach(item => {
                if( item[0] != 'numeroReporte'){
                    if(item[1] == ""){
                        validacion = true
                    }                                        
                }
            })    
            let fechaActual = Date.now()
            let fechaDiagnostico = Date.parse(this.datosDiagnostico.fechaDiagnostico) 
            let horaInicio = Date.parse(this.datosDiagnostico.horaInicio)
            let horaFin = Date.parse(this.datosDiagnostico.horaFin)                                                      
            if(!validacion && fechaDiagnostico < fechaActual && horaInicio < horaFin){                                                            
                this.$emit('actualizar-header', { header: this.datosDiagnostico, value: value, crear: true })                                   
            }                 
            if(validacion){
                this.$emit('actualizar-header', { header: this.datosDiagnostico, value: value, crear: true })
            }                                                                    
        }
        catch(error){
            this.$notify.warning({
                    title: "Ops!!",
                    msg: "NO SE PUDO INSERTAR EL DIAGNOSTICO PORFAVOR VERIFIQUE SUS DATOS.",
                    position: "bottom right",
                    styles: { height: 100, width: 500 },
                });
        }
    },  
    label_multi_select(value){            
        if(value != 'Sin Actividad')
            return value.lane
        else 
            return [{ "capufeLaneNum": '',  'idGare': '', 'lane': ''}]
    }
}
}
</script>

<style>
.vdatetime-popup__header{
    background: #2c5282;
}
.tooltip {
  @apply invisible absolute;
}

.has-tooltip:hover .tooltip {
  @apply visible z-50;
}
</style>