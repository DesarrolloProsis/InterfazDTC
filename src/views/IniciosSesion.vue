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
                ></TablaGenerica>
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
    name:'IniciosdeSesion',
    components: {
        HeaderGenerico,
        TablaGenerica,
        Pagination
    },
    data(){
        return {
            listaIniciosSesion: [],
            loadingTable: false,
            page: 1,//pagina en la que quieres iniciar la vista
            totalPages: 0,//total de paginas
            total: 10,//numero de resultados a mostrar
            perPage: 10,//no se ocupa
            currentPage: 1,//pagina actual
            hasMorePages: true,// tener más paginas
            username: '',
            fechaActual: '' 
        }
    },
    beforeMount(){ 
        let userId = this.$store.state.Login.cookiesUser.userId
        this.$http.get(`${API}/Login/SesionLog/${userId}/${this.page}/${this.total}`)
            .then((response) => {
                this.listaIniciosSesion = response.data.result.rowSesionLog
                this.totalPages = response.data.result.numeroPaginas
                this.currentPage = response.data.result.paginaActual
                this.loadingTable = false
            }) 
            .catch(() =>{ this.loadingTable = false }) 
    },
    methods:{
        filtrar_inicios_sesion(diaSesiones){
            if(this.fechaActual == ''){
                this.loadingTable = true
                let userId = this.$store.state.Login.cookiesUser.userId
                this.fechaActual = diaSesiones
                this.$http.get(`${API}/Login/SesionLog/${userId}/${this.page}/${this.total}/null/${this.fechaActual}`)
                .then((response) => {
                    this.listaIniciosSesion = response.data.result.rowSesionLog
                    this.totalPages = response.data.result.numeroPaginas
                    this.currentPage = response.data.result.paginaActual
                    this.loadingTable = false
                }) 
                .catch((er) => {
                    if(er.response.status == 404){
                        this.loadingTable = false
                        this.listaIniciosSesion = []
                    }
                }
                ) 
            }else{
                this.loadingTable = true
                let userId = this.$store.state.Login.cookiesUser.userId
                this.fechaActual = this.fechaActual
                this.$http.get(`${API}/Login/SesionLog/${userId}/${this.page}/${this.total}/null/${this.fechaActual}`)
                .then((response) => {
                    this.listaIniciosSesion = response.data.result.rowSesionLog
                    this.totalPages = response.data.result.numeroPaginas
                    this.currentPage = response.data.result.paginaActual
                    this.loadingTable = false
                }) 
                .catch((er) => {
                    if(er.response.status == 404){
                        this.loadingTable = false
                        this.listaIniciosSesion = []
                    }
                }
                )
            }  
        },
        filtrar_inicios_sesion_name(nameFilter){            
            if(this.username == ''){
                this.loadingTable = true
                this.username = nameFilter
                let userId = this.$store.state.Login.cookiesUser.userId
                this.$http.get(`${API}/Login/SesionLog/${userId}/${this.page}/${this.total}/${this.username}`)
                .then((response) => {
                    this.listaIniciosSesion = response.data.result.rowSesionLog
                    this.totalPages = response.data.result.numeroPaginas
                    this.currentPage = response.data.result.paginaActual
                    this.loadingTable = false
                }) 
                .catch((er) => {
                    if(er.response.status == 404){
                        this.loadingTable = false
                        this.listaIniciosSesion = []
                    }
                }) 
            }else{
                this.username = this.username
                this.loadingTable = true
                let userId = this.$store.state.Login.cookiesUser.userId
                this.$http.get(`${API}/Login/SesionLog/${userId}/${this.currentPage}/${this.total}/${this.username}`)
                .then((response) => {
                    this.listaIniciosSesion = response.data.result.rowSesionLog
                    this.totalPages = response.data.result.numeroPaginas
                    this.currentPage = response.data.result.paginaActual
                    this.loadingTable = false
                }) 
                .catch((er) => {
                    if(er.response.status == 404){
                        this.loadingTable = false
                        this.listaIniciosSesion = []
                    }
                })
            }
            
        },
        filtrar_inicios_sesion_name_fecha(nameFilter,diaSesiones){
            if(this.username === '' && this.fechaActual === ''){
            this.loadingTable = true
            this.username = nameFilter
            this.fechaActual = diaSesiones
            let userId = this.$store.state.Login.cookiesUser.userId
            this.$http.get(`${API}/Login/SesionLog/${userId}/${this.page}/${this.total}/${this.username}/${this.fechaActual}`)
            .then((response) => {
                this.listaIniciosSesion = response.data.result.rowSesionLog
                this.totalPages = response.data.result.numeroPaginas
                this.currentPage = response.data.result.paginaActual
                this.loadingTable = false
            }) 
            .catch((er) => {
                if(er.response.status == 404){
                        this.loadingTable = false
                        this.listaIniciosSesion = []
                        this.totalPages = 1
                    }
                })
            }else{
            this.loadingTable = true
            this.username = this.username
            this.fechaActual = this.fechaActual
            let userId = this.$store.state.Login.cookiesUser.userId
            this.$http.get(`${API}/Login/SesionLog/${userId}/${this.page}/${this.total}/${this.username}/${this.fechaActual}`)
            .then((response) => {
                this.listaIniciosSesion = response.data.result.rowSesionLog
                this.totalPages = response.data.result.numeroPaginas
                this.currentPage = response.data.result.paginaActual
                this.loadingTable = false
            }) 
            .catch((er) => {
                if(er.response.status == 404){
                        this.loadingTable = false
                        this.listaIniciosSesion = []
                    }
                })
            }           
            
        },
        todos(){
        this.username = ''
        this.fechaActual = '' 
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
            this.page = page;
            this.currentPage = page;  
            this.$router.push({path: 'IniciosSesion', query: { 'Pagina': page, 'nameFilter': null } })
            this.loadingTable = true
            let userId = this.$store.state.Login.cookiesUser.userId
            if(this.username == '' && this.fechaActual == ''){
                this.$http.get(`${API}/Login/SesionLog/${userId}/${this.page}/${this.total}`)
            .then((response) => {
                this.listaIniciosSesion = response.data.result.rowSesionLog
                this.totalPages = response.data.result.numeroPaginas
                this.currentPage = response.data.result.paginaActual
                this.loadingTable = false
            }) 
            .catch(() => this.loadingTable = false) 
            }else if(this.username != '' && this.fechaActual != ''){
                this.filtrar_inicios_sesion_name_fecha();
            }else if (this.username != ''){
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