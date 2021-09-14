<template>
    <div>
        <div class="flex justify-center">
            <div class="grid gap-4 grid-cols-1 py-3 px-3">             
                <HeaderGenerico 
                    @filtrar-inicios-sesion="filtrar_inicios_sesion"
                    @filtrar-inicios-sesion-name="filtrar_inicios_sesion_name"
                    @filtrar-todos="todos"
                    @filtrar-inicios-sesion-name-fecha="filtrar_inicios_sesion_name_fecha"
                    :tipo="'InicioSesion'" 
                    :titulo="'Inicios de Sesion'"
                ></HeaderGenerico>
                <TablaGenerica 
                    :listaDataTable="listaIniciosSesion" 
                    :loadingTabla="loadingTable"
                    :normalheaderKey="[{text: 'Nombre', key: 'name'},{text: 'Rol', key: 'rollDescription'},{text: 'Ultimo Inicio', key: 'dateStart', formatoFechaHora: true}]"
                    :movilHeaderKey="[{text: 'Nombre', key: 'name'},{text: 'Ultimo Inicio', key: 'dateStart', formatoFecha: true}]"
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
            totalPages: 0,
            total: 10,
            perPage: 10,
            currentPage: 1,
            hasMorePages: true,
            username: '',
            fechaActual: '' 
        }
    },
    beforeMount(){ 
        console.log(this.username.length);  
        let userId = this.$store.state.Login.cookiesUser.userId
        this.$http.get(`${API}/Login/SesionLog/${userId}/${this.page}/${this.total}`)
            .then((response) => {
                this.listaIniciosSesion = response.data.result.rowSesionLog
                this.totalPages = response.data.result.numeroPaginas
                this.currentPage = response.data.result.paginaActual
                this.loadingTable = false
            }) 
            .catch((er) =>{
                console.log(er);
            this.loadingTable = false
            }
            ) 
    },
    methods:{
        filtrar_inicios_sesion(diaSesiones){
            this.loadingTable = true
            let userId = this.$store.state.Login.cookiesUser.userId
            this.fechaActual = diaSesiones
            this.$http.get(`${API}/Login/SesionLog/${userId}/${this.page}/${this.total}/null/${this.fechaActual}`)
            .then((response) => {
                console.log(response)
                this.listaIniciosSesion = response.data.result.rowSesionLog
                this.totalPages = response.data.result.numeroPaginas
                this.currentPage = response.data.result.paginaActual
                this.loadingTable = false
            }) 
            .catch((er) => {
                console.log(er.response.status)
                if(er.response.status == 404){
                    this.loadingTable = false
                    this.listaIniciosSesion = []
                }
            }
            ) 
        },
        filtrar_inicios_sesion_name(nameFilter){            
            this.loadingTable = true
            this.username = nameFilter
            let userId = this.$store.state.Login.cookiesUser.userId
            this.$http.get(`${API}/Login/SesionLog/${userId}/${this.page}/${this.total}/${this.username}`)
            .then((response) => {
                console.log(response)
                this.listaIniciosSesion = response.data.result.rowSesionLog
                this.totalPages = response.data.result.numeroPaginas
                this.currentPage = response.data.result.paginaActual
                this.loadingTable = false
                this.username = ''
            }) 
            .catch((er) => {
                console.log(er.response.status)
                if(er.response.status == 404){
                    this.loadingTable = false
                    this.listaIniciosSesion = []
                }
            }) 
        },
        filtrar_inicios_sesion_name_fecha(nameFilter,diaSesiones){            
            this.loadingTable = true
            this.username = nameFilter
            this.fechaActual = diaSesiones
            console.log(this.fechaActual);
            let userId = this.$store.state.Login.cookiesUser.userId
            this.$http.get(`${API}/Login/SesionLog/${userId}/${this.page}/${this.total}/${this.username}/${this.fechaActual}`)
            .then((response) => {
                console.log(response)
                this.listaIniciosSesion = response.data.result.rowSesionLog
                this.totalPages = response.data.result.numeroPaginas
                this.currentPage = response.data.result.paginaActual
                this.loadingTable = false
                this.username = ''
            }) 
            .catch((er) => {
                console.log(er)
                this.loadingTable = false}) 
        },
        todos(){
        let userId = this.$store.state.Login.cookiesUser.userId
        this.$http.get(`${API}/Login/SesionLog/${userId}/${this.page}/${this.total}`)
            .then((response) => {
                this.listaIniciosSesion = response.data.result.rowSesionLog
                this.totalPages = response.data.result.numeroPaginas
                this.currentPage = response.data.result.paginaActual
                this.loadingTable = false
            }) 
            .catch(() => this.loadingTable = false) 
        },
        showMore(page) {
            console.log(page)
            this.page = page;
            this.currentPage = page;  
            this.$router.push({path: 'IniciosSesion', query: { 'Pagina': page, 'nameFilter': null } })
            this.loadingTable = true
            let userId = this.$store.state.Login.cookiesUser.userId
            if(this.username == '' && this.fechaActual == ''){
                this.$http.get(`${API}/Login/SesionLog/${userId}/${this.page}/${this.total}`)
            .then((response) => {
                console.log(response)
                this.listaIniciosSesion = response.data.result.rowSesionLog
                this.totalPages = response.data.result.numeroPaginas
                this.currentPage = response.data.result.paginaActual
                this.loadingTable = false
            }) 
            .catch(() => this.loadingTable = false) 
            }else if (this.username != '' ){
                this.filtrar_inicios_sesion_name();
            }else if (this.fechaActual != ''){
                this.filtrar_inicios_sesion();
            }
            
        }
    }
}
</script>

<style>

</style>