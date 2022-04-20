<template>
    <div>
        <div v-if="boolBotones" class="flex justify-center mt-30 mb-16">
            <div class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:mt-2 sm:mb-2">
                <div class="botonesCorrectivo bg-purple-100 border-0 border-l-8 border-purple-500 animacion sm:m-4 sm:p-3" v-if="rollUsuario != 10">
                    <button @click="ventana_comentario" class="text-center">
                        <!-- <img src="../assets/img/comentarios.png" height="200" width="200" class="m-10 sm:m-1"/> -->
                        <font-awesome-icon icon="fa-regular fa-comments" class="text-blue-800 w-37 h-32 mx-20 mt-10"/>
                        <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Comentarios</h1>
                    </button>
                </div>
                <div class="botonesCorrectivo bg-blue-100 border-0 border-l-8 border-blue-500 animacion sm:m-4 sm:p-3" v-if="rollUsuario == 10">
                    <router-link to="/Comentarios" class="text-center cursor-pointer">
                        <img src="../assets/img/listcommit.png" height="200" width="200" class="m-10 sm:m-1" />
                        <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Lista de Comentaios</h1>              
                    </router-link>
                </div>
                <div class="botonesCorrectivo bg-yellow-100 border-0 border-l-8 border-yellow-500 animacion sm:m-4 sm:p-3">
                    <button @click="mostrar_videos_lista" class="text-center">
                        <!-- <img src="../assets/img/videos.png" height="200" width="200" class="m-10 sm:m-1" /> -->
                        <font-awesome-icon icon="fa-solid fa-video" class="text-blue-800 w-37 h-32 mx-20 mt-10"/>
                        <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Videos</h1>              
                    </button>
                </div>
                <div class="botonesCorrectivo bg-teal-100 border-0 border-l-8 border-teal-500  rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400 animacion ">
                    <button class="text-center cursor-pointer"  @click="manual_pdf">
                        <!-- <img src="../assets/img/guia.png" height="200" width="200" class="m-10 sm:m-1" /> -->
                        <font-awesome-icon icon="fa-solid fa-file-circle-question" class="text-blue-800 w-37 h-32 mx-20 mt-10"/>
                        <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Manual de Usuario</h1>
                    </button>
                </div>   
            </div>
        </div>
        <div v-if="boolListaVideos" class="flex justify-center mt-2 mb-16 sm:mt-14">
            <div class="grid grid-cols-2 sm:grid-cols-1 sm:mb-20">
                <div v-for="(item, key) in arrayVideos" :key="key" class="botonesCorrectivo animacion sm:m-4 sm:p-3 sm:w-auto w-72 p-6">
                    <p class=" text-lg text-center font-titulo">{{ item.titulo }}</p>
                    <div class=" inline-flex">
                        <div class="">
                            <!-- <img src="../assets/img/guia.png" height="300" width="200" class="m-10 sm:m-1 sm:ml-8 sm:mt-10" /> -->
                            <font-awesome-icon icon="fa-solid fa-clapperboard" class="text-blue-800 w-22 h-22 mt-12 ml-4"/>
                        </div> 
                        <div class="pt-20 pl-20">
                            <div class="w-16 ml-16 sm:ml-6 sm:-mt-16">
                                <button @click="ventana_videos(item)">
                                    <!-- <img src="../assets/img/play.png" height="40" width="55" class="sm:m-1"/> -->
                                    <font-awesome-icon icon="fa-regular fa-circle-play" class="text-blue-800 w-20 h-20 mb-5"/>
                                </button>                                
                            </div>  
                            <div class="mt-3 font-titulo">
                                {{ item.descripcion }}
                            </div>                          
                        </div>    
                    </div>     
                </div>         
            </div>
        </div>
        <!--////////////////////////////////////////////////////////////////////
        ////                      MODAL AYUDA                              ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0 font-titulo" :class="{'modal-container': modal_coment}">
            <div v-if="modal_coment" class="rounded-lg mt-32 justify-center absolute inset-x-0 md:w-69 lg:w-69 xl:w-69 mx-auto px-12 py-10 sm:p-2">
                <ValidationObserver ref="observer">      
                    <div class="rounded-lg border bg-white border-gray-400 px-12 py-10 shadow-2xl">
                        <h1 class="mb-10 -mt-6 sm:text-sm text-center font-bold text-2xl">Ingresa tu comentario</h1> 
                        <div>
                            <div class="mt-5">
                                    <select v-model="tipoComentario" class="w-65 is_valid" name="tipoComentario">
                                        <option v-for="(item, key) in listaTipoComentario" :key="key" :value="item.typeId">{{ item.description }}</option>
                                    </select>
                            </div>
                            <div class="mt-5">
                                <ValidationProvider name="Comentario" rules="required|max:300" v-slot="{ errors }"> 
                                    <textarea
                                        v-model="comentario"                                        
                                        class="textAreaCalendario ph-center"
                                        placeholder="ingresa tus comentarios"
                                        name="Comentario"
                                        :maxlength="limite"
                                    />
                                    <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                                    <span class="text-xs text-gray-400">{{ restante_comentario }}/300</span>
                                </ValidationProvider>
                            </div>
                        </div>
                        <div class="justify-center flex mt-5">
                            <button @click="enviar_comentario" class="botonIconCrear m-4">Enviar</button>
                            <button  @click="modal_coment = false, comentario = ''" class="botonIconCancelar font-boton m-4">Cancelar</button>
                        </div>
                    </div>
                </ValidationObserver>
            </div>
        </div>
        <!--////////////////////////////////////////////////////////////////////
        ////                      MODAL VIDEOS                              ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0 mx-auto">           
            <div v-if="modal_videos" class="bg-white justify-center absolute w-full mx-auto px-12 py-10 sm:p-2">     
                <span  @click="cerrar_video" class="absolute border rounded-full top-0 right-0">
                    <img  src="@/assets/img/close.png" class="w-10 cursor-pointer " />
                </span>        
                <div class="flex mx-auto">                  
                    <youtube :player-vars="playerVars" :video-id="videoId" width="100%" height="700" ref="youtube" ></youtube>                            
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ReportesPDFService from '../services/ReportesPDFService'
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {
    name: 'Ayuda',
    data(){
        return {
            modal_coment: false,
            modal_videos: false,
            comentario: '',
            limite: 300,
            videoId: '',
            arrayVideos: [
                {  videoId: '_q6AWCDovek', titulo: "Diagnostico de Falla.", descripcion: 'Muestra como generar un diagnóstico de falla y una ficha técnica.'},
                {  videoId: '7suvx1BCIAo', titulo: "Subir DTC Sellado en Concentrado GMMEP.", descripcion: 'Muestra como subir el DTC Sellado en el Concentrado GMMEP.'},
                {  videoId: 'Wx-AeJCf1eU', titulo: "Cambiar Nombre Encargados Plaza.", descripcion: 'Muestra como actualizar el nombre de los tecnicos.'},
                {  videoId: 'Sl3S-D3vxW0', titulo: "Crear Diagnóstico en un DTC que no tenga.", descripcion: 'Muestra como crear un diagnóstico y ficha técnica en un DTC que no lo tenga.'},
                {  videoId: 'MCyD8-ZynOQ', titulo: "Actualizar Componentes en Concentrado DTC.", descripcion: 'Muestra como actualizar los componentes que se tienen en un DTC, desde la vista de Concentrado DTC.'},
                {  videoId: 'MiyD5BHzSUI', titulo: "Actualizar Componentes en Concentrado GMMEP.", descripcion: 'Muestra como actualizar los componentes que se tienen en un DTC, desde la vista de Concentrado GMMEP.'},
                {  videoId: 'Ok0ZDnpkO5U', titulo: "Terminar Diganóstico y Ficha desde Concentrado GMMEP.", descripcion: 'Muestra como generar un Diagnóstico y una Ficha Técnica para DTC desde Concentrado GMMEP.'},
                {  videoId: 'kurFekudc80', titulo: "Actualizar marca,modelo y número de serie, de componente dañado.", descripcion: 'Muestra como actualizar marca, modelo y número de serie, de componente dañado en la bitácora electrónica.'}
            ],
            boolListaVideos: false,
            boolBotones: true,
            playerVars: {
                autoplay: 1
            },
            listaTipoComentario: [],
            tipoComentario: 1
        }
    },
    beforeMount(){        
        if(this.$route.query.tipo == 'comentario'){
            this.modal_coment = true
        }
        if(this.$route.query.tipo == 'videos'){
            this.boolBotones = false
            this.boolListaVideos = true
        }
        this.$http.get(`${API}/Comentario/comment/${this.$store.state.Login.plazaSelecionada.refereciaPlaza}/`)
            .then((response) => {
                this.listaTipoComentario = response.data.result
            })
    },
    methods:{
        enviar_comentario(){
            let user = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID'].idUser
            let objComentario = {
                textoComment: this.comentario,
                commentId: this.tipoComentario,
                userId: user
            }
            if(objComentario.textoComment.length != 0){
                this.$http.post(`${API}/Comentario/Comment/${this.$store.state.Login.plazaSelecionada.refereciaPlaza}`,objComentario)
                .then(() => {
                    this.$notify.success({
                        title: "Ok!",
                        msg: `SE ENVIO CORRECTAMENTE TU COMENTARIO.`,
                        position: "bottom right",
                            styles: { height: 100, width: 500 },
                    });
                    this.comentario = '' 
                })
                .catch(() => {
                    this.$notify.warning({
                        title: "Ups!",
                        msg: `NO SE PUDO ENVIAR TU COMENTARIO.`,
                        position: "bottom right",
                            styles: { height: 100, width: 500 },
                    }); 
                })
                this.modal_coment = false
            }
            else{
                this.$notify.warning({
                        title: "Ups!",
                        msg: `NO SE HAN ESCRITO UN COMENTARIO.`,
                        position: "bottom right",
                            styles: { height: 100, width: 500 },
                    }); 
            }
        },
        cerrar_video(){
            this.modal_videos = false
            this.boolListaVideos = false
            this.boolBotones = true
            this.mostrar_videos_lista()
        },
        mostrar_videos_lista(){
            this.boolBotones = false
            this.boolListaVideos = true
        },
        manual_pdf(){
            ReportesPDFService.manual_pdf()
        },
        ventana_comentario(){
            this.modal_coment = true
        },
        ventana_videos({videoId}){
            this.boolListaVideos = false
            this.videoId = videoId
            this.modal_videos = true
            this.player.playVideo()            
        },      

    },
    computed:{
        restante_comentario(){
            return this.comentario.length
        },
        player() {
            return this.$refs.youtube.player
        },
        rollUsuario(){
            return this.$store.state.Login.cookiesUser.rollId
        }
    },
    watch: {
        '$route' (from, to){      
            if(from.path == to.path){
                if(this.$route.query.tipo == 'comentario'){
                    this.boolBotones = true
                    this.boolListaVideos = false
                    this.modal_coment = true
                }
                if(this.$route.query.tipo == 'videos'){
                    this.modal_coment = false
                    this.boolBotones = false
                    this.boolListaVideos = true
                }
            }
        }
    }
}
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