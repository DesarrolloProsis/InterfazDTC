(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51f801f7"],{"30bc":function(a,e,t){"use strict";t("d864")},b86f:function(a,e,t){"use strict";t.r(e);t("d81d"),t("4de4"),t("d3b7");var i=function(){var a=this,e=a._self._c;return e("div",[e("div",{staticClass:"flex justify-center"},[e("div",{staticClass:"grid gap-4 grid-cols-1 py-3 px-3"},[e("PdfEscaneado",{attrs:{abrirModal:a.modalSubirSellado,objInsert:a.objInsertEscaneado,tipoReporte:a.tipoEscaneado},on:{"limpiar-componente-escaneado":a.limpiar_componete_escaneado}}),e("div",{staticClass:"sticky inset-0",class:{"modal-container":a.modalcambiarUsuario}},[a.modalcambiarUsuario?e("div",{staticClass:"rounded-lg justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 mx-auto px-12 py-10 shadow-2xl sm:w-66 mt-33"},[e("ValidationObserver",{ref:"observer"},["--"!=a.infoCambiarUsuario.referenceDTC?e("p",{staticClass:"text-gray-900 font-thin text-md"},[a._v(" Al cambiar el usuario del Diagnóstico de Falla con Refencia: "),e("span",{staticClass:"text-black font-bold"},[a._v(a._s(a.infoCambiarUsuario.referenceNumber))]),e("br"),a._v(" Se cambiará la Ficha con Referencia: "),e("span",{staticClass:"text-red-600 font-bold"},[a._v(a._s(a.infoCambiarUsuario.referenceNumber))]),e("br"),a._v(" Y el Dictamen Técnico con Referencia: "),e("span",{staticClass:"text-red-600 font-bold"},[a._v(a._s(a.infoCambiarUsuario.referenceDTC))])]):e("p",{staticClass:"text-gray-900 font-thin text-md"},[a._v(" Se cambiará el usuario del Diagnóstico de Falla y Ficha Técnica con Referencia: "),e("span",{staticClass:"text-black font-bold"},[a._v(a._s(a.infoCambiarUsuario.referenceNumber))])]),e("div",{staticClass:"mt-10"},[e("p",{staticClass:"pdtcpendientes sm:text-sm sm:text-center"},[a._v("Seleccione el Nuevo Usuario")]),e("ValidationProvider",{attrs:{name:"Observaciones",rules:"required"},scopedSlots:a._u([{key:"default",fn:function(t){var i=t.errors;return[e("select",{directives:[{name:"model",rawName:"v-model",value:a.userChangeDf,expression:"userChangeDf"}],staticClass:"w-full border-none",on:{change:function(e){var t=Array.prototype.filter.call(e.target.options,(function(a){return a.selected})).map((function(a){var e="_value"in a?a._value:a.value;return e}));a.userChangeDf=e.target.multiple?t:t[0]}}},a._l(a.listaTecnicosPlaza,(function(t,i){return e("option",{key:i,domProps:{value:t.userId}},[a._v(a._s(t.nombre))])})),0),e("span",{staticClass:"text-red-600 text-xs block"},[a._v(a._s(i[0]))])]}}],null,!1,3161866330)})],1),e("div",{staticClass:"mt-5"},[e("p",{staticClass:"pdtcpendientes sm:text-sm sm:text-center"},[a._v("Indica el Motivo del Cambio")]),e("ValidationProvider",{attrs:{name:"Comentario",rules:"required|max:300"},scopedSlots:a._u([{key:"default",fn:function(t){var i=t.errors;return[e("textarea",{directives:[{name:"model",rawName:"v-model",value:a.comentario,expression:"comentario"}],staticClass:"textAreaCalendario ph-center",attrs:{placeholder:"ingresa tus comentarios",name:"Comentario",maxlength:300},domProps:{value:a.comentario},on:{input:function(e){e.target.composing||(a.comentario=e.target.value)}}}),a._v(" "),e("span",{staticClass:"text-red-600 text-xs block"},[a._v(a._s(i[0]))]),e("span",{staticClass:"text-xs text-gray-400"},[a._v(a._s(a.restante_comentario)+"/300")])]}}],null,!1,3291940635)})],1),e("div",{staticClass:"mt-10 text-center"},[e("button",{staticClass:"botonIconCrear",on:{click:a.actualizar_user_id_df}},[a._v("Cambiar")]),e("button",{staticClass:"botonIconCancelar",on:{click:function(e){a.modalcambiarUsuario=!1,a.userChangeDf=""}}},[a._v("Cancelar")])])])],1):a._e()]),e("div",{staticClass:"sticky inset-0",class:{"modal-container":a.modalEliminar}},[a.modalEliminar?e("div",{staticClass:"rounded-lg justify-center border absolute inset-x-0 bg-white border-gray-400 w-69 mx-auto px-12 py-10 shadow-2xl sm:w-66 mt-33"},[a._m(0),e("ValidationObserver",{ref:"observer"},["--"!=a.infoEliminar.referenceDTC?e("p",{staticClass:"text-red-600 font-thin text-md sm:text-sm text-justify"},[a._v("Se eliminará el Diagnóstico y la Ficha con referencia "),e("span",{staticClass:"text-black font-bold"},[a._v(a._s(a.infoEliminar.referenceNumber))]),a._v(" y DTC con referencia "),e("span",{staticClass:"text-black font-bold"},[a._v(a._s(a.infoEliminar.referenceDTC))])]):e("p",{staticClass:"text-red-600 font-thin text-md sm:text-sm text-justify"},[a._v("Se eliminará el Diagnóstico y la Ficha con referencia "),e("span",{staticClass:"text-black font-bold"},[a._v(a._s(a.infoEliminar.referenceNumber))])]),e("ValidationProvider",{attrs:{name:"comentarioBorrar",rules:"required:max:300"},scopedSlots:a._u([{key:"default",fn:function(t){var i=t.errors;return[e("p",{staticClass:"text-md mb-1 font-semibold text-gray-900 mt-10"},[a._v("Motivo")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:a.comentarioBorrar,expression:"comentarioBorrar"}],staticClass:"textAreaCalendario",attrs:{name:"comentarioBorrar"},domProps:{value:a.comentarioBorrar},on:{input:function(e){e.target.composing||(a.comentarioBorrar=e.target.value)}}}),e("span",{staticClass:"text-red-600 text-xs block"},[a._v(a._s(i[0]))])]}}],null,!1,2356355218)}),e("div",{staticClass:"mt-5 text-center"},[e("button",{staticClass:"botonIconCrear",on:{click:function(e){return a.borrar_diagnostico_falla()}}},[a._v("Si")]),e("button",{staticClass:"botonIconCancelar font-boton",on:{click:function(e){a.modalEliminar=!1}}},[a._v("No")])])],1)],1):a._e()]),e("HeaderGenerico",{attrs:{titulo:"Concentrado de Diagnóstico y Ficha Técnica",tipo:"DF"},on:{"filtrar-concentrado-diagnostico":a.filtrar_concentrado_diagnostico,"limpiar-concentrado-diagnostico":a.limpiar_filtros,"buscar-df":a.guardar_palabra_busqueda}}),e("TablaGenerica",{attrs:{listaDataTable:a.listaFicha,loadingTabla:a.loadingTabla,validarAcciones:a.opticones_select_acciones,normalheaderKey:[{text:"Numero Referencia",key:"referenceNumber"},{text:"Plaza",key:"squareName"},{text:"Fecha Diagnostico",key:"diagnosisDate",formatoFecha:!0},{text:"Carriles",key:"lanes"},{text:"Numero Falla",key:"failuerNumber"},{text:"Numero Siniestro",key:"siniesterNumber"},{text:"Referencia DTC",key:"referenceDTC",LetrasGris:!0},{text:"Acciones",key:"Acciones"}],movilHeaderKey:[{text:"Numero Referencia",key:"referenceNumber"},{text:"Fecha Diagnostica",key:"diagnosisDate",formatoFecha:!0},{text:"Acciones",key:"Acciones"}]},on:{"acciones-mapper":a.acciones_mapper}}),e("Spinner",{attrs:{modalLoading:a.modalLoading}})],1)])])},r=[function(){var a=this,e=a._self._c;return e("h1",{staticClass:"mb-10 text-center font-titulo font-bold text-4xl sm:text-xl"},[e("img",{staticClass:"ml-2 sm:-ml-4",attrs:{src:t("a2af"),width:"35",height:"35"}}),e("p",{staticClass:"-mt-10 text-black sm:-ml-3 sm:-mt-6"},[a._v("Advertencia")]),e("img",{staticClass:"ml-66 -mt-12 sm:-mt-10 sm:ml-48",attrs:{src:t("a2af"),width:"35",height:"35"}})])}],s=t("c7eb"),n=t("1da1"),o=(t("99af"),t("ac1f"),t("1276"),t("c740"),t("a434"),t("caad"),t("2532"),t("7db0"),t("159b"),t("4201")),c=t("b35f"),l=t("9909"),d=t("d101"),u=t("7cae"),f=t("74b9"),m=t("225c"),h=t("c1df"),p=t.n(h),b="http://201.99.110.3:86/api",C={name:"ConcentradoFichas",components:{HeaderGenerico:o["a"],PdfEscaneado:u["a"],TablaGenerica:c["a"],Spinner:m["a"]},data:function(){return{infoFichasFallaCompleta:[],infoFichasFallaFiltrada:[],listaFicha:[],loadingTabla:!1,typeUser:"",infoEliminar:{},comentarioBorrar:"",modalEliminar:!1,modalSubirSellado:!1,objInsertEscaneado:{},tipoEscaneado:"Diagnostico",modalcambiarUsuario:!1,infoCambiarUsuario:{},listaTecnicosPlaza:[],userChangeDf:"",refNum:"",comentario:"",statusDTC:0,modalLoading:!1}},beforeMount:function(){var a=this;this.typeUser=this.$store.state.Login.cookiesUser.rollId,this.loadingTabla=!0;var e=this.$store.state.Login.cookiesUser.userId;this.$http.get("".concat(b,"/diagnosticoFalla/GetBitacoras/TLA/").concat(e)).then((function(e){setTimeout((function(){a.infoFichasFallaCompleta=e.data.result,a.infoFichasFallaFiltrada=a.infoFichasFallaCompleta,a.listaFicha=a.infoFichasFallaFiltrada,a.loadingTabla=!1}),500)})).catch((function(){a.loadingTabla=!1,a.infoFichasFallaCompleta=[],a.infoFichasFallaFiltrada=[]}))},methods:{actualizarTabla:function(){var a=this;this.typeUser=this.$store.state.Login.cookiesUser.rollId,this.loadingTabla=!0;var e=this.$store.state.Login.cookiesUser.userId;this.$http.get("".concat(b,"/diagnosticoFalla/GetBitacoras/TLA/").concat(e)).then((function(e){a.infoFichasFallaCompleta=e.data.result,a.infoFichasFallaFiltrada=a.infoFichasFallaCompleta,a.listaFicha=a.infoFichasFallaFiltrada,a.loadingTabla=!1})).catch((function(){a.loadingTabla=!1,a.infoFichasFallaCompleta=[],a.infoFichasFallaFiltrada=[]}))},borrar_diagnostico_falla:function(){var a=this,e=this.$store.state.Login.cookiesUser.userId,t=this.infoEliminar.referenceNumber.split("-")[0],i=this.listaFicha.findIndex((function(e){return e.referenceNumber==a.infoEliminar.referenceNumber}));this.loadingTabla=!0,this.listaFicha.splice(i,1),this.$http.post("".concat(b,"/DiagnosticoFalla/BorraDiagnosticoFull/").concat(t,"/").concat(this.infoEliminar.referenceNumber,"/").concat(e,"/").concat(this.comentarioBorrar,"/").concat(this.infoEliminar.referenceDTC)).then((function(){a.modalEliminar=!1,a.comentarioBorrar="",setTimeout((function(){var e=a.listaFicha.findIndex((function(e){return e.referenceNumber==a.infoEliminar.referenceNumber}));a.listaFicha.splice(e,1),a.loadingTabla=!1}),1e3)}))},guardar_palabra_busqueda:function(a){if(""!=a){var e=this.infoFichasFallaFiltrada.filter((function(e){return e.referenceNumber.toUpperCase().includes(a.toUpperCase())||e.referenceDTC.toUpperCase().includes(a.toUpperCase())}));this.listaFicha=e}else this.listaFicha=this.infoFichasFallaCompleta},filtrar_concentrado_diagnostico:function(a){var e=this;this.listaFicha=[],this.loadingTabla=!0,setTimeout((function(){e.listaFicha=d["a"].filtros_concentrado_diagnostico(e.infoFichasFallaCompleta,a),e.loadingTabla=!1}),1e3)},limpiar_filtros:function(){this.listaFicha=this.infoFichasFallaCompleta},formato_fecha_hora_diagnostico:function(a,e){var t=a.split(" ")[0].split("-"),i=a.split(" ")[1].split(":"),r=new Date(t[2],parseInt(t[1])-1,t[0],parseInt(i[0]),parseInt(i[1]),0),s=e.split(" ")[0].split("-"),n=e.split(" ")[1].split(":"),o=new Date(s[2],parseInt(s[1])-1,s[0],parseInt(n[0]),parseInt(n[1]),0);return{fechaInicio:r.toISOString(),fechaFin:o.toISOString()}},editar_diagnostico_falla:function(a){var e=this.formato_fecha_hora_diagnostico(a.start,a.end);a["start"]=e["fechaInicio"],a["end"]=e["fechaFin"],this.$router.push({path:"/Correctivo/PreDTC/Editar/DiagnosticoDeFalla",query:{item:a,referenciaDtc:a.referenceDTC}})},terminar_ficha_diagnostico:function(){var a=Object(n["a"])(Object(s["a"])().mark((function a(e){var t,i,r,n=this;return Object(s["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t=[],i=this.formato_fecha_hora_diagnostico(e.start,e.end),e["start"]=i["fechaInicio"],e["end"]=i["fechaFin"],r=this.$store.state.Login.cookiesUser.plazasUsuario.find((function(a){return a.administradorId==e.adminSquareId})).numeroPlaza,f["a"].actualizar_plaza(e.adminSquareId),a.next=8,this.$store.dispatch("Refacciones/BUSCAR_CARRILES",r);case 8:setTimeout((function(){var a=n.$store.getters["Refacciones/GET_CARRILES_STATE"];e.lanes.split(",").forEach((function(e){var i=a.find((function(a){return a.lane==e}));void 0!=i&&t.push({capufeLaneNum:i.capufeLaneNum,idGare:i.idGare,lane:i.lane})}));var i={causaFalla:e.causeFailure,descripcionFalla:e.faultDescription,diagnosticoFalla:e.failureDiagnosis,fechaDiagnostico:p()(e.diagnosisDate,"YYYY-MM-DD").format("YYYY-MM-DD"),folioFalla:e.failuerNumber,horaFin:e.end,horaInicio:e.start,numeroReporte:e.siniesterNumber,referenceNumber:e.referenceNumber,ubicacion:t};n.$router.push({path:"/Correctivo/PreDTC/Crear/FichaTecnicaDeFalla",query:{data:i}})}),500);case 9:case"end":return a.stop()}}),a,this)})));function e(e){return a.apply(this,arguments)}return e}(),limpiar_componete_escaneado:function(){var a=this;this.loadingTabla=!0,this.modalSubirSellado=!1,setTimeout((function(){var e=a.listaFicha.findIndex((function(e){return e.referenceNumber==a.objInsertEscaneado.referenceNumber})),t=Object.assign(a.listaFicha[e]);a.listaFicha.splice(e,1,t),"Diagnostico"==a.tipoEscaneado?(t["diagnosticoSellado"]=!0,a.listaFicha.splice(e,1,t)):(t["fichaSellado"]=!0,a.listaFicha.splice(e,1,t)),a.objInsertEscaneado={},a.loadingTabla=!1}),500)},modal_Cambiar_Usuario:function(a){var e=this;this.refNum=a.referenceNumber,this.infoCambiarUsuario=a,this.$http.get("".concat(b,"/User//UserofSquare/").concat(a.squareId)).then((function(a){return e.listaTecnicosPlaza=a.data.result})).catch((function(){}))},actualizar_user_id_df:function(){var a=this;if("--"!=this.infoCambiarUsuario.referenceDTC&&1!=this.infoCambiarUsuario.typeFaultId){this.loadingTabla=!0;var e=new Promise((function(t,i){a.$http.put("".concat(b,"/DtcData/UpdateUserIdOfDTC/").concat(a.refNum.split("-")[0],"/").concat(a.userChangeDf,"/").concat(a.infoCambiarUsuario.referenceDTC,"/").concat(a.refNum)).then((function(){t("OK"),a.modalcambiarUsuario=!1})).catch((function(a){i(a)})),setTimeout((function(){e.then((function(){a.loadingTabla=!1,a.userChangeDf="",a.comentario="",a.$notify.success({title:"Ok!",msg:"EL DF CON LA REFERENCIA ".concat(a.refNum," FUE CAMBIADO DE USUARIO."),position:"bottom right",styles:{height:100,width:500}})}))}),1e3)}))}else{this.loadingTabla=!0;var t=new Promise((function(e,i){a.$http.put("".concat(b,"/DtcData/UpdateUserIdOfDTC/").concat(a.refNum.split("-")[0],"/").concat(a.userChangeDf,"/--/").concat(a.refNum)).then((function(){e("OK"),a.modalcambiarUsuario=!1})).catch((function(a){i(a)})),setTimeout((function(){t.then((function(){a.userChangeDf="",a.comentario="",a.loadingTabla=!1,a.$notify.success({title:"Ok!",msg:"EL DF CON LA REFERENCIA ".concat(a.refNum," FUE CAMBIADO DE USUARIO."),position:"bottom right",styles:{height:100,width:500}})}))}),1e3)}))}},acciones_mapper:function(a){var e=this,t=a.acciones,i=a.itemRow;"Terminar Ficha"==t.title&&this.terminar_ficha_diagnostico(i),"Terminar DTC"==t.title&&this.$router.push("/NuevoDtc/Crear/".concat(i.referenceNumber,"/").concat(i.typeFaultId)),"Editar"==t.title&&this.editar_diagnostico_falla(i),"Borrar"==t.title&&(this.modalLoading=!0,setTimeout((function(){e.infoEliminar=i,e.modalEliminar=!0,e.modalLoading=!1}),2e3)),"Bajar Dignóstico de Falla"==t.title&&l["a"].generar_pdf_diagnostico_falla(i.referenceNumber),"Bajar Ficha Técnica"==t.title&&l["a"].generar_pdf_ficha_falla(i.referenceNumber),"Bajar Dictamen (DTC)"==t.title&&(l["a"].generar_pdf_correctivo(i.referenceDTC,2,!1,void 0),4!=this.typeUser&&8!=this.typeUser&&setTimeout((function(){l["a"].generar_pdf_fotografico_correctivo(i.referenceDTC)}),1e3)),"Subir DF Escaneado"==t.title&&(this.tipoEscaneado="Diagnostico",this.modalSubirSellado=!0,this.objInsertEscaneado={referenceNumber:i.referenceNumber}),"Subir FT Escaneada"==t.title&&(this.tipoEscaneado="Ficha",this.modalSubirSellado=!0,this.objInsertEscaneado={referenceNumber:i.referenceNumber}),"Bajar FT Escaneada"==t.title&&l["a"].generar_pdf_ficha_sellada(i.referenceNumber,2),"Bajar DF Escaneado"==t.title&&l["a"].generar_pdf_ficha_sellada(i.referenceNumber,1),"Cambiar de Usuario"==t.title&&(this.modalcambiarUsuario=!0,this.infoCambiarUsuario=i,this.modal_Cambiar_Usuario(this.infoCambiarUsuario)),"Bajar DTC Sin Firma"==t.title&&(l["a"].generar_pdf_correctivo(i.referenceDTC,1,!1,void 0),4!=this.typeUser&&8!=this.typeUser&&setTimeout((function(){l["a"].generar_pdf_fotografico_correctivo(i.referenceDTC)}),1e3))},opticones_select_acciones:function(a){var e=[{title:"Terminar Ficha",accionCss:"terminar",tipo:"",img:"fa-file-circle-plus"},{title:"Terminar DTC",accionCss:"terminar",img:"fa-file-circle-plus"},{title:"Editar",accionCss:"editar",img:"fa-solid fa-pen-to-square"},{title:"Borrar",accionCss:"borrar",img:"fa-solid fa-trash"},{title:"Bajar Dignóstico de Falla",accionCss:"terminar",img:"fa-file-arrow-down"},{title:"Bajar Ficha Técnica",accionCss:"terminar",img:"fa-file-arrow-down"},{title:"Bajar Dictamen (DTC)",accionCss:"terminar",img:"fa-file-arrow-down"},{title:"Subir DF Escaneado",accionCss:"editar",img:"fa-file-arrow-up"},{title:"Subir FT Escaneada",accionCss:"editar",img:"fa-file-arrow-up"},{title:"Bajar FT Escaneada",accionCss:"terminar",img:"fa-file-arrow-down"},{title:"Bajar DF Escaneado",accionCss:"terminar",img:"fa-file-arrow-down"},{title:"Cambiar de Usuario",accionCss:"cambiar",img:"fa-solid fa-address-card"},{title:"Bajar DTC Sin Firma",accionCss:"terminar",img:"fa-file-arrow-down"}];this.statusDTC=a.statusDtc;var t=[];return t.push(e[4]),7!=this.typeUser&&4!=this.typeUser&&8!=this.typeUser&&10!=this.typeUser&&t.push(e[7]),a.diagnosticoSellado&&t.push(e[10]),a.validacionFichaTecnica&&(t.push(e[5]),7!=this.typeUser&&4!=this.typeUser&&8!=this.typeUser&&10!=this.typeUser&&t.push(e[8]),a.fichaSellado&&t.push(e[9]),!a.validacionDTC&&a.typeFaultId>=2&&7!=this.typeUser&&4!=this.typeUser&&8!=this.typeUser&&10!=this.typeUser&&t.push(e[1]),a.validacionDTC&&a.validacionFichaTecnica&&1!=a.statusDtc&&7!=this.typeUser&&4!=this.typeUser&&8!=this.typeUser&&t.push(e[6]),(8==this.typeUser&&"--"!=a.referenceDTC||4==this.typeUser&&"--"!=a.referenceDTC)&&t.push(e[12]),1!=this.typeUser&&2!=this.typeUser&&3!=this.typeUser&&5!=this.typeUser||t.push(e[2])),2==this.typeUser||4==this.typeUser||5==this.typeUser||8==this.typeUser||10==this.typeUser?(t.push(e[11]),t.push(e[3])):7==this.typeUser||4==this.typeUser||10==this.typeUser||a.validacionFichaTecnica||t.push(e[0]),t}},computed:{restante_comentario:function(){return this.comentario.length}}},g=C,_=(t("30bc"),t("2877")),F=Object(_["a"])(g,i,r,!1,null,null,null);e["default"]=F.exports},d864:function(a,e,t){}}]);
//# sourceMappingURL=chunk-51f801f7.5bcebc5f.js.map