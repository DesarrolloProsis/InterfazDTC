<template>
<div class="relative">
    <Nav></Nav>
    <div class="flex justify-center">
        <div class="grid gap-4 grid-cols-1 py-3 px-3">                
            <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold"></h1>
            <!--/////////////////////////////////////////////////////////////////
            ////                    FILTROS DE NAVEGACION                      ////
            ////////////////////////////////////////////////////////////////////-->
            <div class="mt-1 mb-1 justify-center sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols">
                <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-2 sm:text-xs sm:ml-3">
                    <div class="m-3">
                        <p class="font-bold sm:text-sm mb-2 sm:text-center">Selecciones la Plaza</p>
                        <select class="w-40 sm:w-full mb-3" type="text">
                            <option disabled value="">Selecionar...</option>     
                            <option></option>                
                        </select>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</div>
</template>