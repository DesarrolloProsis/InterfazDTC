(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eebb98f4"],{"1d89":function(t,e,a){t.exports=a.p+"img/add.36624e63.png"},"66a5":function(t,e,a){},"83c9":function(t,e,a){"use strict";a("66a5")},9048:function(t,e,a){"use strict";a("d3b7"),a("25f0"),a("ddb0"),a("99af"),a("fb6a");var s=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"flex justify-center"},[e("div",{staticClass:"shadow-sm rounded w-full flex flex-col"},[e("div",{staticClass:"inline-flex font-titulo"},[e("div",{staticClass:"overflow-x-auto bg-white rounded-lg overflow-y-auto sm:mb-24 sm:text-xs hidden md:block lg:block xl:block 2xl:block",class:{hidden:t.modal}},[e("table",{staticClass:"border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped"},[t._m(0),e("transition-group",{tag:"tbody",attrs:{name:"table"}},t._l(t.componentespush,(function(s,o){return e("tr",{key:s.requestedComponentId,staticClass:"hover:bg-blue-200 text-center"},[e("td",{staticClass:"cuerpoTable"},[t._v("1")]),e("td",{staticClass:"cuerpoTable"},[t._v(t._s(s.nameComponent))]),e("td",{staticClass:"cuerpoTable"},[t._v(t._s(s.brand))]),e("td",{staticClass:"cuerpoTable"},[t._v(t._s(s.model))]),e("td",{staticClass:"cuerpoTable"},[t._v(t._s(s.serialNumber))]),e("td",{staticClass:"cuerpoTable"},[t._v(t._s(s.lane))]),e("td",{staticClass:"cuerpoTable"},[t._v("Dañada")]),e("td",{staticClass:"cuerpoTable pb-2"},[e("div",{staticClass:"sm:mr-5"},[e("button",{staticClass:"botonIconBorrarCard font-boton sm:w-auto w-20 sm:h-8",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.remove(o)}}},[e("img",{staticClass:"mr-2 sm:m-1",attrs:{src:a("b314"),width:"15",height:"15"}}),e("span",{staticClass:"sm:hidden"},[t._v("Borrar")])])])])])})),0),e("tr",{staticClass:"text-center"},[e("td",{staticClass:"cuerpoTable w-1"},[e("button",{on:{click:t.modalAgregarComp}},[e("img",{attrs:{src:a("ec68"),width:"15",height:"15"}})])]),e("td",{staticClass:"cuerpoTable sm:hidden"},[t._v(t._s(t.datosPrePartida.rowMarca.toString()))]),e("td",{staticClass:"cuerpoTable sm:hidden"},t._l(t.datosPrePartida.rowModelo,(function(a,s){return e("p",{key:s,staticClass:"text-sm"},[t._v(t._s(a))])})),0),e("td",{staticClass:"cuerpoTable sm:hidden"},t._l(t.datosPrePartida.rowNumSerie,(function(a,s){return e("p",{key:s,staticClass:"text-sm"},[t._v(t._s(a))])})),0),e("td",{staticClass:"cuerpoTable sm:hidden"},[e("multiselect",{staticClass:"hidden",attrs:{"close-on-select":!1,"clear-on-select":!0,hideSelected:!1,placeholder:"Selecciona...",options:t.listLane,multiple:!0},scopedSlots:t._u([{key:"selection",fn:function(a){var s=a.values,o=a.isOpen;return"Servidor de Video"!=t.componenteSeleccionado&&"Servidor de Plaza"!=t.componenteSeleccionado?[s.length&&!o?e("span",{staticClass:"multiselect__single"},[t._v(t._s(s.length)+" Carriles")]):t._e()]:void 0}}],null,!0),model:{value:t.laneSelect,callback:function(e){t.laneSelect=e},expression:"laneSelect"}})],1),e("td",{staticClass:"cuerpoTable sm:hidden p-2"},[e("button",{staticClass:"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700 w-24 hidden",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.agregarPartida()}}},[e("img",{attrs:{src:a("ec68"),width:"20",height:"20"}}),e("span",{staticClass:"text-xs"},[t._v("Agregar Partida")])])])])],1)])]),e("div",{staticClass:"mt-1 bg-green-100 border rounded-xl border-gray-300 shadow-lg text-center md:hidden lg:hidden xl:hidden"},[e("button",{on:{click:t.modalAgregarComp}},[t._m(1)])]),e("div",{staticClass:"grid grid-cols-1 gap-4 mt-2 mb-6 md:hidden lg:hidden xl:hidden"},[e("div",{staticClass:"bg-gray-50 space-y-3 p-4 rounded-lg shadow-xl"},[t._m(2),e("div",{staticClass:"grid grid-cols-2 place-items-stretch gap-4 text-xs"},[t._m(3),e("div",{staticClass:"place-self-center p-2"},[e("button",{staticClass:"botonIconBorrarCard font-boton sm:w-auto w-20 sm:h-8",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.eliminar_partida(t.index)}}},[e("img",{staticClass:"mr-2 sm:m-1",attrs:{src:a("b314"),width:"20",height:"20"}}),e("span",{},[t._v("Borrar")])])])])])])])]),e("div",{staticClass:"sticky inset-0 font-titulo",class:{"modal-container":t.showModal}},[t.showModal?e("div",{staticClass:"rounded-lg p-2 grid grid-cols-1 content-center h-full"},[e("div",{staticClass:"container mx-auto rounded-lg border bg-white border-gray-400 px-4 py-10"},[e("h1",{staticClass:"text-center text-4xl font-bold sm:text-2xl"},[t._v("Componentes del DTC")]),e("div",{staticClass:"flex justify-center w-full sm:overflow-auto sm:h-60 md:overflow-auto md:h-60 lg:overflow-auto lg:h-60 xl:overflow-auto xl:h-70"},[e("table",{staticClass:"tablaf mt-6"},[t._m(4),e("tbody",t._l(t.arraycomponentes,(function(a){return e("tr",{key:a.requestedComponentId,class:{hidden:1==a.useInAnexo}},[e("td",{staticClass:"text-center"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.componentes,expression:"componentes"}],attrs:{type:"checkbox"},domProps:{value:a,checked:Array.isArray(t.componentes)?t._i(t.componentes,a)>-1:t.componentes},on:{change:function(e){var s=t.componentes,o=e.target,n=!!o.checked;if(Array.isArray(s)){var r=a,i=t._i(s,r);o.checked?i<0&&(t.componentes=s.concat([r])):i>-1&&(t.componentes=s.slice(0,i).concat(s.slice(i+1)))}else t.componentes=n}}})]),e("td",{staticClass:"p-2 text-justify text-xs"},[t._v(t._s(a.nameComponent))]),e("td",{staticClass:"p-2 text-center text-xs sm:hidden"},[t._v(t._s(a.serialNumber))]),e("td",{staticClass:"p-2 text-center text-xs"},[t._v(t._s(a.lane))])])})),0)])]),e("div",{staticClass:"flex justify-center mt-8"},[e("div",{staticClass:"inline-flex"},[e("button",{staticClass:"botonIconCrear",on:{click:t.agregarcomponentes}},[t._v("Agregar")]),e("button",{staticClass:"botonIconCancelar font-boton",on:{click:t.botoncancelar_modal}},[t._v("Cancelar")])])])])]):t._e()]),e("h3",{staticClass:"font-bold text-sm"},[t._v("COMPONENTES Y/O REFACCIONES NUEVAS:")]),e("TablaEquipoPropuesto",{attrs:{listaEquipo:t.componentespush},on:{componentesfinales:t.componenteseditadosnoserie}})],1)},o=[function(){var t=this,e=t._self._c;return e("thead",[e("tr",{staticClass:"text-sm text-center text-white trTable sm:text-xs"},[e("th",{staticClass:"md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium"},[t._v("Cantidad")]),e("th",{staticClass:"md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium"},[t._v("Componente")]),e("th",{staticClass:"md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium"},[t._v("Marca")]),e("th",{staticClass:"md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium"},[t._v("Modelo")]),e("th",{staticClass:"md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium"},[t._v("No. de Serie")]),e("th",{staticClass:"md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium"},[t._v("Ubicacion(carril/cuerpo)")]),e("th",{staticClass:"md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium"},[t._v("Observaciones")]),e("th",{staticClass:"md:w-20 lg:w-32 xl:w-40 cabeceraTable font-medium"},[t._v("Acciones")])])])},function(){var t=this,e=t._self._c;return e("span",{staticClass:"flex p-1 text-md font-bold text-green-800"},[t._v(" Añadir componentes "),e("img",{staticClass:"ml-2",attrs:{src:a("ec68"),width:"25",height:"15"}})])},function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"text-lg font-bold"},[t._v("ARMARIO TECNICO CARRIL MULTIMODAL")]),e("div",{staticClass:"mb-2"},[e("span",{staticClass:"text-xs font-bold tracking-tight text-blue-800 bg-blue-200 rounded-xl bg-opacity-50 p-1"},[e("span",{staticClass:"text-blue-800"},[t._v("Ubicacion: ")]),t._v(" A01-13070451")])]),e("div",{staticClass:"mb-2"},[e("span",{staticClass:"text-xs font-bold tracking-tight text-blue-800 bg-blue-200 rounded-xl bg-opacity-50 p-1"},[e("span",{staticClass:"text-blue-800"},[t._v("No. Serie: ")]),t._v(" 13070451")])]),e("div",{staticClass:"text-xs mt-1 bg-gray-100 border rounded-lg p-2 text-gray-800 font-semibold"},[t._v(" OBSERVACIONES: NO APLICA REPARACIÓN, NI PARCIAL, NI TOTAL. ")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"text-left text-gray-800 p-1"},[e("div",[t._v("MODELO: S/M")]),e("div",[t._v("MARCA: PROSIS")]),e("div",[t._v("CANTIDAD: 1")])])},function(){var t=this,e=t._self._c;return e("thead",[e("tr",{staticClass:"text-sm text-center text-white trTable sm:text-xs"},[e("th",{staticClass:"w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sticky top-0"},[t._v("Seleccionar componente")]),e("th",{staticClass:"w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sticky top-0"},[t._v("Componente")]),e("th",{staticClass:"w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sm:hidden sticky top-0"},[t._v("No. Serie")]),e("th",{staticClass:"w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sticky top-0"},[t._v("Carril")])])])}],n=a("c7eb"),r=a("1da1"),i=(a("159b"),a("a434"),a("8e5f")),l=a.n(i),c=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"flex justify-center sm:hidden"},[e("div",{staticClass:"shadow-sm rounded pb-8 mt-8 w-full flex flex-col"},[e("div",{staticClass:"inline-flex font-titulo"},[e("div",{staticClass:"overflow-x-auto bg-white rounded-lg overflow-y-auto"},[e("table",{staticClass:"border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped"},[t._m(0),e("transition-group",{tag:"tbody",attrs:{name:"table"}},t._l(t.listaEquipo,(function(a,s){return e("tr",{key:s,staticClass:"hover:bg-blue-200 text-center text-xs h-12 xl:text-base"},[e("td",{staticClass:"cuerpoTable"},[t._v("1")]),e("td",{staticClass:"cuerpoTable"},[t._v(t._s(a.nameComponent))]),e("td",{staticClass:"cuerpoTable"},[t._v(t._s(a.brandPropuesto))]),e("td",{staticClass:"cuerpoTable"},[t._v(t._s(a.modelPropuesto))]),e("td",{staticClass:"cuerpoTable"},[e("input",{directives:[{name:"model",rawName:"v-model",value:a.serialnuevo,expression:"equipo.serialnuevo"}],staticClass:"text-center inputanexo",attrs:{type:"text",placeholder:a.serialNumber},domProps:{value:a.serialnuevo},on:{change:function(e){return t.generarlistanuevalistacomponentes(a)},input:function(e){e.target.composing||t.$set(a,"serialnuevo",e.target.value)}}})]),e("td",{staticClass:"cuerpoTable"},[t._v(t._s(a.lane))]),e("td",{staticClass:"cuerpoTable"},[t._v("Nuevo")])])})),0)],1)])]),e("div")])]),e("div",{staticClass:"mt-2 md:hidden lg:hidden xl:hidden flex justify-center flex-col"},[e("div",{class:{hidden:t.modal}},[e("div",{staticClass:"overflow-x bg-white rounded-lg shadow overflow-y-auto sm:text-xs sm:ml-4 sm:mr-4"},[e("table",{staticClass:"border-collapse font-titulo"},[t._m(1),e("tbody",t._l(t.listaEquipo,(function(a,s){return e("tr",{key:s,staticClass:"hover:bg-blue-200 text-center text-xs"},[e("td",{staticClass:"cuerpoTable"},[t._v(t._s())]),e("td",{staticClass:"cuerpoTable"},[t._v(t._s())])])})),0)])]),e("div")])])])},d=[function(){var t=this,e=t._self._c;return e("thead",[e("tr",{staticClass:"text-sm text-center text-white trTable sm:text-xs"},[e("th",{staticClass:"w-24 lg:w-36 xl:w-48 cabeceraTable font-medium"},[t._v("Cantidad")]),e("th",{staticClass:"w-32 lg:w-36 xl:w-48 cabeceraTable font-medium"},[t._v("Componente")]),e("th",{staticClass:"w-24 lg:w-36 xl:w-48 cabeceraTable font-medium"},[t._v("Marca")]),e("th",{staticClass:"w-24 lg:w-36 xl:w-48 cabeceraTable font-medium"},[t._v("Modelo")]),e("th",{staticClass:"w-24 lg:w-36 xl:w-48 cabeceraTable font-medium"},[t._v("No. Serie")]),e("th",{staticClass:"w-24 lg:w-36 xl:w-48 cabeceraTable font-medium"},[t._v("Ubicacion (carril/cuerpo)")]),e("th",{staticClass:"w-24 lg:w-36 xl:w-48 cabeceraTable font-medium"},[t._v("Observaciones")])])])},function(){var t=this,e=t._self._c;return e("thead",[e("tr",{staticClass:"border-gray-800 bg-blue-800 text-white text-xs text-center"},[e("th",{staticClass:"w-32 lg:w-36 xl:w-48 cabeceraTable font-medium"},[t._v("Componente")]),e("th",{staticClass:"w-24 lg:w-36 xl:w-48 cabeceraTable font-medium"},[t._v("Ubicacion (carril/cuerpo)")]),e("th",{staticClass:"w-24 lg:w-36 xl:w-48 cabeceraTable font-medium"},[t._v("No. Serie")])])])}],u=(a("c740"),{props:{listaEquipo:{type:Array,default:function(){return[]}}},data:function(){return{modal:!1,arrayobjetoseditados:[]}},watch:{listaEquipo:function(){console.info(this.listaEquipo)}},methods:{generarlistanuevalistacomponentes:function(t){var e={RequestedComponentId:t.requestedComponentId,SerialNumber:t.serialnuevo};if(0==this.arrayobjetoseditados)this.arrayobjetoseditados.push(e);else{var a=this.arrayobjetoseditados.findIndex((function(t){return t.RequestedComponentId===e.RequestedComponentId}));a<0?this.arrayobjetoseditados.push(e):this.arrayobjetoseditados.splice(a,1,e)}this.$emit("componentesfinales",this.arrayobjetoseditados)}}}),m=u,p=a("2877"),b=Object(p["a"])(m,c,d,!1,null,null,null),h=b.exports,f="http://201.99.110.3:86/api",v={name:"TablaEquipoMalo",components:{Multiselect:l.a,TablaEquipoPropuesto:h},data:function(){return{showModal:!1,datosPrePartida:{rowPartida:[],rowUnidad:[],rowName:"",rowCantidad:0,rowMarca:[],rowModelo:[],rowNumSerie:[],rowUbicacion:[],rowDateInstalacion:[],rowDateMantenimiento:[],rowFolioMantenimiento:[],rowDateReal:[],rowDateFabricante:[],rowPrecio:[],rowUp:!0},arrayPartidas:[],arraycomponentes:[],componentes:[],componentespush:[],arraycarriles:[],arraynombrecomponentes:[],componenteSeleccionado:"",scrollBool:!0,statusMetro:!1,cantidadMetro:0,listLane:[],laneSelect:[],saveObjectEdiar:[],objectEditar:{},updtCompEditar:"",listLaneEditar:[],laneSelectEditar:[],modal:!1,objectModal:{},pruebasMultiselect:[],relationShipPrincipal:"",arrayDmg:[],arraycomponententeseditados:[]}},props:{listaComponentes:{type:Array,default:function(){return[]}},dateSinester:{type:String,required:!0,default:""},plazareferencia:{type:String,default:""},dtcreference:{type:String,default:""},Editar:{type:Boolean,default:!1}},created:function(){},methods:{modalAgregarComp:function(){this.showModal=!0,document.body.classList.add("modal-open"),this.Editar?this.TraercomponentesDTCEditar():this.TraercomponentesDTC()},TraercomponentesDTC:function(){var t=this;return Object(r["a"])(Object(n["a"])().mark((function e(){var a,s;return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(f,"/AnexoDTC/ComponentesRequest/").concat(t.$route.params.referenceSquare,"/").concat(t.$route.params.referencenumber));case 3:return a=e.sent,e.next=6,a.json();case 6:s=e.sent,t.arraycomponentes=s.result,console.log(t.arraycomponentes),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))()},TraercomponentesDTCEditar:function(){var t=this;return Object(r["a"])(Object(n["a"])().mark((function e(){var a,s;return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(f,"/AnexoDTC/ComponentesRequest/").concat(t.plazareferencia,"/").concat(t.dtcreference));case 3:return a=e.sent,e.next=6,a.json();case 6:s=e.sent,t.arraycomponentes=s.result,console.log(t.arraycomponentes),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))()},botoncancelar_modal:function(){console.log(this.showModal),this.showModal=!1,console.log(this.componentespush.length),0==this.componentespush.length&&(this.componentes=[]),this.laneSelect="",this.componenteSeleccionado="",this.componentes=[],document.body.classList.remove("modal-open"),document.querySelector("body").classList.remove("overflow-hidden")},infoModal:function(t){this.modal=!0,this.objectModal=Object.assign(this.arrayPartidas[t])},agregarcomponentes:function(){var t=this;this.showModal=!1,document.body.classList.remove("modal-open"),this.componentespush=this.componentes,this.arraycarriles=[],this.componentes.forEach((function(e){return t.arraycarriles.push(e.lane)})),this.arraynombrecomponentes=[],this.componentes.forEach((function(e){return t.arraynombrecomponentes.push(e.nameComponent)})),this.$emit("listacarriles",this.arraycarriles),this.$emit("listanombrecom",this.arraynombrecomponentes),this.$emit("componentesmalos",this.componentes)},remove:function(t){this.componentes.splice(t,1),this.componentespush.splice(t,1),this.arraycomponententeseditados.splice(t,1),this.agregarcomponentes()},componenteseditadosnoserie:function(t){this.arraycomponententeseditados=t,this.$emit("componentesfinales",this.arraycomponententeseditados),console.log(this.arraycomponententeseditados)}}},w=v,C=(a("83c9"),Object(p["a"])(w,s,o,!1,null,"0af4d785",null));e["a"]=C.exports},a374:function(t,e,a){"use strict";var s=function(){var t=this,e=t._self._c;return e("Transition",{attrs:{name:"fade"}},[t.showing?e("div",{staticClass:"fixed inset-0 w-full h-screen flex items-center justify-center fondomodal"},[e("div",{staticClass:"relative w-full max-w-2xl bg-white shadow-lg rounded-lg p-8"},[t._t("default")],2)]):t._e()])},o=[],n={props:{showing:{required:!0,type:Boolean}},watch:{showing:function(t){if(t)return document.querySelector("body").classList.add("overflow-hidden");document.querySelector("body").classList.remove("overflow-hidden")}},methods:{}},r=n,i=(a("acc3"),a("2877")),l=Object(i["a"])(r,s,o,!1,null,"12b313b0",null);e["a"]=l.exports},acc3:function(t,e,a){"use strict";a("bb05")},bb05:function(t,e,a){}}]);
//# sourceMappingURL=chunk-eebb98f4.80128810.js.map