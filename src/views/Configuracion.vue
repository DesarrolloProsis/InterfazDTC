<template>
  <div>
      <Nav></Nav>
     
      <div class="flex justify-center">                     
            <div class="mt-5">
                <h1 class=" text-4xl font-medium text-gray-800 text-center">Lista de Usuarios</h1>
                <div class="mt-5 mb-5 flex justify-between">
               <div class="inline-flex mt-2">
                   <button   
                       @click="modal = true"                                      
                       class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700 mr-3"
                   >
                       <img src="../assets/img/more.png" class="mr-2" width="25" height="25" />
                       <span class=" text-xs">Agregar Usuario</span>
                   </button>                           
               </div> 
               <div>
                                 
               </div>     
            </div> 
                <table class="border-2 border-gray-800">
                    <tr class=" text-md text-gray-400 font-normal bg-blue-800">                    
                        <th class="w-64 border-2 border-gray-800">Nombre</th> 
                        <th class="w-56 border-2 border-gray-800">Tipo de Usuario</th>      
                        <th class="w-56 border-2 border-gray-800">Correo</th>                 
                        <th class="w-56 border-2 border-gray-800">Acciones</th> 
                    </tr>               
                    <tr class=" h-12 text-gray-900 text-sm" v-for="(item, key) in lista_Usuarios" :key="key">                          
                        <td class="text-center border-2 border-gray-800">{{ item.name }}</td>                            
                        <td class="text-center border-2 border-gray-800">{{ item.tipo }}</td>
                        <td class="text-center border-2 border-gray-800">{{ item.mail }}</td>
                        <td class="text-center border-2 border-gray-800">
                        <button   
                           @click="editarUsuario(item)"                 
                           class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded inline-flex items-center border-2 border-yellow-500 mr-3"
                       >
                           <img src="../assets/img/pencil.png" class="mr-2" width="15" height="15" />
                           <span class=" text-xs">Editar</span>
                       </button>
                         <button   
                           @click="Mostrar_Mas(item)"                 
                           class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-red-700"
                       >
                           <img src="../assets/img/bin.png" class="mr-2" width="15" height="15" />
                           <span class=" text-xs">Borrar</span>
                       </button>
                    </td>
              </tr>
            </table>
        </div>
        <div class="flex absolute justify-center inset-x-0 mt-24">
            <div v-if="modal" class="rounded-lg border border-gray-700 bg-white px-12 py-10 shadow-2xl"> 
                <div class=" justify-end flex"> 
                    <button @click="modal = false, modal_Part = false">X</button>                   
                </div>
                <div class="mt-3" v-if="!modal_Part">  
                    <div class="">   
                        <p class="text-sm mb-1 font-semibold text-gray-700">Nombre(s)</p>
                        <input    
                            v-model="newUSer.Name"                        
                            class="w-full"
                            type="text"  
                            name="NoReporte"                         
                        />                       
                    </div>   
                    <div class="mt-3">   
                        <p class="text-sm mb-1 font-semibold text-gray-700">Apellido Materno</p>
                        <input      
                            v-model="newUSer.LastName1"                       
                            class="w-full"
                            type="text"  
                            name="NoReporte"                         
                        />                       
                    </div> 
                    <div class="mt-3">   
                        <p class="text-sm mb-1 font-semibold text-gray-700">Apellido Paterno</p>
                        <input   
                            v-model="newUSer.LastName2"                                                
                            class="w-full"
                            type="text"  
                            name="NoReporte"                         
                        />                       
                    </div> 
                    <div class="mt-3">   
                        <p class="text-sm mb-1 font-semibold text-gray-700">Tipo de Usuario</p>
                        <select    
                            v-model="newUSer.Roll"                  
                            class="w-full"                                                
                        >    
                        <option disabled value="">Selecionar...</option>                   
                        <option value="1">Administrador</option>
                        <option value="2">Tecnico</option>
                        </select>
                    </div>   
                    <div class="mt-8 flex justify-center">                           
                        <button @click="modal_Part = true" class="text-white mb-5 px-4 py-2 rounded-lg bg-blue-800 w-32">Siguiente</button>                       
                    </div>                                      
                </div>
                  <div class="mt-2" v-else>  
                   
                    <div class="mt-3">   
                        <p class="text-sm mb-1 font-semibold text-gray-700">Correo</p>
                        <input  
                            v-model="newUSer.Mail"                             
                            class="w-full"
                            type="text"  
                            name="NoReporte"                         
                        />                       
                    </div> 
                    <div class="mt-3">   
                        <p class="text-sm mb-1 font-semibold text-gray-700">Contraseña</p>
                        <input                            
                            class="w-full"
                            type="password"  
                            name="NoReporte"                         
                        />                       
                    </div>  
                    <div class="mt-3">   
                        <p class="text-sm mb-1 font-semibold text-gray-700">Contraseña</p>
                        <input                            
                            class="w-full"
                            type="password"  
                            name="NoReporte"                         
                        />                       
                    </div>                    
                    <div class="mt-8 flex justify-center">   
                            <button @click="agregarUsuario" class="text-white mb-5 px-4 py-2 rounded-lg bg-green-700 w-32">Crear Usuario</button>                             
                        </div>                                      
                        <div class="mt-1 flex justify-center">
                            <button @click="modal_Part = false" class="text-white px-4 py-2 rounded-lg bg-blue-800 w-32">Regresar</button>                                                  
                        </div>                    
                </div>
            </div>
      </div>
      </div>
  </div>
</template>

<script>

import Nav from '../components/Navbar'

export default {

    data: function(){

        return{

            lista_Usuarios: [

                {'name': 'Jose Alberto Zarate', 'tipo': 'Tecnico', 'mail': 'geoffreyytorres25@gmail.com'},
                {'name': 'Jose Alberto Zarate', 'tipo': 'Tecnico', 'mail': 'geoffreyytorres25@gmail.com'},
                {'name': 'Jose Alberto Zarate', 'tipo': 'Tecnico', 'mail': 'geoffreyytorres25@gmail.com'},
                {'name': 'Jose Alberto Zarate', 'tipo': 'Tecnico', 'mail': 'geoffreyytorres25@gmail.com'},
                {'name': 'Jose Alberto Zarate', 'tipo': 'Tecnico', 'mail': 'geoffreyytorres25@gmail.com'},
            ],
            newUSer: {

                Name: '',
                LastName1: '',
                LastName2: '',
                Roll: '',
                Mail: '',
                Password: '',
                RePassword: ''

            },
            modal: false,
            modal_Part: false

        }
    },
    components:{

        Nav
    },
    methods: {


        agregarUsuario: function(){


        },
        editarUsuario: function(item){

            console.log(item)

        }
    }


}

</script>
