<template>
   <div>
        
         <table class="border  border-black">
           <tr>
             <th class="w-56 border border-black">Componete</th>      
           </tr>
           <tr class=" h-10" v-for="(item, key) in datos_info" :key="key">
              <td>{{ item.componente }}</td>                            
          </tr>          
         </table>
    </div>  
</template>

<script>
export default {


    data: function(){

        return{

            datos_info: [

                {},
                {},
                {},
                {},
            ]

        }
    },
    beforeMount: function(){

        this.datos_info = this.$store.getters['Refacciones/getlistaRefaccionesInventario']
    }
    

}
</script>
