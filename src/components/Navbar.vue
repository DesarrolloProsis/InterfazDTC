<template>
    <div>
    <nav class="flex 
                justify-between 
                bg-gray-800
                
                p-3" id="nav">   
                       
        <div class="text-lg">
          <router-link to="/home"            
            class="inline-block 
             pl-5
              pt-1
                   text-white
                   text-xl
                  "
          >
          <img
            src="../assets/img/logoProsis.png"
            height="30"
            width="30"
            class=" inline"
          >
          Inicio</router-link>    
        </div>

        <div>
        <router-link to="/" 
            class="inline-block 
            text-sm 
            text-black 
            px-8 
            py-2    
            text-white
            text-xl
            border-white      
            leading-none             
            rounded-lg            
            border-black 
            hover:border-black 
            hover:text-black 
            hover:bg-red-700"
          >Salir</router-link>
        </div>      
    </nav>
        
    </div>    
</template>

<style>

</style>