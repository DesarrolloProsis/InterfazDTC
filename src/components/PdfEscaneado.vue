<template>
    <div class="">
        <div class=" inset-0 font-titulo" :class="{'modal-container': abrirModal}">
            <div v-if="abrirModal" class="carruselGMMEP border-gray-200 h-34 w-71 mt-66"> 
                <span @click="escaneadoBool = true, abrirModal = false, $emit('cancelar-escaneado')" class="absolute  top-0 right-0">
                    <img  src="@/assets/img/close.png" class="w-8 cursor-pointer " />
                </span> 
                <div>                    
                    <button class="mt-10  sm:w-32 sm:-ml-5 ml-2" v-if="escaneadoBool">
                        <div class="botonIconSellado font-boton h-32 w-69 justify-center">
                            <input @change="recibir_calendario_escaneado($event)" type="file" class="opacity-0 border-black w-69 h-32 absolute" />
                            <img src="@/assets/img/pdf.png" class="mr-1" width="25" height="25"/>
                            <p class="mt-1">Seleccionar Archivo</p>
                        </div>                   
                    </button>
                    <div class="grid grid-cols-1 ml-6 sm:ml-0" v-else>
                        <div class="grid grid-cols-2">
                            <img src="@/assets/img/pdf.png" class="w-24 h-24 sm:hidden mt-6 opacity-75" alt/>     
                            <p class="-ml-16 mt-16 font-bold sm:ml-0">{{this.nombrePdf}}</p>
                        </div>
                        <div class="grid grid-cols-2 ml-10 sm:grid-cols-1 sm:-ml-1">
                            <button @click="buscar_ruta_envio" class="botonEnviarPDF font-boton mr-2 ml-20 mt-6 px-1 py-1 h-6 text-sm justify-center w-24">Subir</button>
                            <button @click="escaneadoBool = true, abrirModal = false, $emit('cancelar-escaneado')" class="botonIconCancelar font-boton mt-6 -ml-2 h-6 text-sm justify-center w-24 px-1 sm:ml-0 sm:w-24">Cancelar</button>                  
                        </div>            
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {

    props: {
        tipoReporte:{
            type: String,
            require: true
        },
        abrirModal: {
            type: Boolean,
            require: true,
            default: () => false
        },
        objInsert: {
            type: Object,
            require: true,
            default: () => {}
        }
    },
    data(){
        return{
            escaneadoBool: true,
            pdfEscaneadoFile: {},
            nombrePdf:''
        }
    },
    methods: {
        recibir_calendario_escaneado(e){
            var files = e.target.files || e.dataTransfer.files;
            this.nombrePdf = files[0].name
            if (!files.length) return;
            else {
                for (let file of files) {  
                    if(file.type.split('/')[1] == 'pdf'){
                        this.pdfEscaneadoFile = file
                        this.escaneadoBool = false
                    }
                    else{
                        this.$notify.warning({
                            title: "Ups!",
                            msg: `SOLO SE PUEDEN SUBIR ARCHIVOS .PDF`,
                            position: "bottom right",
                            styles: { height: 100, width: 500 }
                        })  
                    }  
                }
            }        
        },
        buscar_ruta_envio(){       
            let url = ''  
            let  formFile = new FormData()         
            if(this.tipoReporte == 'Calendario'){
                url = `${API}/calendario/CalendarioEscaneado/${this.objInsert.referenceNumber}/${this.objInsert.mes}/${this.objInsert.año}/${this.objInsert.idUser}`                
            }
            if(this.tipoReporte == "Calendario-Actividades"){
                url = `${API}/MantenimientoPdf/TablaActEscaneado/${this.objInsert.referenceNumber.split('-')[0]}/${this.objInsert.referenceNumber}`                
            }  
            if(this.tipoReporte == 'Card-DTC'){
                url = `${API}/pdf/PdfSellado/${this.objInsert.referenceNumber.split('-')[0]}/${this.objInsert.referenceNumber}/${true}`                
            } 
            if(this.tipoReporte == 'Fotografico'){
                url = `${API}/ReporteFotografico/dañado/reporteSellado/${this.objInsert.referenceNumber.split('-')[0]}/${this.objInsert.referenceNumber}`
            }
            if(this.tipoReporte == 'Diagnostico') {
                url = `${API}/DiagnosticoFalla/Sellada/${this.objInsert.referenceNumber.split('-')[0]}/${this.objInsert.referenceNumber}`                
            }
            if(this.tipoReporte == 'Ficha') {
                url = `${API}/FichaTecnicaAtencion/FichaTecnicaSellada/${this.objInsert.referenceNumber.split('-')[0]}/${this.objInsert.referenceNumber}`                
            }
            if(this.tipoReporte == 'GMMEP'){
                url = `${API}/pdf/PdfSellado/${this.objInsert.referenceNumber.split('-')[0]}/${this.objInsert.referenceNumber}/${false}`
            }
            formFile.append("file", this.pdfEscaneadoFile);
            this.$http.post(url, formFile)
                .then(() => {                   
                    this.escaneadoBool = true                      
                    this.$notify.success({
                        title: "Ok!",
                        msg: `SE SUBIO CORRECTAMENTE EL ARCHIVO.`,
                        position: "bottom right",
                        styles: { height: 100, width: 500 },
                    });
                    this.$emit('limpiar-componente-escaneado')                 
                })                          
        },                                              
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
