<template>
    <div>
        <div class="flex justify-center mt-6">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">             
                <HeaderGenerico 
                    @filtrar-inicios-sesion="filtrar_inicios_sesion"
                    @filtrar-inicios-sesion-name="filtrar_inicios_sesion_name"
                    :tipo="'InicioSesion'" 
                    :titulo="'Inicios de Sesion'"
                ></HeaderGenerico>
                <TablaGenerica 
                  :listaDataTable="listaIniciosSesion" 
                  :loadingTabla="loadingTable"
                  :normalheaderKey="[{text: 'Nombre', key: 'name'},{text: 'Rol', key: 'rollDescription'},{text: 'Ultimo Inicio', key: 'dateStart'}]"
                  :movilHeaderKey="[{text: 'Nombre', key: 'name'},{text: 'Ultimo Inicio', key: 'dateStart'}]"
                >
                </TablaGenerica>

                <Pagination
                    :total-pages="totalPages" 
                    :total="total" :per-page="perPage" 
                    :current-page="currentPage"
                    :has-more-pages="hasMorePages" 
                    @pagechanged="showMore"
                ></Pagination>
                

            </div>
            
        </div>
    </div>
</template>

<script>
import HeaderGenerico from '../components/Header/HeaderGenerico.vue'
import TablaGenerica from '../components/TablaGenerica.vue'
import Pagination from '../components/Pagination.vue'
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {

    components: {
        HeaderGenerico,
        TablaGenerica,
        Pagination
    },
    data(){
        return {
            listaIniciosSesion: [],
            loadingTable: false,
            page: 1,
            totalPages: 50,
            total: 40,
            perPage: 10,
            currentPage: 2,
            hasMorePages: true
        }
    },
    beforeMount(){    
        
        let dateNow = new Date().toISOString().substring(0,10)
        this.filtrar_inicios_sesion(dateNow)         
    },
    methods:{
        filtrar_inicios_sesion(daySesions){
            this.loadingTable = true
            let userId = this.$store.state.Login.cookiesUser.userId
            this.$http.get(`${API}/Login/SesionLog/${userId}/${daySesions}`)
            .then((response) => {
                this.listaIniciosSesion = response.data.result
                this.loadingTable = false
            }) 
            .catch(() => this.loadingTable = false) 
        },
        filtrar_inicios_sesion_name(nameFilter){            
            let listaNueva = []; this.loadingTable = true;
            this.listaIniciosSesion.forEach(item => {                
                if(item.name.toUpperCase().includes(nameFilter.toUpperCase()))
                    listaNueva.push(item)
            })
            this.listaIniciosSesion = listaNueva
            this.loadingTable = false
        },
        showMore(page) {
            console.log(page)
            this.page = page;
            this.currentPage = page;

            this.$router.push({path: 'IniciosSesion', query: { 'Pagina': page, 'nameFilter': null } })
        }
    }
}
</script>

<style>

</style>