<template>
  <div>
    <Nav></Nav>
    <div class="m-0 bg-white">
      <form class="flex flex-no-wrap bg-white md:ml-5 md:mr-5 justify-center">
        <div
          class="shadow-sm rounded md:border border-black px-8 pt-6 pb-8 mt-8 w-full sm:screen flex flex-col flex-wrap my-2"
        >
          <!-- TituloyReferencia -->
          <div class="flex">
            <div class="w-1/5 h-14">
              <img src="../assets/img/prosis-logo.jpg" height="150" width="150" class="m-4" />
            </div>
            <div class="w-3/5 h-14">
              <h1 class="title">Dictamen Tecnico y Cotizacion</h1>
            </div>
            <div class="w-1/5 h-14">
              <br />
              <label class="m-16" style="font-weight: normal">Referencia:</label>
              <label style="font-weight: bold">{{datos.ReferenceNumber}}</label>
            </div>
          </div>

          <!-- SubTitulo -->
          <div class="flex">
            <div class="w-1/5 h-14 pt-4">
              <br />
              <label class for="inline-full-name" style="font-weight: normal">Contrato / Oferta:</label>
              <label style="font-weight: bold; padding-left: 0.5vw">{{4500029287}}</label>
            </div>
            <div class="divtitle2 h-14">
              <br />
              <h6 class="title2">En caso de Siniestro</h6>
            </div>
            <div class="w-1/5 h-14">
              <br />
              <label class for="inline-full-name" style="font-weight: normal">Tipo de Dictamen:</label>
              <label class for="inline-full-name" style="padding-left: 0.5vw">CORRECTIVO</label>
            </div>
          </div>
          <div class="divtitle2"></div>
          <hr />
          <br />

          <div class="flex items-center mb-4">
            <div class="w-1/4 h-8">
              <label class="atntn" for="inline-full-name">Atencion:</label>
              <label style="font-weight: normal; padding-left: 1.7vw">{{this.datosUser.managerName}}</label>
            </div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">No. Siniestro:</label>
              <input
                v-model="datos.SinisterNumber"
                class="md:border border-black h-8"
                id="grid-last-name"
                type="text"
                style="margin-left: 1.6vw"
                placeholder
              />
            </div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Reporte:</label>
              <input
                v-model="datos.ReportNumber"
                class="md:border border-black h-8"
                id="grid-last-name"
                type="text"
                style="margin-left: .6vw"
                placeholder="10301/3030099"
              />
            </div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Tipo de Descripcion:</label>
              <select
                v-model="datos.TypeDescriptionId"
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                id="convenios"
                style="margin-left:1vw; width: 10vw;"
                type="text"
              >
                <option disabled value>Selecionar...</option>
                <option
                  v-for="(desc, index) in listaDescripciones"
                  v-bind:value="desc.value"
                  :key="index"
                >{{desc.text}}</option>
              </select>
            </div>
          </div>

          <!--***********************************************************-->

          <div class="flex mb-4 items-center">
            <div class="w-1/4 h-14 content-center" style="align-items: center; font-size: 15px">
              <label class="atntn" for="inline-full-name">Cargo:</label>
              <label style="font-weight: normal; padding-left: 2.7vw">{{this.datosUser.posicion}}</label>
            </div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Fecha Siniestro:</label>
              <input
                v-model="datos.SinisterDate"
                class="fecha appearance-none bg-grey-lighter text-grey-darker border border-black h-8"
                type="date"
                style="margin-left: .6vw"
              />
            </div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Fecha de Envio:</label>
              <input
                @change="crearReferencia()"
                v-model="datos.ShippingElaboracionDate"
                class="fecha appearance-none w-40 bg-grey-lighter text-grey-darker border border-black h-8"
                type="date"
                style="margin-left: 2.9vw"
              />
            </div>
          </div>

          <!--***********************************************************-->

          <div class="flex mb-4 items-center">
            <div class="w-1/4 h-8 content-center" style="align-items: center">
              <label class="atntn" for="inline-full-name">Correo:</label>
              <label style="color: blue; padding-left: 2.5vw">{{this.datosUser.mail}}</label>
            </div>
            <div class="w-1/4 h-8">
              <label class="h-8" for="inline-full-name">Folio Falla:</label>
              <input
                v-model="datos.FailureNumber"
                class="md:border border-black h-8"
                id="grid-last-name"
                type="text"
                style="margin-left: 2.6vw"
                placeholder="S/M"
              />
            </div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Fecha Elaboracion:</label>
              <input
                v-model="datos.ShippingElaboracionDate"
                class="fecha appearance-none w-40 bg-grey-lightertext-grey-darker border border-black h-8"
                type="date"
                style="margin-left: 1.7vw"
              />
            </div>
          </div>

          <!--***********************************************************-->
          <div class="flex mb-4 items-center">
            <div class="w-1/4 h-8 content-center" style="align-items: center">
              <label class="atntn" for="inline-full-name">Plaza Cobro:</label>
              <label
                class
                for="inline-full-name"
                style="padding-left: 0.2vw; font-weight: normal"
              >{{datosUser.plaza}}</label>
              <!-- <select
                v-model="datosUser.plazaCobro"
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                id="convenios"
                style="margin-left: 0.5vw; width: 9vw;"
                type="text"
              >
                <option
                  v-for="(conv, index) in listUser"
                  v-bind:value="conv.plaza"
                  :key="index"
                >{{conv.plaza}}</option>
              </select>-->
            </div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Fecha Falla:</label>
              <input
                v-model="datos.FailureDate"
                class="fecha appearance-none w-40 bg-grey-lightertext-grey-darker border border-black h-8"
                type="date"
                style="margin-left: 2.2vw"
              />
            </div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Tecnico Responsable:</label>
              <input
                v-model="datosUser.nombre"
                class="md:border border-black h-8"
                id="grid-last-name"
                type="text"
                style="margin-left: .7vw"
                placeholder="S/M"
              />
            </div>
          </div>

          <!--***********************************************************-->

          <div class="flex mb-4 items-center">
            <div class="w-1/4 h-8 content-center"></div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Coordinacion Regional: ----------</label>
            </div>
          </div>

          <!--***********************************************************-->

          <div class="flex mb-4 items-center">
            <div class="w-1/4 h-8 content-center"></div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Centro de Servicio:</label>
              <label class="staticLabel" for="inline-full-name h-8" style="margin-left: 1.8vw">CDMX</label>
            </div>
          </div>
          <!--***********************************************************-->

          <div class="grid-container2 mb-8">
            <div></div>

            <div></div>

            <div></div>

            <div class="labelInput3 mb-3">
              <label class for="inline-full-name">Correo:</label>
              <label
                class="staticLabel"
                for="inline-full-name"
                style="margin-left: 1.8vw"
              >hguzman@grupo-prosis.com</label>
            </div>
            <br />
          </div>
          <br />
          <br />

          <!-- ************************************************************** -->

          <div class="divtitle2 h-14 mt-48">
            <h6 class="title2">Equipo Dañado</h6>
          </div>
          <br />

          <!-- ************************************************************** -->

          <!-- <div class="grid-container3" style="text-align: center">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div class="labelInput">
              <label class="atntn" for="inline-full-name">Ultimo Mantenimiento</label>
            </div>

            <div class="labelInput2">
              <label class for="inline-full-name">Tiempo de Vida:</label>
            </div>
          </div>
          <br />-->

          <!-- ************************************************************** -->

          <table class="border-gray-700 border-solid" style="width:100%">
           
            <tr>
              <th>Partida</th>
              <th>Unidad</th>
              <th style="color: red;">Componente</th>    
              <th style="width: 2vw; color: red;">Cantidad</th>                        
              <th>Marca</th>
              <th>Modelo</th>
              <th>Numero de Serie</th>
              <th style="color: red">
                Ubicacion
                <br />(carril/cuerpo)
              </th>
              <th>Fecha de Instalacion</th>
              <th class="text-xs">
                Fecha
                <br />(Ultimo Mantenimiento)
              </th>
              <th class="text-xs">
                Folio
                <br />(Ultimo Mantenimiento)
              </th>
              <th>Real</th>
              <th>Fabricante</th>
              <th>+</th>
            </tr>
           
            <tr
              style="text-align: center"
              class="hover:bg-blue-200 text-center"
              v-for="(equipo, index) in listX"
              :key="index"
            >
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row1}}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row2 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row3 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row4 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row5 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row6 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row7 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row8 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row9 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row10 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row11 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row13 }}</td>
              <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row12 }}</td>

              <td class="border-b border-black md:p-3 border-2">
                <button
                  @click="eliminarRefaccion(pieza)"
                  class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-red-400 hover:bg-red-500"
                >Eliminar</button>
              </td>
            </tr>           
            <tr style="text-align: center">
              <td class="border-b border-black p-2 md:p-1 border-2">{{'*'}}</td>
              <td class="border-b border-black p-2 md:p-1 border-2">
                <input
                  v-model="datosDmg.unity"
                  disabled
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                  type="text"
                  style="width: 6vw"
                  placeholder="Pza"
                />
              </td>
              
              <td
                class="border-b border-black p-2 md:p-1 border-2"
                v-bind:class="{ 'border-blue-600': boolComponent, 'border-solid': boolComponent, 'border-2': boolComponent, 'bg-blue-200': boolComponent}"
              >
                <select
                  @change="UpdateComp()"
                  v-model="updtComp"
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                  style="width: 10vw;"
                  type="text"
                >
                  <option disabled value="">Selecionar...</option>
                  <option
                    v-for="(item, index) in listaComponentes"
                    v-bind:value="item.value"
                    :key="index"
                  >{{item.text}}</option>
                </select>
              </td>           
              <td class="border-b border-black p-2 md:p-1 border-2"
             
                >

                   <input
                  v-model="datosDmg.cantidad"
                  disabled
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                  type="text"
                  style="width: 6vw"
                  
                />      
              </td>

              <td class="border-b border-black p-2 md:p-1 border-2">
                <input
                  v-model="datosDmg.brand"
                  disabled
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                  type="text"
                  style="width: 6vw"
                  placeholder="M60-31"
                />
              </td>
              <td class="border-b border-black p-2 md:p-1 border-2">
                <input
                  v-model="datosDmg.model"
                  disabled
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                  type="text"
                  style="width: 6vw"
                  placeholder="FD1103"
                />
              </td>
              <td class="border-b border-black p-2 md:p-1 border-2">
                <input
                  disabled
                  v-model="datosDmg.serialNumber"
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                  type="text"
                  style="width: 6vw"
                  placeholder="S/N"
                />
              </td>
              <td class="border-b border-black p-2 md:p-1 border-2"
                  v-bind:class="{ 'border-blue-600': boolCarril, 'border-solid': boolCarril, 'border-2': boolCarril, 'bg-blue-200': boolCarril}"
                  
                  
              >
              
                <multiselect                                   
                      v-model="value"                 
                      :close-on-select="false"
                      :clear-on-select="true"                        
                      :hideSelected="false"                      
                      placeholder="Selecciona..."        
              
                :options="listLane" multiple="true">
                <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} Carriles</span></template>
  
                </multiselect>
              
      
                
              </td>
              <td class="border-b border-black p-2 md:p-1 border-2">
                <input
                  disabled
                  v-model="datosDmg.instalationDate"
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                  style="width: 7vw"
                  type="text"
                />
              </td>
              <td class="border-b border-black p-2 md:p-1 border-2">
                <input
                  v-model="datosDmg.fechaUltimoMant"
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                  style="width: 7vw"
                  type="date"
                />
              </td>
              <td class="border-b border-black p-2 md:p-1 border-2">
                <input
                  v-model="datosDmg.folioMant"
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                  style="width: 7vw"
                  placeholder="Folio"
                  type="text"
                />
              </td>
              <td class="border-b border-black p-2 md:p-1 border-2">
                <input
                  v-model="datosDmg.fechaFabricante"
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                  type="text"
                  style="width: 4vw"
                  placeholder="Numero de años"
                />
              </td>
              <td class="border-b border-black p-2 md:p-1 border-2">
                <input
                  disabled
                  v-model="datosDmg.lifeTime"
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                  type="text"
                  style="width: 6vw"
                  placeholder="Numero de años"
                />
              </td>
              <td class="border-b border-black p-2 md:p-1 border-2">
                <button
                  @click="agregaPartida()"
                  :disabled="compruebaPartida"
                  class="appearance-none bg-green-400 w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                  style="width: 6vw"
                >Agregar Partida</button>
              </td>
            </tr>
          </table>
          <br />

          <!-- ************************************************************** -->
          <br />
          <div class="divtitle2">
            <h6 class="title2" style="font-size: 1.3rem">Equipo Propuesto</h6>
          </div>
          <br />

          <!-- ************************************************************** -->
          <div class="lastContainer">
            <table class style="width:71%">
              <tr>
                <th>Partida</th>
                <th>Unidad</th>
                <th>Componente</th>
                <th>Cantidad</th>                
                <th>Marca</th>
                <th>Modelo</th>
                <th>
                  Precio
                  <br />(Unitario Peso)
                </th>
                <th>
                  Precio
                  <br />(Unitario Dolar)
                </th>
                <th>
                  Precio Total
                  <br />(Pesos)
                </th>
                <th>
                  Precio Total
                  <br />(Dolares)
                </th>
              </tr>

              <tr
                style="text-align: center"
                class="hover:bg-blue-200 text-center"
                v-for="(equipo, index) in listX"
                :key="index"
              >
                <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row1}}</td>
                <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row2 }}</td>
                <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row3 }}</td>
                <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row4 }}</td>
                <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row5 }}</td>
                <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row6 }}</td>
                <td class="border-b border-black p-2 md:p-3 border-2">{{ equipo.row15 }}</td>
                <td class="border-b border-black p-2 md:p-3 border-2">{{ '-----' }}</td>
                <td class="border-b border-black p-2 md:p-3 border-2">{{ '-----' }}</td>
                <td class="border-b border-black p-2 md:p-3 border-2">{{ '-----' }}</td>
              </tr>
            </table>

            <div class="divDescription" style="width: 20%">
              <tr>
                <th>Descripcion</th>
              </tr>
              <td>
                <textarea
                  v-model="datos.Diagnosis"
                  class="appearance-none block width-64 bg-grey-lighter text-grey-darker border border-black rounded-lg py-4 mb-0"
                  style="width: 20vw;"
                  id="grid-last-name"
                />
              </td>
            </div>
          </div>

          <div>
            <div class="flex mb-4">
              <div class="w-1/6 h-6 pl-4">
                <span class="relleno">Total M.N.</span>
              </div>
              <div class="w-1/3 h-6">
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 26vw;"
                  placeholder="(Treinta y Cinco Mil ciento Sesenta y Nueve Pesos 17/100 M.N.)"
                />
              </div>
              <div class="w-1/6 h-6 pl-40">
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 7vw;"
                  placeholder="$ 0.00"
                />
              </div>
              <div class="w-1/6 h-6 pl-3">
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 7vw;"
                  placeholder="$ 0.00"
                />
              </div>
              <div class="w-1/6 h-6"></div>
              <div class="w-1/6 h-6"></div>
            </div>
            <hr />
          </div>

          <br />
          <div>
            <div class="flex mb-4">
              <div class="w-1/4 h-56 border border-black">
                <p>
                  <span style="font-weight: bold">Tiempo de entrega:</span>
                  <br />
                  <span style="font-weight: bold">Vigencia de la Cotización:</span> 15 días calendario, a partir de la fecha del presente.
                  <br />
                  <span style="font-weight: bold">Forma de Pago:</span> 100% al término de los trabajos.
                  <br />
                  <span style="font-weight: bold">Precios en M.N:</span> No incluyen IVA, el cual se cargara al momento de facturarse. En caso de una variación de la paridad Peso/Dólar mayor al 5%, se revisarán los precios.
                  <br />
                  <span style="font-weight: bold">Precios en USCY:</span>
                  No incluyen IVA, el cual se cargará al momentode facturarse.
                </p>
              </div>
              <div class="w-1/4 h-12"></div>
              <div class="w-1/4 h-48">
                <span style="font-weight: bold">Observaciones</span>
                <br />
                <textarea
                  v-model="datos.Observation"
                  class="appearance-none block bg-grey-lighter text-grey-darker border border-black rounded-lg py-4 mb-0 h-40"
                  style="width: 23vw;"
                  id="grid-last-name"
                />
              </div>
              <div class="w-1/4 h-12"></div>
            </div>
          </div>

          <br />
          <div>
            <div class="flex mb-4">
              <div class="w-1/4 h-40 border border-black items-center">
                <p style="text-align: center">
                  <span style="font-weight: bold">Autorizacion Tecnica y Comercial:</span>

                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <span>Autorizacion comercial Director de Comercializacion</span>
                  <br />
                  <span style="font-size: 0.7vw">C.P. Hermilia Guzman</span>
                </p>
              </div>
              <div class="w-1/4 h-12"></div>
              <div class="w-1/4 h-12"></div>
              <div class="w-1/4 h-40 border border-black">
                <p style="text-align: center">
                  <br />
                  <br />
                  <br />
                  <br />
                  <span style="font-weight: bold">Jose Juan Iturbide Espin</span>
                </p>
                <hr />
                <p style="text-align: center">
                  <span>Administrador Plaza de Cobro</span>
                  <br />
                  <span>c102adm@capufe.gob.mx</span>
                </p>
              </div>
            </div>
          </div>
          <div class="-mx-3 md:flex mb-6">
            <div class="mt-6 mb-6 md:mb-0">
              <button
                @click="crearDTCTecnico()"
                class="text-grey-lighter py-3 md:py-8 w-full md:w-64 font-bold rounded text-xs bg-green-400 hover:bg-green-500"
              >Crear</button>
              <multiselect></multiselect>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Navbar";
import Multiselect from "vue-multiselect";

export default {
  name: "CrearDTC",
  components: {
    Nav,
    Multiselect
  },
  data() {
    return {
      updtComp: "",
      updtCarril: "",
      datos: {
        ReferenceNumber: "",
        SinisterNumber: "",
        ReportNumber: "",
        SinisterDate: "",
        FailureDate: "",
        FailureNumber: "",
        ShippingElaboracionDate: "",
        Diagnosis: "",
        Observation: "",
        TypeDescriptionId: null,
        userId: null,
        agremmentInfoId: null
      },
      datosUser: {
        numConvenio: "4500029287",
        managerName: "",
        posicion: "",
        mail: "",
        plazaCobro: ""
      },
      //Objeto Que se Inserta en listX
      datosDmg: {
        partida: 0,
        unity: "",
        cantidad: 0,
        description: "",
        brand: "",
        model: [],
        serialNumber: "",
        lane: [],
        instalationDate: "",
        fechaUltimoMant: "",
        folioMant: "",
        lifeTime: "",
        fechaFabricante: "",
        unitaryPrice: ""
      },
      listaDescripciones: [],
      listUser: [],
      listaComponentes: [],
      listaHeaders: [
        { value: "1", text: "1" },
        { value: "2", text: "2" }],
      listX: [],
      listy: [],
      listEquipoMalo: [],      
      loader: false,
      value: [],
      listLane: [],

      //Boleanos para Guia Llenado          
      boolComponent: true,
      boolCarril: false

    };
  },
  methods: {
    crearReferencia() {
      let diaActual = parseInt(this.datos.ShippingElaboracionDate.substr(8, 2));
      let mesActual = parseInt(this.datos.ShippingElaboracionDate.substr(6, 2));
      let yearActual = parseInt(
        this.datos.ShippingElaboracionDate.substr(0, 4)
      );
      let diaCorriente = 0;
      let newYear = parseInt(this.datos.ShippingElaboracionDate.substr(2, 2));

      diaCorriente = diaActual;

      for (let i = 1; i < mesActual; i++) {
        diaCorriente += parseInt(new Date(yearActual, i, 0).getDate());
      }

      let numPlaza = parseInt(this.datosUser.plaza.substr(0, 3));

      let nomPlaza = "";

      if (numPlaza != null) {
        if (numPlaza == "004") nomPlaza = "TPZ";
        else if (numPlaza == "102") {
          nomPlaza = "PMO";
        } else if (numPlaza == "006") nomPlaza = "QRO";
        else if (numPlaza == "041") nomPlaza = "SLM";
        else if (numPlaza == "061") nomPlaza = "LBM";
        else if (numPlaza == "069") nomPlaza = "JOR";
        else if (numPlaza == "070") nomPlaza = "POL";
        else if (numPlaza == "127") nomPlaza = "CHI";
        else if (numPlaza == "183") nomPlaza = "VIL";
        else if (numPlaza == "186") nomPlaza = "CGO";
        else nomPlaza = "Inserte un numero correcto";
      } else {
        ("Inserte un numero correcto");
      }

      let autoCompleteDias;

      if (diaCorriente < 10) {
        autoCompleteDias = "00" + diaCorriente.toString();
      } else if (diaCorriente < 100) {
        autoCompleteDias = "0" + diaCorriente.toString();
      } else {
        autoCompleteDias = diaCorriente.toString();
      }

      this.datos.ReferenceNumber = nomPlaza + "-" + newYear + autoCompleteDias;
    },

    agregaPartida() {
      console.log(this.datosDmg);

      let newobjectTable = {
        row1: this.listX.length + 1,
        row2: this.datosDmg.unity,
        row3: this.datosDmg.description  ,
        row4: this.datosDmg.cantidad,
        row5: this.datosDmg.brand,
        row6: this.datosDmg.model,
        row7: this.datosDmg.serialNumber,
        row8: this.datosDmg.lane,
        row9: this.datosDmg.instalationDate,
        row10: this.datosDmg.fechaUltimoMant,
        row11: this.datosDmg.folioMant,
        row12: this.datosDmg.lifeTime,
        row13: this.datosDmg.fechaFabricante,
        row14: this.datosDmg.fechaFabricante,
        row15: this.datosDmg.unitaryPrice
      };

      this.listX.push(newobjectTable);
      this.listy.push(newobjectTable);

      this.datosDmg.folioMant = "";
      this.datosDmg.lane = [];
      this.datosDmg.brand = "";
      this.datosDmg.cantidad = ''
      this.datosDmg.description = '';
      this.datosDmg.fechaFabricante = "";
      this.datosDmg.fechaUltimoMant = "";
      this.datosDmg.instalationDate = "";
      this.datosDmg.lifeTime = "";
      this.datosDmg.model = "";
      this.datosDmg.serialNumber = "";
      this.datosDmg.unitaryPrice = "";
      this.datosDmg.unity = "";
      this.updtCarril = "";
      this.listLane = []
      this.value = []
      this.updtComp = ''
      
      this.boolCarril = false
      this.boolComponent = true      
    },  
    multiplicacion() {
      this.datosDmg.unitaryPrice * this.datosDmg.cantidad;
    },
    crearDTC() {},
    processFile(e) {
      const file = e.target.files[0];

      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }

      if (typeof FileReader === "function") {
        const reader = new FileReader();

        reader.onload = event => {
          this.imgSrc = event.target.result;
        };
        reader.readAsDataURL(file);
        alert(reader);
        this.datos.Imagen = reader.result;
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    async getCarriles() {
      console.log(this.datos.Plaza);
      await this.$store.dispatch(
        "Carriles/buscarCarrilesPlaza",
        this.datos.Plaza
      );
      this.listaCarriles = await this.$store.getters[
        "Carriles/getListaCarriles"
      ];
    },
    async buscarHeaders() {
      console.log(this.datos.Header);
      await this.$store.dispatch("Header/buscarHeaders", this.datos.Header);
      this.listaCarriles = await this.$store.getters[
        "Carriles/getListaCarriles"
      ];
    },

    crearDTCTecnico() {
      // let diaActual = parseInt(this.datos.ShippingElaboracionDate.substr(8, 2));
      // let mesActual = parseInt(this.datos.ShippingElaboracionDate.substr(6, 2));
      // let yearActual = parseInt(
      //   this.datos.ShippingElaboracionDate.substr(0, 4)
      // );
      // let diaCorriente = 0;
      // let newYear = parseInt(this.datos.ShippingElaboracionDate.substr(2, 2));

      // diaCorriente = diaActual;

      // for (let i = 1; i < mesActual; i++) {
      //   diaCorriente += parseInt(new Date(yearActual, i, 0).getDate());
      // }

      // let numPlaza = parseInt(this.datosUser.plazaCobro.substr(0, 3));

      // let nomPlaza = "";

      // if (numPlaza != null) {
      //   if (numPlaza == "004") nomPlaza = "TPZ";
      //   else if (numPlaza == "102") {
      //     nomPlaza = "PMO";
      //   } else if (numPlaza == "006") nomPlaza = "QRO";
      //   else if (numPlaza == "041") nomPlaza = "SLM";
      //   else if (numPlaza == "061") nomPlaza = "LBM";
      //   else if (numPlaza == "069") nomPlaza = "JOR";
      //   else if (numPlaza == "070") nomPlaza = "POL";
      //   else if (numPlaza == "127") nomPlaza = "CHI";
      //   else if (numPlaza == "183") nomPlaza = "VIL";
      //   else if (numPlaza == "186") nomPlaza = "CGO";
      //   else nomPlaza = "Inserte un numero correcto";
      // } else {
      //   ("Inserte un numero correcto");
      // }

      // let autoCompleteDias;

      // if (diaCorriente < 10) {
      //   autoCompleteDias = "00" + diaCorriente.toString();
      // } else if (diaCorriente < 100) {
      //   autoCompleteDias = "0" + diaCorriente.toString();
      // } else {
      //   autoCompleteDias = diaCorriente.toString();
      // }

      // this.datos.ReferenceNumber = nomPlaza + "-" + newYear + autoCompleteDias;

      this.$store.dispatch("DTC/crearDTCTecnico", this.datos);
      this.$router.push("/home/");
    },
    actualizarCapufeId() {
      for (let i = 0; i < this.listaCarriles.length; i++) {
        if (this.datos.Carril == this.listaCarriles[i].capufeLaneNum) {
          this.datos.LanesCatalogIdGare == this.listaCarriles[i].idGare;
          console.log(this.listaCarriles[i].capufeLaneNum);
        }
      }
    },
    actualizarIdGare() {
      for (let i = 0; i < this.listaCarriles.length; i++) {
        if (this.datos.Carril == this.listaCarriles[i].capufeLaneNum) {
          console.log(this.listaCarriles[i].idGare);
        }
      }
    },
    async UpdateComp() {
      this.updtCarril = "";
      this.datosDmg.folioMant = "";
      this.datosDmg.brand = "";
      this.datosDmg.cantidad = 0
      this.datosDmg.lane = []
      this.datosDmg.description = "";
      this.datosDmg.fechaFabricante = "";
      this.datosDmg.fechaUltimoMant = "";
      this.datosDmg.instalationDate = "";
      this.datosDmg.lifeTime = "";
      this.datosDmg.model = "";
      this.datosDmg.serialNumber = [];
      this.datosDmg.unitaryPrice = "";
      this.datosDmg.unity = "";
      this.updtCarril = "";
      this.value = []

      let newObject = {
        numConvenio: this.datosUser.agrement,
        numPlaza: this.datosUser.plaza.substr(0, 3),
        id: this.updtComp
      };

      console.log(newObject);

      await this.$store.dispatch("Refacciones/buscarComponenteId", newObject);
      this.listEquipoMalo = await this.$store.getters[
        "Refacciones/getListaRefacciones"
      ];

      this.listLane = await this.$store.getters[
        "Refacciones/getListaLane"
      ];
           
      for(let i = 0; i < this.listEquipoMalo.length; i++){

          if(this.listEquipoMalo[i].componentsStockId == this.updtComp){

              this.datosDmg.unitaryPrice = this.listEquipoMalo[i].unitaryPrice
              this.datosDmg.description = this.listEquipoMalo[i].description
              this.datosDmg.unity = this.listEquipoMalo[i].unity
              this.datosDmg.brand = this.listEquipoMalo[i].brand
              this.datosDmg.model = this.listEquipoMalo[i].model
              this.datosDmg.instalationDate = this.listEquipoMalo[i].instalationDate
              this.datosDmg.lifeTime = this.listEquipoMalo[i].lifeTime 
          }

      }       

      this.boolComponent = false
      
   

      this.datos
      console.log(this.listEquipoMalo);
    }
  },
  async beforeMount() {
    this.listUser = await this.$store.getters["Login/getUser"];

    for (let i = 0; i < this.listUser.length; i++) {
      if (this.listUser[i].agrement == "4500029287") {
        this.datos.userId = this.listUser[i].userId;
        this.datos.agremmentInfoId = this.listUser[i].agremmentInfoId;
        this.datosUser.nombre = this.listUser[i].nombre;
        this.datosUser.plaza = this.listUser[i].plaza;
        this.datosUser.agrement = this.listUser[i].agrement;
        this.datosUser.managerName = this.listUser[i].managerName;
        this.datosUser.posicion = this.listUser[i].position;
        this.datosUser.mail = this.listUser[i].mail;
        this.datosUser.agremmentDate = this.listUser[i].agremmentDate;
        this.datosUser.delegationName = this.listUser[i].delegationName;
      }
    }

    await this.$store.dispatch("Refacciones/buscarComponentes");
    this.listaComponentes = this.$store.getters[
      "Refacciones/getListaRefacciones"
    ];
    // for (let i = 0; i < this.listUser.length; i++) {
    //   if (this.listUser[i].agrement == "4500029287") {
    //     console.log(this.listUser[i].agrement)
    //   }
    // }
    await this.$store.dispatch("DTC/buscarDescriptions");
    this.listaDescripciones = this.$store.getters["DTC/getListaDescriptions"];
  },
  computed: {

    compruebaPartida() {
      if (
        
        this.updtComp != "" &&
        this.datosDmg.cantidad != "" &&
        this.datosDmg.fechaFabricante != "" &&
        this.datosDmg.fechaFabricante != ""    
      )
        return false;
      else return true;
    }
  },
  watch: {
    value: function(newValue) {
      console.log(this.value);
      
      this.datosDmg.serialNumber = []
      for(let i = 0; i < newValue.length; i++){

          if(this.listEquipoMalo[i].lane == newValue[i]){
            this.datosDmg.serialNumber.push(this.listEquipoMalo[i].serialNumber)
          }

      }  

      this.datosDmg.lane = newValue  
      this.datosDmg.cantidad =  newValue.length

      if(newValue.length > 0 || newValue.length == 0){
        this.boolCarril = false    
      }
      else
        this.boolCarril = true
    }
  }
};
</script>



<style scoped>
.title {
  text-align: center;
  font-weight: bold;
  font-size: 2vw;
  border: 2px solid black;
}

.divtitle {
  margin: 0 auto;
}

.divtitle2 {
  margin: 0 auto;
}

.title2 {
  text-align: center;
  font-weight: bold;
  margin-bottom: 20%;
  margin-top: 30%;
  font-size: 1.2vw;
  border: 2px solid black;
}

.imgRefNum {
  display: grid;
  grid-template-columns: 20% 80%;
}

.input {
  text-align: end;
  padding-top: 5vh;
}

.fecha {
  width: 12.1rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  font-size: 0.85rem;
  margin-bottom: -5vh;
}

.grid-container3 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  font-size: 0.85rem;
  margin-bottom: -5vh;
  padding-left: 3vw;
}

label {
  font-weight: bold;
  color: black;
  font-family: Tahoma, Geneva, Verdana, sans-serif;
}

.grid-container2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  font-size: 0.85rem;
  margin-bottom: -4vh;
  overflow: hidden;
}

.staticLabel {
  font-weight: normal;
}

.lastContainer {
  display: flex;
  flex-direction: row;
}

.divDescription {
  display: inline-block;
  padding-left: 2vw;
  width: 10vw;
}

.divLastTable {
  display: inline-block;
  padding-bottom: 1vh;
}

.inputDesc {
  height: 10vh;
  width: 18vw;
}

.divLastTable {
  border-spacing: 10px;
  border-collapse: separate;
  display: inline-block;
}

.relleno {
  display: inline-block;
}

@media (max-width: 750px) {
  .grid-container {
    margin-bottom: 0;
  }
  .grid-container2 {
    margin-bottom: 0;
  }
}
</style>