<template>
  <div class="h-75" :disabled="modalLoading">    


    <!--Div Global-->
    <div class="flex justify-center">
      <!--Div Cabeza-->
      <div class="flex my-20">
        <div class="mr-50">        
          <font-awesome-icon icon="fa-solid fa-circle-user" class="text-blue-800 h-50 w-50 mr-2"/>
        </div>
        <div class="mr-70">
          <h1 class="text-5xl font-bold text-gray-800 text-center mt-4" v-if="!typeUser">PERFIL</h1>
          <div v-if="typeUser"><HeaderGenerico  @filtrar-usuario="guardar_palabra_busqueda" :titulo="'Usuarios Bitacora'" :tipo="'USUARIO'"></HeaderGenerico></div>  
            <button @click="modalEditar = true" class="w-full botonIconBuscar  justify-center mb-1" v-if="typeUser">
              <!-- <img src="@/assets/img/plus.png" class="mr-2 sm:m-1" width="20" height="20"/> -->
              <font-awesome-icon icon="fa-solid fa-circle-user" class="text-blue-800 h-30 w-30 mr-2"/>
              <span class="">Agregar Nuevo Usuario</span>
            </button>
        </div>
      </div>
      <!--Div Datos-->      
    </div>
    <div>
      <div class="flex justify-center">
        <div class="border-4">
          <span class="font-titulo font-bold">Nombre:</span>
        </div>
      </div>
    </div>






    <div class="flex justify-center p-4" >
      <!--//////////////////////////////////////////////////////////////////
      ////                          CUERPO                            ////
      ////////////////////////////////////////////////////////////////////-->
      <div class="grid gap-2 grid-cols-1">
        <!--//////////////////////////////////////////////////////////////////
        ////                          TITULO                            ////
        ////////////////////////////////////////////////////////////////////-->
        <h1 class="text-4xl font-bold text-gray-800 text-center mb-8" v-if="!typeUser">Mi Perfil</h1>
        <div v-if="typeUser"><HeaderGenerico  @filtrar-usuario="guardar_palabra_busqueda" :titulo="'Usuarios Bitacora'" :tipo="'USUARIO'"></HeaderGenerico></div>  
        <button @click="modalEditar = true" class="w-full botonIconBuscar  justify-center mb-1" v-if="typeUser">
          <!-- <img src="@/assets/img/plus.png" class="mr-2 sm:m-1" width="20" height="20"/> -->
          <font-awesome-icon icon="fa-solid fa-plus" class="text-blue-800 h-7 w-5 mr-2"/>
          <span class="">Agregar Nuevo Usuario</span>
        </button>
        <!--///////////////////////////////////////////////////////////////////
        ////                     TABLA DE USUARIOS                        ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto " style="height:630px;" v-if="this.typeUser">
          <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped ">
            <thead>
              <tr class="text-md sm:text-sm text-gray-400 font-normal bg-blue-800">
                <th class="w-64 cabeceraTable font-medium">Nombre</th>
                <th class="w-56 cabeceraTable font-medium">Tipo de Usuario</th>
                <th class="w-56 cabeceraTable font-medium">Plaza</th>   
                <th class="w-56 cabeceraTable font-medium">Correo</th>                
                <th class="w-48 cabeceraTable font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody id="multiselectHamburguesa">
              <template v-if="listaUsuarios.length == 0 && loadingTabla != true"> 
                <tr>
                    <td class="w-full text-center text-red-500 m-10" colspan="10">                                    
                        <div class="mt-8 mb-8">Sin Informacion</div>
                    </td>
                </tr>  
              </template> 
              <template v-if="loadingTabla">  
                  <tr>
                      <td class="w-full" colspan="10">                                    
                          <div style="border-top-color:transparent" class="mt-8 mb-8 border-solid animate-spin rounded-full border-blue-400 border-2 h-10 w-10 mx-auto"></div>
                      </td>                          
                  </tr>  
              </template>  
              <template v-if="listaUsuarios.length > 0">
                <tr class="h-12 text-gray-900 text-sm sm:text-xs" v-for="(item, key) in listaUsuarios" :key="key">
                <td :class="{'opacity-50':!item.statusUser}" class="cuerpoTable text-center">{{ item.name + " " + item.lastName1 + " " + item.lastName2 }}</td>
                <td :class="{'opacity-50':!item.statusUser}" class="cuerpoTable text-center">{{ item.roll }}</td>
                <td :class="{'opacity-50':!item.statusUser}" class="cuerpoTable text-center">{{ item.plazas }}</td>
                <td :class="{'opacity-50':!item.statusUser}" class="cuerpoTable text-center break-all">{{ item.mail }}</td>
                <td class="cuerpoTable">
                  <multiselect v-model="value" @close="acciones_mapper(item)" placeholder="Seleccione una Accion" label="title" track-by="title" :options="opticones_select_acciones(item)" :option-height="200" :custom-label="customLabel" :show-labels="false">
                    <template slot="singleLabel" slot-scope="props">
                      <div class="inline-flex">
                        <img :src="props.option.img" class="mr-5" width="15" height="15">                                                               
                        <span class="option__title bg-red-300">{{ props.option.title }}</span>
                      </div>
                    </template>
                    <template slot="option" slot-scope="props">                                                
                      <div class="option__desc "><span class="option__title inline-flex">
                        <font-awesome-icon :icon="props.option.img" class="text-blue-800 w-4 h-4 mr-2"/>   
                        {{ props.option.title }}</span>
                      </div>
                    </template>
                  </multiselect>      
                </td>
                </tr>
              </template>
            </tbody>            
          </table>
        </div>    
        <div  v-else >
          <!-- <div class="sticky inset-0" :class="{'modal-container' :modalLoading}">
          <div v-if="modalLoading" class="absolute mx-73 my-65">            
            <img src="@/assets/img/load.gif"  class="h-48 w-48 ml-33" />
          </div>
          </div> -->
          <Spinner :modalLoading="modalLoading"/>
          
          <div class="overflow-x-auto w-auto font-titulo bg-white rounded-lg -mb-66 shadow overflow-y-auto  grid grid-cols-2"   v-for="(item, key) in listaUsuarios" :key="key">
            <div class="border-b-2 my-auto"><p class="font-titulo font-bold">Nombre:</p></div>
            <!-- <div :disabled="modalLoading" class="my-auto"><input type="text" v-model="item.name" :disabled="modalLoading" readonly @change="guardar_editado(item)" class="w-full bg-white border-gray-400 sm:w-33 sm:-ml-4" :class="{'hover:bg-gray-300 hover:border-gray-400 bg-gray-300':modalLoading}"></div> -->
            <div class="border-b-2 my-auto"><p class="text-center font-bold">{{ item.name }}</p></div>
            <div class="border-b-2 my-auto"><p class="font-titulo font-bold">Apellido Paterno:</p></div>
            <div class="border-b-2 my-auto"><p class="text-center font-bold">{{ item.lastName1 }}</p></div>
            <!-- <div :disabled="modalLoading" class="my-auto"><input type="text" v-model="item.lastName1" :disabled="modalLoading" readonly @change="guardar_editado(item)" class="w-full bg-white border-gray-400 sm:w-33 sm:-ml-4" :class="{'hover:bg-gray-300 hover:border-gray-400 bg-gray-300':modalLoading}"></div> -->
            <div class="border-b-2 my-auto"><p class="font-titulo font-bold">Apellido Materno:</p></div>
            <div class="border-b-2 my-auto"><p class="text-center font-bold">{{ item.lastName2 }}</p></div>
            <!-- <div :disabled="modalLoading" class="my-auto"><input type="text" v-model="item.lastName2" :disabled="modalLoading" readonly @change="guardar_editado(item)" class="w-full bg-white border-gray-400 sm:w-33 sm:-ml-4" :class="{'hover:bg-gray-300 hover:border-gray-400 bg-gray-300':modalLoading}"></div> -->
            <div class="border-b-2 my-auto"><p class="font-titulo font-bold">Correo:</p></div>
            <div class="border-b-2 my-auto"><p class="text-center font-bold">{{ item.mail }}</p></div>
            <div class="border-b-2 my-auto"><p class="font-titulo font-bold">Roll de Usuario:</p></div>
            <div class="border-b-2 my-auto"><p class="text-center font-bold">{{ item.roll }}</p></div>
            <div class="border-b-2 my-auto"><p class="font-titulo font-bold">Plazas:</p></div>
            <div class="border-b-2 my-auto"><p class="text-center font-bold">{{ item.plazas }}</p></div>
            <!-- <div class="col-span-2 grid-cols-2 mx-auto my-auto">
              <button class="botonIconSave m-1" :disabled="modalLoading" @click="save_editado(item)" :class="{'deshabilitado':modalLoading}">
                <font-awesome-icon icon="fa-solid fa-floppy-disk" class="text-blue-800 mr-2 h-8 w-6"/>
                <span>Guardar</span>
              </button>
              <button class="botonIconBorrarCard m-1" :disabled="modalLoading" @click="cancelar_guardado" :class="{'deshabilitado':modalLoading}">
                <font-awesome-icon icon="fa-solid fa-trash" class="text-red-600 mr-2 h-8 w-6"/>
                <span>Cancelar</span>
              </button>
            </div> -->
            <div></div>
            <!-- <div class="col-span-2 mx-auto my-auto">
              <button @click="modal_password=true" class="botonIconNext mx-32 my-auto" :disabled="modalLoading" :class="{'deshabilitado':modalLoading}">
                <p>Cambiar Contraseña</p>
              </button>
            </div> -->
            <div></div>
          </div>

        </div>        
      </div>
      <!--/////////////////////////////////////////////////////////////////////
      ////               MODAL CAMBIAR CONTRASEÑA                         ////
      ////////////////////////////////////////////////////////////////////-->
      <div class="sticky inset-0 " :class="{'modal-container': modal_password}">
        <div v-if="modal_password" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 sm:w-66 mx-auto my-48 px-12 py-10 shadow-2xl" :class="{'hidden':modalLoading}">
          <div>
            <h1 class="text-4xl font-bold text-gray-800 text-center -mt-6">Cambiar contraseña</h1>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Contraseña Actual:</p>
              <input class="w-full is_valid" type="password" v-model="datos.password" placeholder="Contraseña Actual" name="Contraseña"/>
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Nueva Contraseña:</p>
              <input v-model="User.Password" type="password" class="w-full is_valid" placeholder="Nueva Contraseña" :disabled="enviarPassword"/>
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Confirmar Contraseña:</p>
              <input v-model="User.RePassword" type="password" class="w-full is_valid" placeholder="Confirmar Contraseña" :disabled="enviarPassword"/>
            </div>
            <div class="mx-auto my-6 -mb-8">
              <div class="mx-20 grid grid-cols-2">
                <button class="botonIconSave m-1"  :disabled="modalLoading" @click="cambiar_pass" :class="{'deshabilitado':modalLoading}">
                  <!-- <img src="../assets/img/save.png" class="mr-2 sm:mr-1 sm:ml-1" width="25" height="25"> -->
                  <font-awesome-icon icon="fa-solid fa-floppy-disk" class="text-blue-800 mr-2 h-8 w-6"/>
                  <span>Guardar</span>
                </button>
                <button class="botonIconBorrarCard m-1 grid grid-cols-2" :disabled="modalLoading" @click="modal_password=false, datos.password = '',User.RePassword = '', User.Password = ''" :class="{'deshabilitado':modalLoading}">
                  <!-- <img src="../assets/img/borrar.png" class=" sm:mr-1 sm:ml-1" width="25" height="25"> -->
                  <font-awesome-icon icon="fa-solid fa-trash" class="text-red-600 mr-2 h-8 w-6"/>
                  <span class="-ml-2">Cancelar</span>
                </button>
              </div>
            </div>
          </div>
        </div> 
      </div>
      <!--/////////////////////////////////////////////////////////////////////
      ////                     MODAL AGREGAR USUARIO                      ////
      ////////////////////////////////////////////////////////////////////-->
      <div class="sticky inset-0 " :class="{'modal-container': modalEditar}">
      <div v-if="modalEditar" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 sm:w-66 mx-auto px-12 py-10 shadow-2xl mt-48">
                    <p class="text-gray-900 font-semibold text-md sm:text-md sm:text-center text-center">Agregar Usuario</p>
                    <div class="grid grid-cols-2 mt-2">
                        <p class="text-sm mb-1 font-semibold text-gray-700 sm:-ml-5">Nombre(s)</p>
                        <input v-model="objUsuarioNuevo.nombre" type="text" class="w-full bg-white border-gray-400 sm:w-33 sm:-ml-4">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Apellido Paterno</p>
                        <input v-model="objUsuarioNuevo.apellidoM" type="text" class="w-full bg-white border-gray-400 mt-2 sm:w-33 sm:-ml-4">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Apellido Materno</p>
                        <input v-model="objUsuarioNuevo.apellidoP" type="text" class="w-full bg-white border-gray-400 mt-2 sm:w-33 sm:-ml-4">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Constraseña</p>
                        <input v-model="objUsuarioNuevo.password" type="text" class="w-full bg-white border-gray-400 mt-2 sm:w-33 sm:-ml-4">
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Tipo Usuario</p>
                        <select v-model="objUsuarioNuevo.tipoUsuario" class="w-full mt-2 sm:w-33 sm:-ml-4 is_valid">
                          <option disabled value>Selecionar...</option>     
                          <option v-for="(item, key) in listaTiposUsuario" :key="key">{{ item.nombre }}</option>                                                                         
                        </select>
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Tramo</p>
                        <select v-model="tramoSeleccionado" class="w-full mt-2 sm:w-33 sm:-ml-4 is_valid">
                          <option disabled value>Selecionar...</option>     
                          <option value="1">México Acapulco</option>     
                          <option value="2">México Irapuato</option>     
                          <option value="3">México Queretaro</option>
                        </select>
                        <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Plaza</p>                        
                        <multiselect 
                          v-model="objUsuarioNuevo.plazas"                                                                                                                                                             
                          :custom-label="label_multi_select"                          
                          :close-on-select="false"
                          :clear-on-select="true"
                          :hideSelected="false"
                          placeholder="Selecciona..."
                          :options="listaPlazas"
                          track-by="squareCatalogId"
                          class=" shadow-md hover:border-gray-700 mt-2 sm:w-35 sm:-ml-5"
                          :multiple="true"
                        >   
                          <!-- <template slot="selection" slot-scope="{ values, search, isOpen }"> -->
                          <template slot="selection" slot-scope="{ values, isOpen }">
                            <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Plaza</span>
                          </template>   
                        </multiselect>
                    </div>
                    <div class="mt-5 text-center ml-6">
                        <button @click="guardar_nuevo_usuario" class="botonIconBuscar font-boton sm:-ml-24">Guardar</button>
                        <button @click="modalEditar = false" class="botonIconCancelar font-boton sm:-mr-20">Cancelar</button>
                    </div>
      </div>
      </div>
      <!--/////////////////////////////////////////////////////////////////////
      ////                     MODAL AGREGAR PLAZAS                       ////
      ////////////////////////////////////////////////////////////////////-->
      <div class="sticky inset-0 " :class="{'modal-container': modalAddPlaza}">
        <div v-if="modalAddPlaza" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 sm:w-66 mx-auto px-6 py-10 shadow-2xl mt-48">
          <p class="text-gray-900 font-semibold text-md sm:text-md sm:text-center text-center">Agregar Plazas</p>
          <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Plazas Asignadas</p>
          <p>{{ infoUser.plazas }}</p>
          <div class="grid grid-cols-2 mt-2">
            <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Plazas por Asignar</p>
            <p></p>
            <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Tramo</p>
            <select v-model="tramoSeleccionado" class="w-full mt-2 sm:w-33 sm:-ml-4 is_valid">
              <option disabled value>Selecionar...</option>     
              <option value="1">México Acapulco</option>     
              <option value="2">México Irapuato</option> 
              <option value="3">México Queretaro</option>     
            </select>
            <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Plaza</p>                        
            <multiselect 
                          v-model="obj_editar_plaza.plazas"                                                                                                                                                             
                          :custom-label="label_multi_select"                          
                          :close-on-select="false"
                          :clear-on-select="true"
                          :hideSelected="false"
                          placeholder="Selecciona..."
                          :options="listaPlazas"
                          track-by="squareCatalogId"
                          class=" shadow-md hover:border-gray-700 mt-2 sm:w-35 sm:-ml-5"
                          :multiple="true"
                        >   
                          <!-- <template slot="selection" slot-scope="{ values, search, isOpen }"> -->
                          <template slot="selection" slot-scope="{ values, isOpen }">
                            <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Plaza</span>
                          </template>   
            </multiselect>
          </div>
          <div class="mt-5 text-center ml-6">
            <button @click="agregar_plazas(infoUser)" class="botonIconCrear font-boton sm:-ml-24">Agregar</button>
            <button @click="modalAddPlaza = false" class="botonIconCancelar font-boton sm:-mr-20">Cancelar</button>
          </div>
        </div>
      </div>
      <!--/////////////////////////////////////////////////////////////////////
      ////                    MODAL ELIMINAR PLAZAS                       ////
      ////////////////////////////////////////////////////////////////////-->
      <div class="sticky inset-0 " :class="{'modal-container': modalEliminarPlaza}">
        <div v-if="modalEliminarPlaza" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 sm:w-66 mx-auto px-6 py-10 shadow-2xl mt-48">
          <p class="text-gray-900 font-semibold text-md sm:text-md sm:text-center text-center">Eliminar Plazas a <span>{{ infoUser.name + ' ' + infoUser.lastName1 + ' ' + infoUser.lastName2 }}</span></p>
          <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Plazas Asignadas</p>
          <p>{{ infoUser.plazas }}</p>
          <div class="grid grid-cols-2 mt-2">
            <p class="text-sm mb-1 font-semibold text-gray-700 mt-2 sm:-ml-5">Plaza</p>                        
            <multiselect 
                          v-model="obj_borrar_plaza.plazas"                                                                                                                                                             
                          :custom-label="label_multi_select"                          
                          :close-on-select="false"
                          :clear-on-select="true"
                          :hideSelected="false"
                          placeholder="Selecciona..."
                          :options="plazasUserForDelete"
                          track-by="squareCatalogId"
                          class=" shadow-md hover:border-gray-700 mt-2 sm:w-35 sm:-ml-5"
                          :multiple="true"
                        >   
                          <!-- <template slot="selection" slot-scope="{ values, search, isOpen }"> -->
                          <template slot="selection" slot-scope="{ values, isOpen }">
                            <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Plaza</span>
                          </template>   
            </multiselect>
          </div>
          <div class="mt-5 text-center ml-6">
            <button @click="eliminar_plaza(infoUser)" class="botonIconCrear font-boton sm:-ml-24">Eliminar</button>
            <button @click="modalEliminarPlaza = false" class="botonIconCancelar font-boton sm:-mr-20">Cancelar</button>
          </div>
        </div>
      </div>
      <!--/////////////////////////////////////////////////////////////////////
      ////                     MODAL EDITAR ADMIN                         ////
      ////////////////////////////////////////////////////////////////////-->
      <div class="sticky inset-0" :class="{'modal-container': modal}">
      <div class="flex absolute justify-center inset-x-0 mt-34">
        <div v-if="modal" class="rounded-lg border border-gray-400 bg-white px-12 py-10 shadow-2xl">
          <div class="justify-end flex -mr-10 -mt-6">
            <button @click="limpiar_usuario">
              <!-- <img src="@/assets/img/close.png" class="mr-2" width="25" height="25" /> -->
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-blue-800 h-6 w-6 mr-4"/>
            </button>
          </div>
          <!--/////////////////////////////////////////////////////////////////
          ////                  MODAL PRIMERA PARTE                        ////
          ////////////////////////////////////////////////////////////////////-->
          <div class="mt-3 inset-x-0 bg-white w-66 sm:w-64 mx-auto px-10 py-5" v-if="!modal_Part">
            <div class>
              <p class="text-sm mb-1 font-semibold text-gray-700">Nombre(s)</p>
              <input v-model="User.Name" class="w-full is_valid" type="text" />
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Apellido Materno</p>
              <input v-model="User.LastName1" class="w-full is_valid" type="text" name="NoReporte"/>
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Apellido Paterno</p>
              <input v-model="User.LastName2" class="w-full is_valid" type="text" />
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Correo</p>
              <input v-model="User.Mail" class="w-full is_valid" type="text" />
            </div>
            <div class="mt-8 flex justify-center">
              <button @click="modal_Part = true" class="botonIconNext font-boton">
                <!-- <img src="@/assets/img/rehacer.png" class="mr-2" width="25" height="25"/> -->
                <font-awesome-icon icon="fa-solid fa-right-long" class="text-blue-800 h-5 w-5 mr-2"/>
                <span class="text-xs">Siguiente</span>
              </button>
            </div>
          </div>
          <!--/////////////////////////////////////////////////////////////////
          ////                  MODAL SEGUNDA PARTE                        ////
          ////////////////////////////////////////////////////////////////////-->
          <div class="mt-2 inset-x-0 bg-white w-66 sm:w-64 mx-auto px-10 py-5 -mb-5" v-else>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Tipo de Usuario</p>
              <select v-if="!typeUser" v-model="User.Roll" class="w-full is_valid">
                <option value="1">Tecnico</option>
              </select>
              <select v-else v-model="User.Roll" class="w-full is_valid">
                <option disabled value>Selecionar...</option>
                <option value="1">Técnico Carril</option>
                <option value="2">Supervisor Carril</option>
                <option value="3">Técnico Plaza</option>
                <option value="5">Supervisor Plaza</option>
                <option value="8">Gerencia</option>
              </select>
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Contraseña</p>
              <input v-model="User.Password" class="w-full is_valid" :disabled="enviarPassword"/>
            </div>
            <div class="mt-3">
              <p class="text-sm mb-1 font-semibold text-gray-700">Contraseña</p>
              <input v-model="User.RePassword" class="w-full is_valid" :disabled="enviarPassword"/>
            </div>
            <div class="grid grid-cols-2">  
              <div class="flex justify-center mt-5 mr-10">
                <button @click="modal_Part = false" class="mt-4 botonIconNext font-boton">
                  <!-- <img src="@/assets/img/deshacer.png" class="mr-4" width="25" height="25"/> -->
                  <font-awesome-icon icon="fa-solid fa-arrow-left-long" class="text-blue-800 h-5 mr-4"/>
                  <span class="text-xs">Regresar</span>
                </button>
              </div>
              <div class="flex justify-center mt-5 ml-10">
                <button @click="confirmar" class=" mt-4 botonIconBuscar font-boton">
                  <!-- <img src="@/assets/img/save.png" class="mr-5" width="25" height="25"/> -->
                  <font-awesome-icon icon="fa-solid fa-floppy-disk" class="text-blue-800 h-5 mr-4"/>
                  <span class="text-xs">Guardar</span>
                </button>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import HeaderGenerico from "@/components/Header/HeaderGenerico";
import Spinner from '../components/Sppiner.vue'
import Multiselect from "vue-multiselect";
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
  name: "UsuariosBitacora",
  components: {
    Multiselect,
    HeaderGenerico,
    Spinner
  },
  data: function () {
    return {
      lista_Usuarios: [],
      lista_Usuarios_Filtrada: [],
      listaUsuarios: [],
      User: {
        UserId: "",
        UserName: "",
        Name: "",
        LastName1: "",
        LastName2: "",
        Roll: "",
        Mail: "",
        Password: "",
        RePassword: "",
      },
      modal: false,
      modal_Part: false,
      disablePass: false,
      enviarPassword: false,
      typeUser: true,
      //Metodos Nuevos
      modalEditar: false,
      tramoSeleccionado: '',
      objUsuarioNuevo:{
        nombre: '',
        apellidoM: '',
        apellidoP: '',  
        password: '',      
        tipoUsuario: '',
        plazas: []
      },
      value:'',
      loadingTabla: false,
      editados:[],
      modalLoading:false,
      modal_password:false,
      datos: {
        user: "",
        password: "",
        checkLog: true,
      },
      modalAddPlaza:false,
      infoUser:{},
      obj_editar_plaza:{
        plazas:[]
      },
      obj_borrar_plaza:{
        plazas:[]
      },
      modalEliminarPlaza:false,
      nombreOriginal:''
    };
  },
/////////////////////////////////////////////////////////////////////
////                      CICLOS DE VIDA                         ////
/////////////////////////////////////////////////////////////////////
  beforeMount: async function () {
    this.modalLoading = true
    this.loadingTabla = true 
      this.listaUsuarios = []
      this.lista_Usuarios_Filtrada = []
      let user = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
      let params = { Id: user.idUser, Square: user.numPlaza}
      this.$store.dispatch('Usuarios/Consulta_Users', params)
      setTimeout(() => {
        this.lista_Usuarios = this.$store.getters["Usuarios/getUsers"];   
        this.lista_Usuarios_Filtrada = this.lista_Usuarios
        this.listaUsuarios = this.lista_Usuarios_Filtrada
        this.loadingTabla = false
        this.modalLoading = false
      },1000)    
    if (this.$store.state.Login.cookiesUser.rollId == 1 || this.$store.state.Login.cookiesUser.rollId == 3) {
      this.typeUser = false;
    }
    this.datos.user = this.$store.state.Login.cookiesUser.userName
  },
/////////////////////////////////////////////////////////////////////
////                            METODOS                         ////
///////////////////////////////////////////////////////////////////// 
  methods: { 
    cancelar_guardado: function(){
      this.editados= [];
      this.refrescar_usuarios()
    },
    guardar_editado: function (value) {
      if (this.editados.length == 0)
        this.editados.push(Object.assign({}, value));
      else {
        if (this.editados.some((item) =>item["name"] == value["name"] && item["lastName1"] == value["lastName1"] && item["lastName2"] == value["lastName2"])) {
          for (let i = 0; i < this.editados.length; i++) {
            if (this.editados[i]["name"] == value["name"] && this.editados[i]["lastName1"] == value["lastName1"] && this.editados[i]["lastName2"] == value["lastName2"]) {
              this.editados[i] = Object.assign({}, value);
            }
          }
        } else {
          this.editados.push(Object.assign({}, value));
        }        
      }
    },  
    cambiar_pass: async function (){
      this.$store.dispatch("Login/INICIAR_SESION_LOGIN", this.datos)
      .then(()=>{
        this.modalLoading = true
        if(this.User.Password.length < 8){
          this.$notify.error({
            title: "Ops!!",
            msg: "LA NUEVA CONTRASEÑA ES DEMASIADO CORTA",
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
          this.modalLoading = false
        }else if(this.User.Password == this.User.RePassword){      
          if (this.User.Password == "") {
            this.$notify.error({
              title: "Ops!!",
              msg: "LAS CONTRASEÑAS ESTA VACIO",
              position: "bottom right",
              styles: {
                height: 100,
                width: 500,
              },
            });
          } 
          else {  
            let UpUser = {
              UserId: this.listaUsuarios[0].userId,
              UserName: this.listaUsuarios[0].userName,
              LastName1: this.listaUsuarios[0].lastName1,
              LastName2: this.listaUsuarios[0].lastName2,
              Name: this.listaUsuarios[0].name,
              Mail: this.listaUsuarios[0].mail,
              Rol: this.listaUsuarios[0].rollId,
            };
            this.$store.dispatch("Usuarios/Update_User", UpUser);                    
            let _UpUser = {
              IdUser: this.listaUsuarios[0].userId,
              Password: this.User.Password,
            };          
            if(_UpUser.Password != ""){              
                this.$store.dispatch("Usuarios/UPDATE_PASSWORD", _UpUser);
            }                                                    
            setTimeout(()=>{
                        this.$notify.success({
              title: "Ops!!",
              msg: "SE ACTUALIZO EL USUARIO CORRECTAMENTE.",
              position: "bottom right",
              styles: {
                height: 100,
                width: 500,
              },
            });
              this.$router.push("/");
            },1000)
          } 
        }else{
          this.$notify.error({
            title: "Ops!!",
            msg: "LAS CONTRASEÑAS NO COINCIDEN.",
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        }
      })
      .catch(()=>{
        this.$notify.error({
            title: "Ops!!",
            msg: "LA CONTRASEÑA ACTUAL NO ES CORRECTA",
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
      })
    },
    save_editado: function (item){
      this.modalLoading = true
      if(item.name != '' && item.lastName1 != '' && item.lastName2 != ''){
        let UpUser = {
          UserId: item.userId,
          UserName: item.userName,
          LastName1: item.lastName1,
          LastName2: item.lastName2,
          Name: item.name,
          Mail: item.mail,
          Rol: item.rollId,
          UserChange: this.$store.state.Login.cookiesUser.userId,
        };
        //this.$store.dispatch("Usuarios/Update_User", UpUser);
        this.$http.put(`${API}/User/update`,UpUser)
        .then((response) => {
          console.log(response);
          if(response.data.message == 'Ok')
          {
            setTimeout(()=>{
            this.$notify.success({
            title: "Ops!!",
            msg: "SE ACTUALIZO EL USUARIO CORRECTAMENTE.",
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
            });
            this.modalLoading = false
            this.$router.push("/");
            },5000)
          }else{
            setTimeout(()=>{
              this.$notify.error({
              title: "Ops!!",
              msg: "NO SE PUDO ACTUALIZAR EL USUARIO CORRECTAMENTE.",
              position: "bottom right",
              styles: {
                height: 100,
                width: 500,
              },
              });
              this.modalLoading = false
              this.$router.push("/");
            },5000)
          } 
        })
      }else{
        this.$notify.error({
          title: "Ops!!",
          msg: "NINGUN CAMPO DEBE DE ESTAR VACÍO",
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
    },
    editar_password: function () {      
      if (this.enviarPassword) {
        this.enviarPassword = false;
        this.User.Password = "***********";
        this.User.RePassword = "***********";
      } 
      else {
        this.enviarPassword = true;
        this.User.Password = "";
        this.User.RePassword = "";
      }
    },
    refrescar_usuarios: function(){
      this.loadingTabla = true 
      this.listaUsuarios = []
      this.lista_Usuarios_Filtrada = []
      let user = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
      let params = { Id: user.idUser, Square: user.numPlaza}
      this.$store.dispatch('Usuarios/Consulta_Users', params)
      setTimeout(() => {
        this.lista_Usuarios = this.$store.getters["Usuarios/getUsers"];   
        this.lista_Usuarios_Filtrada = this.lista_Usuarios
        this.listaUsuarios = this.lista_Usuarios_Filtrada
        this.loadingTabla = false
      },1000)
    },
    borrar_usuario(item) {
      let User = { id: item.userId, square: ""};
      this.$store.dispatch("Usuarios/BorrarUser", User);
      this.refrescar_usuarios()
      this.$notify.success({
        title: "Ok!",
        msg: `USUARIO DESHABILITADO`,
        position: "bottom right",
        styles: { height: 100, width: 500 },
      });
      this.$router.push("/Configuracion");
    },  
    guardar_nuevo_usuario(){            
      let tipoUsuario = this.listaTiposUsuario.find(item => item.nombre == this.objUsuarioNuevo.tipoUsuario).id
      this.objUsuarioNuevo.plazas      
      let objInsert = {
        name: this.objUsuarioNuevo.nombre,
        lastName1: this.objUsuarioNuevo.apellidoM,
        lastName2: this.objUsuarioNuevo.apellidoP,
        password: this.objUsuarioNuevo.password,
        rol: tipoUsuario,
      }                  
      this.$http.post(`${API}/User/Nuevo`,objInsert)
      .then((response) => {      
          this.$notify.success({
              title: "Ops!!",
              msg: "SE REGISTRO EL USUARIO NUEVO  .",
              position: "bottom right",
              styles: {
                height: 100,
                width: 500,
              }
          })                        
          //userNuevoId = response.data.result.userId
          this.objUsuarioNuevo.plazas.forEach(plaza => {
            let plazaInsert = {
              userId: response.data.result.userId,
              squareCatalogId: plaza.squareCatalogId,
              clavePlaza: plaza.referenceSquare
            }
            this.$http.post(`${API}/User/AddSquareToUser`,plazaInsert)                        
          })
          setTimeout(() => {                  
                this.$notify.success({
                  title: "Ops!!",
                  msg: "SE ACTIVO CORRECTAMENTE EL USUARIO.",
                  position: "bottom right",
                  styles: {
                    height: 100,
                    width: 500,
                  },
                })
                this.modalEditar = false                
                this.refrescar_usuarios()                            
          },1000)
        })        
    }, 
    limpiar_usuario() {
      for (let prop in this.User) {
        this.User[prop] = "";
      }
      this.modal = false;
      this.modal_Part = false;
      this.disablePass = false;
      if (this.enviarPassword) {
        this.enviarPassword = false;
        this.User.Password = "***********";
        this.User.RePassword = "***********";
      }
    },
    editarUsuario: function (item) {      
      this.disablePass = true;
      this.User.UserId = item.userId;
      this.User.UserName = item.userName;
      this.User.Name = item.name;
      this.User.LastName1 = item.lastName1;
      this.User.LastName2 = item.lastName2;
      this.User.Roll = item.rollId;
      this.User.Mail = item.mail;
      this.User.Password = "***********";
      this.User.RePassword = "***********";
      this.modal = true;
    },
    confirmar: function () {
      if (this.User.Password == this.User.RePassword) {      
        if (this.User.Password == "") {
          this.$notify.error({
            title: "Ops!!",
            msg: "LAS CONTRASEÑAS ESTA VACIO",
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        } 
        else {  
          let UpUser = {
            UserId: this.User.UserId,
            UserName: this.User.UserName,
            LastName1: this.User.LastName1,
            LastName2: this.User.LastName2,
            Name: this.User.Name,
            Mail: this.User.Mail,
            Rol: this.User.Roll,
            UserChange: this.$store.state.Login.cookiesUser.userId,
          };
          /* this.$store.dispatch("Usuarios/Update_User", UpUser); */
          this.$http.put(`${API}/User/update`,UpUser)
            .then((response) => {
              if(response.status == 200){                                                    
                this.$notify.success({
                  title: "Ops!!",
                  msg: "SE ACTUALIZO EL USUARIO CORRECTAMENTE.",
                  position: "bottom right",
                  styles: {
                    height: 100,
                    width: 500,
                  },
                });
                this.refrescar_usuarios()  
                this.modal = false;
              }
            })
            let _UpUser = {
              IdUser: this.User.UserId,
              Password: this.User.Password,
            };          
            if(_UpUser.Password != "***********"){              
                this.$store.dispatch("Usuarios/UPDATE_PASSWORD", _UpUser);
            } 
          /*let _UpUser = {
            IdUser: this.User.UserId,
            Password: this.User.Password,
          };          
          if(_UpUser.Password != "***********"){              
              this.$store.dispatch("Usuarios/UPDATE_PASSWORD", _UpUser);
          }                                                    
          this.$notify.success({
            title: "Ops!!",
            msg: "SE ACTUALIZO EL USUARIO CORRECTAMENTE.",
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
          location.reload();
          this.refrescar_usuarios()  
          this.modal = false;*/
        }
        this.limpiar_usuario();      
      } 
      else {
        this.$notify.error({
          title: "Ops!!",
          msg: "LAS CONTRASEÑAS NO COINCIDEN.",
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
    },
    label_multi_select(value){          
      if(value != 'Sin Actividad')
        return `${value.squareCatalogId} ${value.squareName}`  
    },
    guardar_palabra_busqueda: function(newPalabra){      
      if (newPalabra != "") {
        let array_filtrado = this.lista_Usuarios_Filtrada.filter(item => {
          return item.name.toUpperCase().includes(newPalabra.toUpperCase()) || item.lastName1.toUpperCase().includes(newPalabra.toUpperCase()) || item.lastName2.toUpperCase().includes(newPalabra.toUpperCase())
        })       
        this.listaUsuarios = array_filtrado;
      }
      else{
        this.listaUsuarios = this.lista_Usuarios
      }
    },
    habilitar_usuario: function (item){
      let User = { id: item.userId, plaza: '001'}
      this.$http.put(`${API}/User/active`, User)
      this.refrescar_usuarios()
      this.$notify.success({
        title: "Ok!",
        msg: `USUARIO HABILITADO`,
        position: "bottom right",
        styles: { height: 100, width: 500 },
      });
      this.$router.push("/Configuracion");
    },
    agregar_plazas(item){
      let arrayPlaza = [] 
      this.obj_editar_plaza.plazas.forEach((plaza) => {
        arrayPlaza.push(plaza.squareCatalogId)
      })
      let plazaInsert = {
          squareId: arrayPlaza,
          userId: item.userId,
          flag: 1
        }
      this.$http.post(`${API}/User/SquareOfUserUpdate/${arrayPlaza}`,plazaInsert)                        
      setTimeout(() => {                  
        this.$notify.success({
          title: "Ops!!",
          msg: "SE AGREGARON LAS PLAZAS CORRECTAMENTE.",
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        })
        this.modalAddPlaza = false  
        this.tramoSeleccionado = ''  
        this.obj_editar_plaza = []            
        this.refrescar_usuarios()                            
      },1000)
    },
    eliminar_plaza(item){
      let arrayPlaza = [] 
      this.obj_borrar_plaza.plazas.forEach((plaza) => {
        arrayPlaza.push(plaza.squareCatalogId)
      })
      let plazaDelete = {
          squareId: arrayPlaza,
          userId: item.userId,
          flag: 0
        }
        this.$http.post(`${API}/User/SquareOfUserUpdate/${arrayPlaza}`,plazaDelete)       
      setTimeout(() => {                  
        this.$notify.success({
          title: "Ops!!",
          msg: "SE ELIMINARON LAS PLAZAS CORRECTAMENTE.",
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        })
        this.modalEliminarPlaza = false                
        this.obj_borrar_plaza = []
        this.refrescar_usuarios()                            
      },1000)
    },
    customLabel ({ title }) {
      return `${title}`
    },
    acciones_mapper(item){                
      if(this.value.title == 'Editar'){
        this.editarUsuario(item)
      }if(this.value.title == 'Deshabilitar'){
        this.borrar_usuario(item)
      }if(this.value.title == 'Habilitar'){
        this.habilitar_usuario(item)
      }if(this.value.title == 'Agregar Plaza'){
        this.infoUser = item
        this.modalAddPlaza = true
      }if(this.value.title == 'Eliminar Plaza'){
        this.plazasUserForDelete = item.plazasLimpias
        this.infoUser = item
        this.modalEliminarPlaza = true
      }
      this.value = ""  
    },
    opticones_select_acciones(item){
      const options= [                
        { title: 'Editar', img: 'fa-solid fa-pen-to-square' }, //0
        { title: 'Deshabilitar', img: 'fa-solid fa-user-lock' },//1
        { title: 'Habilitar', img: 'fa-solid fa-user-check' },//2
        { title: 'Agregar Plaza', img: 'fa-solid fa-square-plus' },//3
        { title: 'Eliminar Plaza', img: 'fa-solid fa-square-minus' },//4
      ]
      let filtroOpciones = []
      filtroOpciones.push(options[0])
      if(this.typeUser && item.statusUser){
        filtroOpciones.push(options[1])
        if(item.plazas != 'TODAS')   
          filtroOpciones.push(options[3])
      }
      if(this.typeUser && !item.statusUser){
        filtroOpciones.push(options[2])
      }       
      filtroOpciones.push(options[4])
      return filtroOpciones
    }
  },
  computed: {
    listaTiposUsuario(){
      return this.$store.state.Login.tipoUsuario
    },
    listaPlazas(){            
      return this.$store.state.Login.listaPlazas.filter(plaza => plaza.delegationId == this.tramoSeleccionado)
    }
  }
};
</script>
<style>
.modal-container{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
</style>