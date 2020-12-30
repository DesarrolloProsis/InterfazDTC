<template>
    <div>
        <div class="grid gap-4 grid-cols-1 pl-3 pr-3">     
            <div class="flex justify-center mt-10">
                <h1 class=" text-3xl sm:text-2xl">TABLA DE ACTIVIDADES</h1>
            </div>
            <div class="inline-flex h-40 ml-40 mr-40 sm:m-0 sm:ml-2 sm:mr-2 border shadow-lg rounded-md border-gray-800">
                <div class=" inline-flex sm:inline-block mt-3">
                    <div class="w-1/2 sm:w-full">
                        <p class=" uppercase text-lg text-center">Actividades del mes Abril 2000</p> 
                        <div class="pl-10 mt-4 inline-flex">
                            <div>
                                <p>Plaza Seleccionada: Tlalpan</p>
                                <p class="text-sm font-semibold mb-1 text-gray-900 ml-2 mt-2">Cambiar Plaza</p>
                                <select v-model="plazaSelect" @change="cambiarPlaza" class="w-48" type="text" name="TipoDescripcion" >
                                    <option disabled value>Selecionar...</option>
                                    <option v-for="(item, index) in listaPlazasUser" v-bind:value="item.numPlaza" :key="index">
                                        {{ item.plazaName }}
                                    </option>
                                </select>
                            </div>
                            <div class="pl-5">
                                <div class=" inline-flex mb-6">
                                <p class="text-sm  text-gray-900 ml-3 mr-2">Mes</p>                                
                                <select v-model="plazaSelect" @change="cambiarPlaza" class="w-48" type="text" name="TipoDescripcion" >
                                    <option disabled value>Selecionar...</option>
                                    <option disabled value>Enero</option>
                                    <option disabled value>Febrero</option>
                                    <option disabled value>Marzo</option>
                                    <option disabled value>Abril</option>
                                    <option disabled value>Mayo</option>
                                    <option disabled value>Junio</option>
                                    <option disabled value>Julio</option>
                                    <option disabled value>Agosto</option>
                                    <option disabled value>Septiembre</option>
                                    <option disabled value>Octubre</option>
                                    <option disabled value>Noviembre</option>
                                    <option disabled value>Diciembre</option>
                                </select>
                                </div>
                                <div class=" inline-flex">
                                <p class="text-sm font-semiboldtext-gray-900 ml-3 mr-2">Año</p>
                                <select v-model="plazaSelect" @change="cambiarPlaza" class="w-48" type="text" name="TipoDescripcion" >
                                    <option disabled value>Selecionar...</option>
                                    <option disabled value>2020</option>
                                    <option disabled value>2021</option>                                        
                                </select>
                                </div>
                            </div>                            
                        </div>                          
                    </div>
                    <div class="w-1/2 sm:w-full justify-start inline-block">
                        <p class=" uppercase text-lg">Comentario:</p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem enim soluta temporibus accusantium tenetur quam, nisi qui odio magnam? Inventore deserunt nemo molestias praesentium aliquid saepe libero magnam ipsum impedit.
                    </div>                                 
                </div>            
            </div>
            <div>
                <div class="overflow-x-auto sm:m-2 sm:text-xs justify-center flex">
                    <!--//////////////////////////////////////////////////////////////////////
                        ////                           TABLA                             ////
                        ////////////////////////////////////////////////////////////////////-->
                    <table class="border-2 border-gray-800">
                        <!--/////////////////////////////////////////////////////////////////
                        ////                           HEADER TABLA                      ////
                        ////////////////////////////////////////////////////////////////////-->
                        <thead>
                            <tr class="text-md text-gray-400 font-normal bg-blue-800">                
                                <th class="w-56 border-2 border-gray-800">Carril</th>
                                <th class="w-24 border-2 border-gray-800">Numero Capufe</th>
                                <th class="w-56 border-2 border-gray-800">Tramo</th>
                                <th class="w-40 border-2 border-gray-800">Fecha de Actividad</th>
                                <th class="w-40 border-2 border-gray-800">Tipo de Actividad</th>
                                <th class="w-32 border-2 border-gray-800">Acciones</th>                
                            </tr>
                        </thead>
                    <!--/////////////////////////////////////////////////////////////////
                        ////                           Body TABLA                     ////
                        /////////////////////////////////////////////////////////////////-->
                        <tbody>
                            <tr class="h-12 text-gray-900" v-for="(item, key) in listaActividadesMensuales" :key="key"> 
                                <td class="w-66 text-center border-2 border-gray-800">{{ item.lane }}</td>
                                <td class="w-24 text-center border-2 border-gray-800">{{ item.capufeLaneNum }}</td>
                                <td class="w-56 text-center border-2 border-gray-800">{{ item.idGare }}</td>
                                <td class="w-40 text-center border-2 border-gray-800">{{ item.day }}</td>
                                <td class="w-40 text-center border-2 border-gray-800">{{ item.frequencyId }}</td>
                                <td class="w-32 text-center border-2 border-gray-800"></td>
                            </tr>                    
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            listaActividadesMensuales:[]
        }
    },
/////////////////////////////////////////////////////////////////////
////                        CICLOS DE VIDA                       ////
/////////////////////////////////////////////////////////////////////
beforeMount(){
    let user = this.$store.getters['Login/getUserForDTC']
    let objApi = {
        "userId": user.idUser,
        "squareId": user.numPlaza,
        "month": 12,
        "year": 2020
    } 
    this.$store.dispatch('Actividades/OBTENER_ACTIVIDADES_MESNUALES', objApi)
    this.listaActividadesMensuales = this.$store.getters['Actividades/GET_ACTIVIDADES_MENSUALES']
    

}


}
</script>
