<template>
  <div>
    <div class="flex w-full sm:hidden md:hidden lg:show xl:show">
      <div>
        <div class="text-center mb-5">
          <h6 class="font-bold text-xl text-gray-800">Equipo Dañado</h6>
        </div>
        <div class="flex justify-center p-8">
          <div class="grid gap-4 grid-cols-1">
            <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24">
              <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
                <!--/////////////////////////////////////////////////////////////////
                ////                 CABECERA DE LA TABLA                       ////
                ////////////////////////////////////////////////////////////////////-->
                <thead>
                  <tr class="text-sm text-gray-400 font-normal bg-blue-800">
                    <th class="px-1 border-2 border-gray-800">Partida</th>
                    <th class="px-1 border-2 border-gray-800 w-16">Unidad</th>
                    <th class="px-4 text-red-600 border-2 border-gray-800">Componente</th>
                    <th class="px-4 text-red-600 border-2 border-gray-800">Cantidad</th>
                    <th class="px-4 border-2 border-gray-800 xl:w-32">Marca</th>
                    <th class="px-4 border-2 border-gray-800 xl:w-32">Modelo</th>
                    <th class="px-4 border-2 border-gray-800 xl:w-32">Numero de Serie</th>
                    <th class="px-4 border-2 border-gray-800 text-red-600">Ubicacion<br />(carril/cuerpo)</th>
                    <th class="px-4 border-2 border-gray-800">Fecha de Instalacion</th>
                    <th class="px-4 border-2 border-gray-800">Fecha<br />(Ultimo Mantenimiento)</th>
                    <th class="px-4 border-2 border-gray-800">Folio<br />(Ultimo Mantenimiento)</th>
                    <th class="px-12 border-2 border-gray-800">Real</th>
                    <th class="px-1 border-2 border-gray-800 w-20">Fabricante</th>
                    <th class="px-4 border-2 border-gray-800">Acciones</th>
                  </tr>
                </thead>
                <!--/////////////////////////////////////////////////////////////////
                ////                 CUERPO DE LA TABLA                          ////
                ////////////////////////////////////////////////////////////////////-->
                <tbody>
                  <tr class="hover:bg-blue-200 text-center" v-for="(equipo, index) in arrayPartidas" :key="index">
                    <td class="border border-gray-800">
                      <div v-if="equipo.rowUp">{{ equipo.row1.toString() }}</div>
                      <div v-else>{{ objectEditar.rowUpd1 }}</div>
                    </td>
                    <td class="border border-gray-800">
                      <div v-if="equipo.rowUp">{{ equipo.row2.toString() }}</div>
                      <div v-else>{{ objectEditar.rowUpd2 }}</div>
                    </td>
                    <td class="border border-gray-800">
                      <div v-if="equipo.rowUp">{{ equipo.row3.description.toString() }}</div>
                      <!--<div v-else>
                        <multiselect
                          @select="UpdateCompEditado()"
                          v-model="updtCompEditar"
                          :options="listaComponentes"
                          :multiple="false"
                          group-values="secundarios"
                          group-label="componentePrincipal"
                          :close-on-select="false"
                          :group-select="false"
                          placeholder="Buscar componentes"
                          track-by="name"
                          class="w-65"
                          label="description"
                          >
                          <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
                        </multiselect>
                      </div>-->
                      <div v-else></div>
                    </td>
                    <td class="border border-gray-800">
                      <div v-if="equipo.rowUp">{{ equipo.row4 }}</div>
                      <div v-else>{{ objectEditar.rowUpd4 }}</div>
                    </td>
                    <td class="border border-gray-800">
                      <div v-if="equipo.rowUp">{{ equipo.row5.toString() }}</div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd5" :key="key">{{ item }}</p></div>
                    </td>
                    <td class="border border-gray-800">
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row6" :key="key">{{ item }}</p></div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd6" :key="key">{{ item }}</p>
                      </div>
                    </td>
                    <td class="border border-gray-800">
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row7" :key="key">{{ item }}</p></div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd7" :key="key">{{ item }}</p>
                      </div>
                    </td>
                    <td class="border border-gray-800">
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row8" :key="key">{{ item | formatPlaza }}</p></div>
                      <!-- <div v-else>
                        <multiselect
                          v-model="laneSelectEditar"
                          :close-on-select="false"
                          :clear-on-select="true"
                          :hideSelected="false"
                          placeholder="Selecciona..."
                          :options="listLaneEditar"
                          :multiple="true"
                        >
                          <template v-if=" updtCompEditar != 'Servidor de Video' && updtCompEditar != 'Servidor de Plaza'" slot="selection" slot-scope="{ values, isOpen }">
                            <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Carriles</span>
                          </template>
                          </multiselect>
                      </div> -->
                      <div v-else></div>
                    </td>
                    <td class="border border-gray-800">
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row9" :key="key" class="text-sm">{{ item | formatDate }}</p></div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd9" :key="key" class="text-sm">{{ item | formatDate }}</p></div>
                    </td>
                    <td class="border border-gray-800">
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row10" :key="key" class="text-sm">{{ item | formatDate }}</p></div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd10" :key="key" class="text-sm">{{ item | formatDate }}</p></div>
                    </td>
                    <td class="border border-gray-800">
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row11" :key="key" class="text-sm">{{ item }}</p></div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd11" :key="key" class="text-sm">{{ item }}</p></div>
                    </td>
                    <td class="border border-gray-800">
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row12" :key="key" class="text-sm">{{ item }}</p></div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd12" :key="key" class="text-sm">{{ item }}</p></div>
                    </td>
                    <td class="border border-gray-800">
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row13" :key="key" class="text-sm">{{ item }}</p></div>
                      <div v-else><p v-for="(item, key) in objectEditar.rowUpd13" :key="key" class="text-sm">{{ item }}</p></div>
                    </td>
                    <td class="border border-gray-800 pb-2">
                      <div v-if="equipo.rowUp">
                        <button
                    v-on:click.stop.prevent="deleteItem(index)"
                    class="botonIconBorrarCard"
                  >
                    <img
                      src="../../assets/img/bin.png"
                      class="mr-2 sm:m-1"
                      width="15"
                      height="15"
                    />
                    <span>Borrar</span>
                        </button>         
                      </div>
                      <div v-else>
                        <button
                    v-on:click.stop.prevent="abortUpdateRowTable(index)"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-red-700 m-2"
                  >
                    <img
                      src="../../assets/img/cerrar.png"
                      class="mr-2 sm:m-1"
                      width="15"
                      height="15"
                    />
                    <span>Cancelar</span>
                        </button>
                        <button
                    v-on:click.stop.prevent="confirmRowTable(index)"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700 m-2"
                  >
                    <img
                      src="../../assets/img/garrapata.png"
                      class="mr-2 sm:m-1"
                      width="20"
                      height="20"
                    />
                    <span>Confirmar</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <!--/////////////////////////////////////////////////////////////////
                    ////           FOOTER DE LA TABLA + PARTIDA                      ////
                  ////////////////////////////////////////////////////////////////////-->
                  <tr class="text-center">
                    <td class="border border-gray-800">{{ "*" }}</td>
                    <td class="border border-gray-800">{{ datosPrePartida.rowUnidad.toString() }}</td>
                    <td class="border border-gray-800">
                      <button @click="modalAgregarComp">
                        <img
                          src="../../assets/img/more.png"
                          width="15"
                          height="15"
                        />
                      </button>
                      <multiselect
                          @open="UnClick"                          
                          @select="update_componente"
                          v-model="updtComp"
                          :options="listaComponentes"
                          :multiple="false"
                          group-values="secundarios"
                          group-label="componentePrincipal"
                          :close-on-select="true"
                          :group-select="false"
                          placeholder="Buscar componentes"
                          track-by="name"
                          openDirection="below"
                          class="md:hidden lg:hidden xl:hidden"
                          label="description"
                      ><span slot="noResult"></span>
                      </multiselect>
                    </td>
                    <td class="border border-gray-800 w-1">
                      <template v-if="statusMetro">
                        <input v-model="cantidadMetro" type="number" class="w-24" placeholder="Cantidad">
                      </template>
                      <template v-else>
                        {{ datosPrePartida.rowCantidad }}
                      </template>                      
                    </td>
                    <td class="border border-gray-800">{{ datosPrePartida.rowMarca.toString() }}</td>
                    <td class="border border-gray-800"><p v-for="(item, key) in datosPrePartida.rowModelo" :key="key" class="text-sm">{{ item }}</p></td>
                    <td class="border border-gray-800"><p v-for="(item, key) in datosPrePartida.rowNumSerie" :key="key" class="text-sm">{{ item }}</p></td>
                    <td class="border border-gray-800">
                      <multiselect
                          v-model="laneSelect"                                                  
                          :close-on-select="false"
                          :clear-on-select="true"
                          :hideSelected="false"
                          placeholder="Selecciona..."
                          :options="listLane"
                          :multiple="true"
                          class="md:hidden lg:hidden xl:hidden"
                        >
                        <template v-if="updtComp != 'Servidor de Video' && updtComp != 'Servidor de Plaza'" slot="selection" slot-scope="{ values, isOpen }">
                          <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Carriles</span>
                        </template>
                      </multiselect>
                    </td>
                    <td class="border border-gray-800"><p v-for="(item, key) in datosPrePartida.rowDateInstalacion" :key="key" class="text-sm">{{ item | formatDate }}</p></td>
                    <td class="border border-gray-800"><p v-for="(item, key) in datosPrePartida.rowDateMantenimiento" :key="key" class="text-sm">{{ item | formatDate }}</p></td>
                    <td class="border border-gray-800"><p v-for="(item, key) in datosPrePartida.rowFolioMantenimiento" :key="key" class="text-sm">{{ item }}</p></td>
                    <td class="border border-gray-800"><p v-for="(item, key) in datosPrePartida.rowDateReal" :key="key" class="text-sm">{{ item }}</p></td>
                    <td class="border border-gray-800"><p v-for="(item, key) in datosPrePartida.rowDateFabricante" :key="key" class="text-sm">{{ item }}</p></td>
                    <td class="border border-gray-800 p-2">
                      <button v-on:click.stop.prevent="agregarPartida()" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700 w-24 hidden">
                        <img src="../../assets/img/more.png" width="20" height="20" />
                        <span class="text-xs">Agregar Partida</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/////////////////////////////////////////////////////////////////////
    //////                       TABLA                                //////
    /////                       PEQUEÑA                              //////
    ////////////////////////////////////////////////////////////////////-->
    <div class="flex justify-center lg:hidden xl:hidden">
      <div class="p-4" :class="{ hidden: modal }">
        <div class="text-center mb-5">
          <h6 class="font-bold text-xl text-gray-800">Equipo Dañado</h6>
        </div>
        <div class="flex justify-center">
          <div class="grid gap-4 grid-cols-1">
            <div class="sm:text-xs" :class="{ 'overflow-x-auto': scrollBool}">
              <table class="border-collapse">
                <!--/////////////////////////////////////////////////////////////////////
                /////                 CABECERA DE LA TABLA                       ///////
                ////                       PEQUEÑA                              ///////
                ////////////////////////////////////////////////////////////////////-->
                <thead>
                  <tr class="border text-xs bg-blue-800 text-white">
                    <th class="w-20 border-2 border-gray-800">Partida</th>
                    <th class="w-48 border-2 border-gray-800 text-red-600">Componente</th>
                    <th class="w-48 border-2 border-gray-800 text-red-600">Ubicacion<br />(carril/cuerpo)</th>
                    <th class="w-48 border-2 border-gray-800">Acciones</th>
                  </tr>
                </thead>
                <!--//////////////////////////////////////////////////////////////////
                  ////                 CUERPO DE LA TABLA                      //////
                 /////////////////////////////////////////////////////////////////-->
                <tbody>
                  <tr class="hover:bg-blue-200 text-center" v-for="(equipo, index) in arrayPartidas" :key="index">
                    <td class="border border-gray-800 text-sm">
                      <div v-if="equipo.rowUp">{{ equipo.row1.toString() }}</div>
                      <div v-else>{{ objectEditar.rowUpd1 }}</div>
                    </td>
                    <td class="border border-gray-800 text-sm">
                      <div v-if="equipo.rowUp">{{ equipo.row3.description.toString() }}</div>
<!--                       <div v-else>
                        <multiselect
                        @select="UpdateCompEditado()"                        
                        v-model="updtCompEditar"
                        :options="listaComponentes"
                        :multiple="false"
                        group-values="secundarios"
                        group-label="componentePrincipal"
                        :close-on-select="true"
                        :group-select="false"
                        placeholder="Buscar componentes"
                        track-by="name"
                        class="w-65"
                        label="description"
                        ><span slot="noResult"
                          >Oops! No elements found. Consider changing the search
                          query.</span
                      >
                        </multiselect>           
                      </div> -->
                      <div v-else></div>
                    </td>
                    <td class="border border-gray-800 text-sm">
                      <div v-if="equipo.rowUp"><p v-for="(item, key) in equipo.row8" :key="key">{{ item | formatPlaza }}</p></div>
<!--                       <div v-else>
                        <multiselect
                        v-model="laneSelectEditar"
                        :close-on-select="false"
                        :clear-on-select="true"
                        :hideSelected="false"
                        placeholder="Selecciona..."
                        :options="listLaneEditar"
                        :multiple="true"
                      >
                        <template
                          v-if="updtCompEditar != 'Servidor de Video' && updtCompEditar != 'Servidor de Plaza'"
                          slot="selection"
                          slot-scope="{ values, isOpen }"
                        >
                          <span
                            class="multiselect__single"
                            v-if="values.length &amp;&amp; !isOpen"
                            >{{ values.length }} Carriles</span
                          >
                        </template>
                        </multiselect>
                      </div> -->
                      <div v-else></div>
                    </td>
                    <td class="border border-gray-800">
                      <div v-if="equipo.rowUp">
                        <button
                        v-on:click.stop.prevent="deleteItem(index)"
                        class="botonIconBorrarCard"
                      >
                        <img
                          src="../../assets/img/bin.png"
                          width="15"
                          height="15"
                        />
                        </button>
                        <!-- <button
                          v-on:click.prevent="updateRowTable(index, equipo)"
                          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded inline-flex items-center border-2 border-yellow-500 m-1"
                        >
                          <img
                            src="../../assets/img/pencil.png"
                            width="15"
                            height="15"
                          />
                        </button> -->
                        <button
                        v-on:click.stop.prevent="infoModal(index)"
                        class="botonIconMas ml-1"
                      >
                        <img
                          src="../../assets/img/mas.png"
                          width="15"
                          height="15"
                        />
                        </button>
                      </div>
                      <div v-else>
                        <button
                        v-on:click.stop.prevent="abortUpdateRowTable(index)"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded inline-flex items-center border-2 border-red-700 m-1"
                      >
                        <img
                          src="../../assets/img/cerrar.png"
                          width="15"
                          height="15"
                        />
                        </button>
                        <button
                        v-on:click.stop.prevent="confirmRowTable(index)"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700 m-1"
                      >
                        <img
                          src="../../assets/img/garrapata.png"
                          width="15"
                          height="15"
                        />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <!--////////////////////////////////////////////////////////////////////
                  ////           FOOTER DE LA TABLA + PARTIDA                      //////
                  ////////////////////////////////////////////////////////////////////-->
                  <tr class="text-center">
                    <td class="border border-gray-800">{{ "*" }}</td>
                    <td class="border border-gray-800">
                      <button @click="modalAgregarComp">
                        <img src="../../assets/img/more.png" width="20" height="20" />
                      </button>
                      <multiselect
                        @select="update_componente"
                        @open="UnClick,scrollBool = false"
                        @close="scrollBool = true"
                        v-model="updtComp"
                        :options="listaComponentes"
                        :multiple="false"
                        group-values="secundarios"
                        group-label="componentePrincipal"
                        :close-on-select="true"
                        :group-select="false"
                        placeholder="Buscar componentes"
                        track-by="name"
                        class="w-32 sm:hidden md:hidden lg:hidden xl:hidden"
                        label="description"
                        ><span slot="noResult"
                          >Oops! No elements found. Consider changing the search
                          query.</span
                        >
                      </multiselect>                
                    </td>
                    <td class="border border-gray-800">
                      <multiselect
                        v-model="laneSelect"
                        @open="scrollBool = false"                        
                        @close="scrollBool = true"
                        :close-on-select="false"
                        :clear-on-select="true"
                        :hideSelected="false"
                        placeholder="Selecciona..."
                        :options="listLane"
                        :multiple="true"
                        class="sm:hidden md:hidden lg:hidden xl:hidden"
                      >
                        <template v-if="updtComp != 'Servidor de Video' && updtComp != 'Servidor de Plaza'" slot="selection" slot-scope="{ values, isOpen }">
                          <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Carriles</span>
                        </template>
                      </multiselect>
                    </td>
                    <td class="border border-gray-800 p-3">
                      <button
                        v-on:click.stop.prevent="agregarPartida()"
                        class="botonIconCrear hidden"
                      >
                        <img
                          src="../../assets/img/more.png"
                          class="m-1"
                          width="15"
                          height="15"
                        />
                        <span class="text-xs">Agregar Partida</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!--/////////////////////////////////////////////////////////////////
      ////              MODAL INFORMACION CELULAR                     ////
      ////////////////////////////////////////////////////////////////////-->
      <div class="flex flex-col p-5" v-if="modal">
        <div class="text-xs text-center border border-gray-800 shadow-lg rounded-lg z-40">
          <div class="inline-flex m-2">
            <div class="w-24 m-1">
              <p class="mb-3 font-bold text-gray-800 border-2 border-blue-800">Componete</p>
              <p>{{ objectModal.row3.description }}</p>
            </div>
            <div class="w-24 m-1">
              <p class="mb-3 font-bold text-gray-800 border-2 border-blue-800">Carriles</p>
              <p class="border-b-2" v-for="(item, id) in objectModal.row8" :key="id">{{ item | formatPlaza }}</p>
            </div>
            <div class="w-24 m-1">
              <p class="mb-3 font-bold text-gray-800 border-2 border-blue-800">Marca</p>
              <p class="border-b-2" v-for="(item, id) in objectModal.row5" :key="id">{{ item }}</p>
            </div>
          </div>
          <div class="inline-flex m-2">
            <div class="w-24 m-1">
              <p class="mb-3 font-bold text-gray-800 border-2 border-blue-800">Numero Serie</p>
              <p class="border-b-2" v-for="(item, id) in objectModal.row7" :key="id">{{ item }}</p>
            </div>
            <div class="w-24 m-1">
              <p class="mb-3 font-bold text-gray-800 border-2 border-blue-800">Modelo</p>
              <p class="border-b-2" v-for="(item, id) in objectModal.row6" :key="id">{{ item }}</p>
            </div>
            <div class="w-24 m-1">
              <p class="mb-3 font-bold text-gray-800 border-2 border-blue-800">Folio</p>
              <p class="border-b-2" v-for="(item, id) in objectModal.row11" :key="id">{{ item }}</p>
            </div>
          </div>
          <div class="inline-flex m-2">
            <div class="w-24 m-1">
              <p class="mb-3 font-bold text-gray-800 border-2 border-blue-800">Fecha de Instalacion</p>
              <p class="border-b-2" v-for="(item, id) in objectModal.row9" :key="id">{{ item | formatDate }}</p>
            </div>
            <div class="w-24 m-1">
              <p class="mb-3 font-bold text-gray-800 border-2 border-blue-800">Fecha Ultimo Mantenimiento</p>
              <p class="border-b-2" v-for="(item, id) in objectModal.row10" :key="id">{{ item | formatDate }}</p>
            </div>
            <div class="w-24 m-1">
              <p></p>
              <p class="mb-3 font-bold text-gray-800 border-2 border-blue-800">Tiempo de Vida Real</p>
              <p class="border-b-2" v-for="(item, id) in objectModal.row12" :key="id">{{ item }}</p>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              v-on:click.stop.prevent="(modal = false), (objectModal = {})"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-red-700 m-2"
            >
              <img
                src="../../assets/img/cerrar.png"
                class="mr-2 sm:m-1"
                width="15"
                height="15"
              />
              <span class="text-sm">Cerrar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
        <!--//////////////////////////////////////////////////////////////////
        ////                         MODAL AGREGAR COMPONENTE            ////
        //////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
            <div v-if="showModal" class="rounded-lg justify-center absolute inset-x-0  md:w-69 lg:w-69 xl:w-80 mx-auto px-2">
                <div class="rounded-lg border bg-white border-gray-700 px-4 py-10 shadow-2xl">
                  <!--////////////////////////////////////////////////////////////////////
                  ////                        BOTONES MODAL AGREGAR COMP             ////
                  ////////////////////////////////////////////////////////////////////-->
                    <multiselect
                        @select="update_componente"
                        @open="UnClick,scrollBool = false"
                        @close="scrollBool = true"
                        v-model="updtComp"
                        :options="listaComponentes"
                        :multiple="false"
                        group-values="secundarios"
                        group-label="componentePrincipal"
                        :close-on-select="true"
                        :group-select="false"
                        placeholder="Componente"
                        track-by="name"
                        class="w-full"
                        label="description"
                        ><span slot="noResult"
                          >Oops! No elements found. Consider changing the search
                          query.</span
                        >
                      </multiselect>
                      <br>
                      <multiselect
                        v-model="laneSelect"
                        @open="scrollBool = false"                        
                        @close="scrollBool = true"
                        :close-on-select="false"
                        :clear-on-select="true"
                        :hideSelected="false"
                        placeholder="Carril/Cuepro"
                        :options="listLane"
                        :multiple="true"
                      >
                        <template v-if="updtComp != 'Servidor de Video' && updtComp != 'Servidor de Plaza'" slot="selection" slot-scope="{ values, isOpen }">
                          <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Carriles</span>
                        </template>
                      </multiselect>
                      
                    <div class="justify-center flex mt-5">
                        <button  
                        v-on:click.stop.prevent="agregarPartida()"
                        class="botonIconCrear m-6">Agregar</button>
                        <button @click="botoncancelar_modal" class="botonIconCancelar m-6">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    <TablaEquipoPropuesto :listaEquipo="arrayPartidas"></TablaEquipoPropuesto>
  </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import TablaEquipoPropuesto from "../DTC/TablaEquipoPropuesto.vue";
import Service from "../../services/EquipoMaloService.js";
import moment from "moment";
export default {
  name: "TablaEquipoMalo",
  components: {
    Multiselect,
    TablaEquipoPropuesto,
  },
  data() {
    return {
      showModal: false,
      datosPrePartida: {
        rowPartida: [],
        rowUnidad: [],
        rowName: "",
        rowCantidad: 0,
        rowMarca: [],
        rowModelo: [],
        rowNumSerie: [],
        rowUbicacion: [],
        rowDateInstalacion: [],
        rowDateMantenimiento: [],
        rowFolioMantenimiento: [],
        rowDateReal: [],
        rowDateFabricante: [],
        rowPrecio: [],
        rowUp: true,
      },
      arrayPartidas: [],
      //nombre del Compoente    
      updtComp: "",     
      scrollBool: true,
      statusMetro: false,
      cantidadMetro: 0,
      //Multiselect Normal
      listLane: [],
      laneSelect: [],
      //datos para editar Componente
      saveObjectEdiar: [],
      objectEditar: {},
      updtCompEditar: "",
      listLaneEditar: [],
      laneSelectEditar: [],
      //Modal atributos
      modal: false,
      objectModal: {},
      pruebasMultiselect: [],
      //Cambios Inserte RelationShip
      relationShipPrincipal: "",
    };
  },
/////////////////////////////////////////////////////////////////////
////                          PROPS                              ////
/////////////////////////////////////////////////////////////////////
props: {
  listaComponentes: {
      type: Array,
      default: () => [],
  },
  dateSinester: {
      type: String,
      required: true,
      default: "",
  },
},
//////////////////////////////////////////////////////////////////////
////                    CICLOS DE VIDA                            ////
/////////////////////////////////////////////////////////////////////
beforeMount: async function () {
    try {
      let componetesEdit = await this.$store.state.DTC.componetesEdit
      if (JSON.stringify(componetesEdit) != "{}") {  
        console.log(componetesEdit)              
        for (const item of componetesEdit.items) { 
          let newObject = await this.$store.getters["Header/GET_CONVENIO_PLAZA"];          
          newObject["attachedId"] = item.attachedId;
          newObject["componentsRelationship"] = item.relationship;
          newObject["componentsRelationshipId"] = item.mainRelationship;                    
          await this.$store.dispatch("Refacciones/buscarComponenteId",newObject);
          let equipoValid = await this.$store.getters["Refacciones/GET_REFACCIONES_VALIDAS"];          
          let array_ubicacion = [];
          let array_carril = [];
          let array_cantidad = [];
          componetesEdit.serialNumbers.map((lane) => {
            if (item.item == lane.item) {
              array_ubicacion.push(lane.tableFolio);
              array_carril.push(lane.lane);
              array_cantidad.push(lane.amount)
            }
          });              
          let cantidad = array_cantidad.every(ammont => ammont == 0) == true
          ? array_cantidad.length
          : parseInt(array_cantidad[0])          
          setTimeout(async () => {          
          //AGREGAMOS PARTIDA AL STORE                    
          let objPartida = Service.obj_partida(
            array_ubicacion,
            equipoValid,
            this.dateSinester,
            item.mainRelationship,
            true,
            cantidad
          );
          await this.$store.commit("DTC/NUEVO_ITEM_DTC_DAÑADO_MUTATION", objPartida);
          //COMPLETAMOS ATRIBUTOS QUE FALTAN
          let key_partidas = [
            "row1",
            "row2",
            "row3",
            "row4",
            "row5",
            "row6",
            "row7",
            "row8",
            "row9",
            "row10",
            "row11",
            "row12",
            "row13",
            "row14",
            "rowUp",
          ];          
          let new_partida = Service.lane_select(
            array_ubicacion,
            key_partidas,
            equipoValid,
            this.dateSinester,
            item.mainRelationship,
            true,
            cantidad            
          );                   
          new_partida["row1"] = this.arrayPartidas.length + 1;
          new_partida["row3"] = {
            description: item.name,
            attachedId: item.attachedId,
            componentsRelationship: item.relationship,
            componentsRelationshipId: item.mainRelationship,
            vitalComponent: item.vitalComponent,
          };
          new_partida["row8"] = array_carril;
          this.arrayPartidas.push(new_partida);
          }, 2000)
        }
      }
    } catch (ex) {
      console.log(ex);      
    }
},
destroyed: function () {
    this.arrayPartidas = [];
    this.$store.commit("DTC/LIMPIAR_LISTA_DTC_DAÑADO_MUTATION");
    this.$store.commit("DTC/insertDmgCompleteMutation", false);
    this.$store.commit("Header/insertHeaderCompleteMutation", false);
    this.$store.dispatch("Header/BUSCAR_LISTA_UNIQUE");
    this.$store.commit("Header/clearDatosSinesterMutation");
    this.$store.commit("DTC/COMPONENTES_EDIT", {});
    this.$store.commit("Header/DIAGNOSTICO_MUTATION", "");
},
/////////////////////////////////////////////////////////////////////
////                          METODOS                            ////
/////////////////////////////////////////////////////////////////////
methods: {
  UnClick() { this.updtComp = "" },
  modalAgregarComp: function (){
        this.showModal = true       
},  
  botoncancelar_modal: function (){
    this.showModal = false
    this.laneSelect = ''
    this.updtComp = ''
},  
  update_componente: async function (value) {
      for (const propiedades in this.datosPrePartida) {
        this.datosPrePartida[propiedades] = [];
      }
      this.listLane = [];
      this.laneSelect = [];
      let comp = {}
      let componenteValido = false
      for(let componente of this.arrayPartidas){
        if(componente["row3"].description == value.description && componente["row3"].componentsRelationship == value.componentsRelationship){
          comp = componente
        }
      }      
      if(JSON.stringify(comp) == '{}')
        componenteValido = true
      else{
        if(comp["row2"] == 'METRO')
          componenteValido = true
        else
          componenteValido = false
      }        
      this.statusMetro = false
      this.cantidadMetro = 0      
      if (componenteValido) {
        let newObject = await this.$store.getters["Header/GET_CONVENIO_PLAZA"];        
        newObject["attachedId"] = this.updtComp.attachedId;
        newObject["componentsRelationship"] = this.updtComp.componentsRelationship;
        newObject["componentsRelationshipId"] = this.updtComp.componentsRelationshipId;
        await this.$store.dispatch("Refacciones/buscarComponenteId", newObject);
        this.listLane = await this.$store.state.Refacciones.listaLane
        this.relationShipPrincipal = this.updtComp.componentsRelationshipId;
        //Validacion para lista lane
        if (this.listLane.length == 0) {
          this.$notify.warning({
            title: "Ups!",
            msg: `EL COMPONENTE NO ESTA INSTALADO.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        }
      } else {        
        this.$notify.warning({
          title: "Ups!",
          msg: `EL COMPONENTE ESTA REPETIDO.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
        this.updtComp = '';        
      }
  },
  UpdateCompEditado: async function () {
      let comp_rep = this.arrayPartidas.some((item) => {
        return (
          item["row3"].description == this.updtCompEditar.description &&
          item["row3"].componentsRelationship ==
            this.updtCompEditar.componentsRelationship
        );
      });
      if (!comp_rep) {
        this.laneSelectEditar = [];
        this.listLaneEditar = [];
        let newObject = await this.$store.getters["Header/GET_CONVENIO_PLAZA"];
        newObject["id"] = this.updtCompEditar;
        await this.$store.dispatch("Refacciones/buscarComponenteId", newObject);
        this.listLaneEditar = await this.$store.state.Refacciones.listaLane
        this.relationShipPrincipal = this.updtComp.componentsRelationshipId;
        //Validacion para lista lane
        if (this.listLane.length == 0) {
          this.$notify.warning({
            title: "Ups!",
            msg: `El componente no esta en carril.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        }
      } else if (
        this.updtCompEditar.description ==
          this.saveObjectEdiar[2].description &&
        this.updtCompEditar.brand == this.saveObjectEdiar[2].brand
      ) {
        this.updtCompEditar = "";
        this.laneSelectEditar = [];
        this.listLaneEditar = [];
        for (const propiedades in this.objectEditar) {
          this.objectEditar[propiedades] = [];
        }
        this.$notify.warning({
          title: "Ups!",
          msg: `ESTAS EDITANDO EL COMPONENTE.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      } else {
        this.laneSelectEditar = [];
        for (const propiedades in this.objectEditar) {
          this.objectEditar[propiedades] = [];
        }
        this.$notify.warning({
          title: "Ups!",
          msg: `EL COMPONENTE ESTA REPETIDO.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
  },
  deleteItem: function (index) {
      this.arrayPartidas.splice(index, 1);
      for (let i = 0; i < this.arrayPartidas.length; i++) {
        this.arrayPartidas[i]["row1"] = i + 1;
      }
      this.$store.commit("DTC/ELIMINAR_ITEM_DTC_DAÑADO_MUTATION", index);
  },
  updateRowTable: async function (index, datos) {
      if (this.saveObjectEdiar.length == 0) {
        this.saveObjectEdiar = Object.values(datos);
        this.updtCompEditar = this.saveObjectEdiar[2];
        let newObject = await this.$store.getters["Header/GET_CONVENIO_PLAZA"];
        newObject["id"] = this.updtCompEditar;
        await this.$store.dispatch("Refacciones/buscarComponenteId", newObject);
        this.listLaneEditar = await this.$store.state.Refacciones.listaLane                  
        this.laneSelectEditar = this.saveObjectEdiar[7];
        this.arrayPartidas[index]["rowUp"] = false;
      } else {
        this.$notify.warning({
          title: "Ups!",
          msg: `YA SE ESTA EDITANDO UN COMPONENTE.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
  },
  confirmRowTable: async function (index) {
      if (this.updtCompEditar != "") {
        if (this.laneSelectEditar.length > 0) {
          let equipoValid = await this.$store.getters["Refacciones/GET_REFACCIONES_VALIDAS"];
          //AGREGAMOS PARTIDA AL STORE
          let objPartida = Service.obj_partida(this.laneSelectEditar,equipoValid,this.dateSinester);
          let objMutation = {
            index: index,
            value: objPartida,
          };
          this.$store.commit("DTC/ACTUALIZAR_ITEM_DTC_DAÑAD", objMutation);
          //COMPLETAMOS ATRIBUTOS QUE FALTAN
          let key_partidas = [
            "row1",
            "row2",
            "row3",
            "row4",
            "row5",
            "row6",
            "row7",
            "row8",
            "row9",
            "row10",
            "row11",
            "row12",
            "row13",
            "row14",
            "rowUp",
          ];
          let new_partida = Service.lane_select(
            this.laneSelectEditar,
            key_partidas,
            equipoValid,
            this.dateSinester
          );
          new_partida["row1"] = index + 1;
          new_partida["row2"] = this.objectEditar.rowUpd2;
          new_partida["row3"] = this.updtCompEditar;
          new_partida["row8"] = this.laneSelectEditar;
          this.arrayPartidas.splice(index, 1, new_partida);
          this.objectEditar = {};
          this.saveObjectEdiar = [];
          this.laneSelectEditar = [];
          this.updtCompEditar = "";
          this.listLaneEditar = [""];
        } else {
          this.$notify.warning({
            title: "Ups!",
            msg: `FALTA AGREGAR LA UBICACION.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        }
      } else {
        this.$notify.warning({
          title: "Ups!",
          msg: `FALTA AGREGAR UN COMPONENTE.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
  },
  abortUpdateRowTable: function (index) {
      let lanes = this.saveObjectEdiar[7];
      let key_abort = [
        "row1",
        "row2",
        "row3",
        "row4",
        "row5",
        "row6",
        "row7",
        "row8",
        "row9",
        "row10",
        "row11",
        "row12",
        "row13",
        "row14",
        "rowUp",
      ];
      let newObject = this.$store.getters["Header/GET_CONVENIO_PLAZA"];
      newObject["id"] = this.saveObjectEdiar[2];
      this.$store.dispatch("Refacciones/buscarComponenteId", newObject);
      let equipoValid = this.$store.getters["Refacciones/GET_REFACCIONES_VALIDAS"];
      let obj_abort = Service.lane_select(
        lanes,
        key_abort,
        equipoValid,
        this.dateSinester
      );
      obj_abort["row3"] = this.saveObjectEdiar[2];
      obj_abort["row8"] = this.saveObjectEdiar[7];
      this.arrayPartidas[index] = obj_abort;
      this.saveObjectEdiar = [];
      this.objectEditar = {};
      this.listLaneEditar = [""];
      this.updtCompEditar = "";
      this.laneSelectEditar = [];
  },
  agregarPartida: async function () {
      if (this.updtComp != "") {
        if (this.laneSelect.length > 0) {
          let equipoValid = await this.$store.getters["Refacciones/GET_REFACCIONES_VALIDAS"];
          //AGREGAMOS PARTIDA AL STORE
          let objPartida = Service.obj_partida(
            this.laneSelect,
            equipoValid,
            this.dateSinester,
            this.relationShipPrincipal,
            null,
            this.statusMetro == true ? this.cantidadMetro : 0
          );
          this.$store.commit("DTC/NUEVO_ITEM_DTC_DAÑADO_MUTATION", objPartida);
          //COMPLETAMOS ATRIBUTOS QUE FALTAN
          let key_partidas = [
            "row1",
            "row2",
            "row3",
            "row4",
            "row5",
            "row6",
            "row7",
            "row8",
            "row9",
            "row10",
            "row11",
            "row12",
            "row13",
            "row14",
            "rowUp",
          ];
          let new_partida = Service.lane_select(
            this.laneSelect,
            key_partidas,
            equipoValid,
            this.dateSinester,
            this.relationShipPrincipal,
            null,
            this.statusMetro == true ? this.cantidadMetro : this.laneSelect.length
          );
          new_partida["row1"] = this.arrayPartidas.length + 1;
          new_partida["row3"] = this.updtComp;
          new_partida["row8"] = this.laneSelect;          
          this.arrayPartidas.push(new_partida);
          //LIMPIA LA LISTA PRE_PARTIDA
          for (const propiedades in this.datosPrePartida) {
            if (propiedades == "rowCantidad")
              this.datosPrePartida[propiedades] = 0;
            else this.datosPrePartida[propiedades] = [];
          }
          //LIMPIAMOS COMPONENTE Y LANE
          this.updtComp = "";
          this.laneSelect = [];
          this.listLane = [];  
          this.statusMetro = false
          this.showModal= false        
        } else {
          this.$notify.warning({
            title: "Ups!",
            msg: `FALTA AGREGAR LA UBICACION.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        }
      } else {
        this.$notify.warning({
          title: "Ups!",
          msg: `FALTA AGREGAR UN COMPONENTE.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
  },
  infoModal: function (value) {
      this.modal = true;
      this.objectModal = Object.assign(this.arrayPartidas[value]);
  },
},
/////////////////////////////////////////////////////////////////////
////                     OBSERVADORES                            ////
/////////////////////////////////////////////////////////////////////
watch: {
  laneSelect: async function (newValue) {
      //Limpiar los datos pre partida
      for (const propiedades in this.datosPrePartida) {
        if (propiedades == "rowCantidad") this.datosPrePartida[propiedades] = 0;
        else this.datosPrePartida[propiedades] = [];
      }      
      if (newValue.length > 0) {
        let equipoValid = await this.$store.getters["Refacciones/GET_REFACCIONES_VALIDAS"];
        this.datosPrePartida = Service.lane_select(
          newValue,
          this.datosPrePartida,
          equipoValid,
          this.dateSinester,
          this.relationShipPrincipal,
          undefined, 
          newValue.length         
        );
        if(this.datosPrePartida.rowUnidad == 'METRO'){
          this.statusMetro = true
        }
      }
  },
  laneSelectEditar: async function (newValue) {
      for (const propiedades in this.objectEditar) {
        if (propiedades == "rowUpd4") this.objectEditar[propiedades] = 0;
        else this.objectEditar[propiedades] = [];
      }
      if (newValue.length > 0) {
        let key_updt = [
          "rowUpd1",
          "rowUpd2",
          "rowUpd3",
          "rowUpd4",
          "rowUpd5",
          "rowUpd6",
          "rowUpd7",
          "rowUpd8",
          "rowUpd9",
          "rowUpd10",
          "rowUpd11",
          "rowUpd12",
          "rowUpd13",
          "rowUpd14",
          "rowUpd15",
        ];
        let equipoValid = await this.$store.getters["Refacciones/GET_REFACCIONES_VALIDAS"];
        this.objectEditar = await Service.lane_select(
          newValue,
          key_updt,
          equipoValid,
          this.dateSinester,
          this.relationShipPrincipal,
          undefined
        );
        this.listLaneEditar = await this.$store.state.Refacciones.listaLane          

      }
  },
},
/////////////////////////////////////////////////////////////////////
////                          FILTROS                            ////
/////////////////////////////////////////////////////////////////////
filters: {
  formatDate: function (value) {
      return moment(value.substring(0, 10)).format("DD/MM/YYYY");
  },
  formatPlaza: function (value) {
      return value;
  },
},
};
</script>

