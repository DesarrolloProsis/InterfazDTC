(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-26f38536"],{"1e32":function(t,a,e){"use strict";e("8869")},"21b7":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t._self._c;return a("div",[a("div",{staticClass:"flex justify-center p-4"},[a("div",{staticClass:"mt-5"},[a("HeaderGenerico",{attrs:{titulo:"Concentrado DTC Borrados",tipo:"BORRADO"},on:{"descargar-reporte-dtc":t.descargar_reporte_dtc,"filtrar-borrado":t.guardar_palabra_busqueda}}),a("div",{staticClass:"sticky inset-0",class:{"modal-container":t.modalDetalles}},[t.modalDetalles?a("div",{staticClass:"mt-66 absolute justify-items-center rounded-lg border border-gray-400 font-titulo shadow-xl inset-x-0 bg-white w-69 h-67 sm:h-73 sm:w-66 mx-auto px-10 py-5 text-gray-600"},[a("div",[a("h1",{staticClass:"mb-10 text-center font-titulo font-bold text-4xl sm:text-xl"},[a("p",{staticClass:"text-gray-900 sm:ml-6 mt-8 sm:-mt-6"},[t._v("DTC "+t._s(t.detallesDtcBorrado.refereceNumber))])]),a("div",{staticClass:"divtabla font-titulo"},[a("table",{staticClass:"table"},[t._m(0),a("transition-group",{tag:"tbody",attrs:{name:"table"}},t._l(t.detallesDtcBorrado.lista,(function(e,s){return a("tr",{key:s,staticClass:"h-12 text-gray-900 text-sm text-center"},[a("td",{staticClass:"cuerpoTable"},[t._v(t._s(e.userName))]),a("td",{staticClass:"cuerpoTable"},[t._v(t._s(t._f("formatDate")(e.dateStamp)))]),a("td",{staticClass:"cuerpoTable"},[t._v(t._s(null==e.comment?"Sin Comentario":e.comment))])])})),0)],1)])]),a("div",{staticClass:"mt-12 flex justify-center"},[a("button",{staticClass:"botonIconCrear font-boton"},[a("span",{on:{click:function(a){t.modalDetalles=!1,t.detallesDtcBorrado={}}}},[t._v("Aceptar")])])])]):t._e()]),a("div",{staticClass:"overflow-x-auto font-titulo bg-white rounded-lg shadow overflow-y-auto sm:mb-24 w-77 sm:w-67 sm:ml-32 mb-20",staticStyle:{height:"500px"}},[a("table",{staticClass:"border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped"},[t._m(1),a("transition-group",{tag:"tbody",attrs:{name:"table"}},t._l(t.listaborrados,(function(e,s){return a("tr",{key:s,staticClass:"h-12 text-gray-900 text-sm text-center"},[a("td",{staticClass:"cuerpoTable"},[t._v(t._s("".concat(e.refereceNumber)))]),a("td",{staticClass:"cuerpoTable hidden"},[t._v(t._s("Numero de veces borrado ".concat(e.conteos)))]),a("td",{staticClass:"cuerpoTable"},[t._v(t._s(t._f("formatDate")(e.ultimaFecha)))]),a("td",{staticClass:"cuerpoTable"},[a("button",{staticClass:"botonBuscar",on:{click:function(a){return t.mostras_detalles_borrado(e)}}},[a("font-awesome-icon",{staticClass:"text-blue-800 h-7 w-5 mr-2",attrs:{icon:"fa-solid fa-plus"}}),a("span",{staticClass:"text-xs sm:hidden"},[t._v("Más")])],1)])])})),0)],1)])],1)])])},r=[function(){var t=this,a=t._self._c;return a("thead",[a("tr",{staticClass:"text-md trTable"},[a("th",{staticClass:"cabeceraTable font-light"},[t._v("Usuario")]),a("th",{staticClass:"cabeceraTable font-light"},[t._v("Fecha")]),a("th",{staticClass:"cabeceraTable font-light"},[t._v("Comentario")])])])},function(){var t=this,a=t._self._c;return a("thead",[a("tr",{staticClass:"text-md text-gray-400 bg-blue-800"},[a("th",{staticClass:"cabeceraTable"},[t._v("Referencia")]),a("th",{staticClass:"cabeceraTable"},[t._v("Fecha de eliminación")]),a("th",{staticClass:"cabeceraTable hidden"},[t._v("Conteo de borrado")]),a("th",{staticClass:"cabeceraTable"},[t._v("Acciones")])])])}],o=e("5530"),l=(e("4de4"),e("d3b7"),e("caad"),e("2532"),e("99af"),e("c1df")),c=e.n(l),i=e("4201"),n=e("9909"),d="http://201.99.110.3:86/api",u={name:"DTCBorrados",components:{HeaderGenerico:i["a"]},data:function(){return{listaDTC_borrados:[],listaDTC_filtrada:[],listaborrados:[],modalDetalles:!1,detallesDtcBorrado:{}}},beforeMount:function(){var t=this;this.$http.get("".concat(d,"/DtcData/GetReferencesLog")).then((function(a){t.listaDTC_borrados=a.data.result,t.listaDTC_filtrada=t.listaDTC_borrados,t.listaborrados=t.listaDTC_filtrada}))},methods:{guardar_palabra_busqueda:function(t){if(""!=t){var a=this.listaDTC_filtrada.filter((function(a){return a.refereceNumber.toUpperCase().includes(t.toUpperCase())}));this.listaborrados=a}else this.listaborrados},mostras_detalles_borrado:function(t){var a=this;this.modalDetalles=!0,this.$http.get("".concat(d,"/DtcData/GetReferencesLogDetail/").concat(t.refereceNumber)).then((function(e){a.detallesDtcBorrado=Object(o["a"])({lista:e.data.result},t)}))},descargar_reporte_dtc:function(){n["a"].reporte_dtcborrados()}},filters:{formatDate:function(t){return c()(t.substring(0,10)).format("DD/MM/YYYY")}}},b=u,f=(e("1e32"),e("2877")),m=Object(f["a"])(b,s,r,!1,null,"7752cb8e",null);a["default"]=m.exports},8869:function(t,a,e){}}]);
//# sourceMappingURL=chunk-26f38536.ddbe26b6.js.map