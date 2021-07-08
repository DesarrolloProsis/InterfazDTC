<template>
    <div>
        <div class="flex justify-center gird grid-cols-2">
            <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
                <router-link to="/ReporteComponentes" class="text-center cursor-pointer">
                    <button class="text-center">
                        <img src="@/assets/img/reportar (1).png" height="200" width="200" class="m-10 sm:m-1"/>
                        <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Reporte de Componentes</h1>
                    </button>
                </router-link>
            </div>
            <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
                <router-link to="/Comentarios" class="text-center cursor-pointer">
                    <img src="@/assets/img/listcommit.png" height="200" width="200" class="m-10 sm:m-1" />
                    <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Reporte DTC Sellados</h1>              
                </router-link>
            </div>
        </div>
    </div>
</template>