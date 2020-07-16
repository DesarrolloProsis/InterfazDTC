<template>
  <div>
      <Nav></Nav>
     
      <div class="flex justify-center">
        <div class="mt-5">
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
                           @click="Mostrar_Mas(item)"                 
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
            ]

        }
    },
    components:{

        Nav
    }


}

</script>
