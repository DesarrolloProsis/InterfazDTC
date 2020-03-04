<template>
  <div>
    <Nav></Nav>
    <div class="m-0 bg-white">
      <form class="flex flex-no-wrap bg-white md:ml-5 md:mr-5 justify-center">
        <!--  PRIMER ENCABEZADO CENTRAL -->
        <div
          class="shadow-sm rounded md:border border-black px-8 pt-6 pb-8 mt-8 w-full sm:screen flex flex-col flex-wrap my-2"
        >
          <div class="flex">
            <div class="w-1/5 h-14">
              <img src="../assets/img/prosis-logo.jpg" height="150" width="150" class="m-4" />
            </div>
            <div class="w-3/5 h-14">
              <h1 class="title">Dictamen Tecnico y Cotizacion</h1>
            </div>
            <div class="w-1/5 h-14">
              <br />
              <label
                class="m-16"
                for="inline-full-name"
                style="font-weight: normal"
              >Referencia: </label>
              <label
                class
                for="inline-full-name"
                style="font-weight: bold"
              >{{datos.ReferenceNumber}}</label>
            </div>
          </div>

          <!-- SEGUNDO ENCABEZADO CENTRAL -->
          <div class="flex">
            <div class="w-1/5 h-14 pt-4">
              <br />
              <label class for="inline-full-name" style="font-weight: normal">Contrato / Oferta:</label>
              <!-- <label>{{NumConvenioCush}}</label> -->
              <label style="font-weight: bold">{{4500029287}}</label>
            </div>
            <div class="divtitle2 h-14">
              <br />
              <h6 class="title2">En caso de Siniestro</h6>
            </div>
            <div class="w-1/5 h-14">
              <br />
              <label class for="inline-full-name">Tipo de Dictamen: CORRECTIVO</label>
            </div>
          </div>
          <div class="divtitle2"></div>
          <hr />
          <br />

          <!-- *********************************************************** -->

          <div class="flex items-center mb-4">
            <div class="w-1/4 h-8">
              <label class="atntn" for="inline-full-name">Atencion:</label>
              <label style="font-weight: normal">{{this.datosUser.managerName}}</label>
              <!-- <select
              v-model="datos.managerName"
              class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
              id="convenios"
              style="margin-left: 2vw; width: 9vw;"
              type="text"
            >
             <option disabled value>Selecionar...</option>
              <option 
                v-for="(mnaName, index) in listUser"
                v-bind:value="mnaName.mangerName"
                :key="index"
              >{{mnaName.mangerName}}</option>
              </select>-->
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
              <label class for="inline-full-name">Descripcion:</label>
              <select
                v-model="datos.Description"
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                id="convenios"
                style="margin-left: 4.1vw; width: 10vw;"
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
              <label style="font-weight: normal">{{datosUser.posicion}}</label>
              <!-- <select
              v-model="datos.Positiom"
              class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
              id="convenios"
              style="margin-left: 2vw; width: 9vw;"
              type="text"
            >
              <option 
                v-for="(posi, index) in listUser"
                v-bind:value="posi.posicion"
                :key="index"
              >{{posi.posicion}}</option>
              </select>-->
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
              <label style="color: blue">{{datosUser.mail}}</label>
              <!-- <select
              v-model="datos.Email"
              class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
              id="convenios"
              style="margin-left: 2vw; width: 9vw;"
              type="text"
            >
             <option disabled value>Selecionar...</option>
              <option 
                v-for="(conv, index) in listUser"
                v-bind:value="conv.mail"
                :key="index"
              >{{conv.mail}}</option>
              </select>-->
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
              <select
                v-model="datosUser.plazaCobro"
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                id="convenios"
                style="margin-left: 2vw; width: 9vw;"
                type="text"
              >
                <option disabled value>Selecionar...</option>
                <option
                  v-for="(conv, index) in listUser"
                  v-bind:value="conv.plazaHeader"
                  :key="index"
                >{{conv.plazaHeader}}</option>
              </select>
              <!-- <select
            @change="getCarriles()"
            v-model="datos.PlazaCobro"
            class="appearance-none w-sm bg-grey-lightertext-grey-darker border border-black py-1"
            id="convenios"
            type="text"
          >
            <option disabled value>Selecionar...</option>
            <option
              v-for="(plaza, index) in listaPlazas"
              v-bind:value="plaza.value"
              :key="index"
            >{{plaza.text}}</option>
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
              <label style="font-weight: normal">{{datosUser.tecResponsable}}</label>
              <!-- <select
              v-model="datos.ResponsableName"
              class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
              id="convenios"
              style="margin-left: 2vw; width: 9vw;"
              type="text"
            >
             <option disabled value>Selecionar...</option>
              <option 
                v-for="(conv, index) in listUser"
                v-bind:value="conv.nombreTec"
                :key="index"
              >{{conv.nombreTec}}</option>
              </select>-->
            </div>
          </div>

          <!--***********************************************************-->

          <div class="flex mb-4 items-center">
            <div class="w-1/4 h-8 content-center"></div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8"></div>
            <div class="w-1/4 h-8">
              <label class for="inline-full-name">Coordinacion Regional: ----------</label>
              <!-- <input
                v-model="datos.ReferenceNum"
                class="md:border border-black h-8"
                id="grid-last-name"
                type="text"
                style="margin-left: 0.1vw"
                placeholder
              />-->
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

          <div class="grid-container2">
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
          <div class="divtitle2 h-14">
            <h6 class="title2">Equipo Dañado</h6>
          </div>
          <br />

          <!-- ************************************************************** -->
          <div class="grid-container3" style="text-align: center">
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
          <br />

          <!-- ************************************************************** -->

          <table style="width:100%, border: 2 px solid black">
            <tr>
              <th>Partida</th>
              <th>Unidad</th>
              <th>Cantidad</th>
              <th>Componente</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Numero de Serie</th>
              <th>
                Ubicacion
                <br />(carril/cuerpo)
              </th>
              <th>Fecha de Instalacion</th>
              <th>Fecha</th>
              <th>Folio</th>
              <th>Real</th>
              <th>Fabricante</th>
            </tr>
            <tr style="text-align: center">
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 2vw"
                  placeholder="0"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 2vw"
                  placeholder="Pza"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 2vw"
                  placeholder="0"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 7vw"
                  placeholder="Visera"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 6vw"
                  placeholder="Prosis"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 6vw"
                  placeholder="M60-31"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 6vw"
                  placeholder="S/N"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 6vw"
                  placeholder="A04"
                />
              </td>
              <td>
                <input
                  v-model="datos.IncidentDate"
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black"
                  style="width: 8vw"
                  type="date"
                />
              </td>
              <td>
                <input
                  v-model="datos.IncidentDate"
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black"
                  style="width: 8vw"
                  type="date"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 6vw"
                  placeholder="S/M"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 6vw"
                  placeholder
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 6vw"
                  placeholder
                />
              </td>
            </tr>
            <tr style="text-align: center">
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 2vw"
                  placeholder="0"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 2vw"
                  placeholder="Pza"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 2vw"
                  placeholder="0"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 7vw"
                  placeholder="Visera"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 6vw"
                  placeholder="Prosis"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 6vw"
                  placeholder="M60-31"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 6vw"
                  placeholder="S/N"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 6vw"
                  placeholder="A04"
                />
              </td>
              <td>
                <input
                  v-model="datos.IncidentDate"
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black"
                  style="width: 8vw"
                  type="date"
                />
              </td>
              <td>
                <input
                  v-model="datos.IncidentDate"
                  class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black"
                  style="width: 8vw"
                  type="date"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 6vw"
                  placeholder="S/M"
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 6vw"
                  placeholder
                />
              </td>
              <td>
                <input
                  class="md:border border-black"
                  id="grid-last-name"
                  type="text"
                  style="width: 6vw"
                  placeholder
                />
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
            <table class="divLastTable" style="width:70%">
              <tr>
                <th>Partida</th>
                <th>Unidad</th>
                <th>Cantidad</th>
                <th>Componente</th>
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
                  Precio
                  <br />(Dolares)
                </th>
              </tr>
              <tr style="text-align: center">
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 2vw"
                    placeholder="0"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 2vw"
                    placeholder="Pza"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 2vw"
                    placeholder="0"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 7vw"
                    placeholder="Visera"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 6vw"
                    placeholder="Prosis"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 6vw"
                    placeholder="M60-31"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 7vw"
                    placeholder="$ 0.00"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 7vw"
                    placeholder="$ 0.00"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 7vw"
                    placeholder="$ 0.00"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 7vw"
                    placeholder="$ 0.00"
                  />
                </td>
              </tr>
              <!-- SEGUNDA LINEA -->
              <tr style="text-align: center">
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 2vw"
                    placeholder="0"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 2vw"
                    placeholder="Pza"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 2vw"
                    placeholder="0"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 7vw"
                    placeholder="Visera"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 6vw"
                    placeholder="Prosis"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 6vw"
                    placeholder="M60-31"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 7vw"
                    placeholder="$ 0.00"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 7vw"
                    placeholder="$ 0.00"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 7vw"
                    placeholder="$ 0.00"
                  />
                </td>
                <td>
                  <input
                    class="md:border border-black"
                    id="grid-last-name"
                    type="text"
                    style="width: 7vw"
                    placeholder="$ 0.00"
                  />
                </td>
              </tr>
            </table>

            <div class="divDescription" style="width: 30%">
              <tr>
                <th>Descripcion</th>
              </tr>
              <td>
                <textarea
                  v-model="datos.Diagnostic"
                  class="appearance-none block width-64 bg-grey-lighter text-grey-darker border border-black rounded-lg py-4 mb-0"
                  style="width: 25vw;"
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
                  v-model="datos.Diagnostic"
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
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Navbar";

export default {
  name: "CrearDTC",
  components: {
    Nav
  },
  data() {
    return {
      datos: {
        ReferenceNumber: "",
        SinisterNumber: "",
        ReportNumber: "",
        SinisterDate: "",
        FailureDate: "",
        FailureNumber: "",
        Description: "",
        ShippingElaboracionDate: "",
        UserId: null,
        AgremmentInfoId: null
      },
      datosUser: {
        tecResponsable: "",
        numConvneio: "4500029287",
        managerName: "",
        posicion: "",
        mail: "",
        plazaCobro: ""
      },

      listaStatus: [
        { value: "1", text: "Finalizado" },
        { value: "2", text: "En Proceso" }
      ],
      selectedEncabezado: null,
      listaPlazas: [
        { value: "161", text: "Alpuyeca - 101" },
        { value: "102", text: "PMO"},
        { value: "006", text: "Palo Blanco - 103" },
        { value: "041", text: "La Venta - 104" },
        { value: "061", text: "Xochitepec - 105" },
        { value: "127", text: "Aeropuerto - 106" },
        { value: "183", text: "Emiliano Zapata - 107" },
        { value: "186", text: "Tlalpan - 186" },
        { value: "186", text: "Tres Marias - 108" },
        { value: "186", text: "Francisco Velazco - 109" }
      ],
      listaDescripciones: [
        { value: "Vandalismo", text: "Vandalismo" },
        { value: "Acondicionamiento", text: "Acondicionamiento" }
      ],
      listaCarriles: [],
      listaPiezas: [],
      listaHeaders: [],
      loader: false,
      listUser: []
    };
  },
  methods: {
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
          //console.log(this.imgSrc)
          // rebuild cropperjs with the updated source
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
      //2020-12-03

      let diaActual = parseInt(this.datos.ShippingElaboracionDate.substr(8, 2));
      let mesActual = parseInt(this.datos.ShippingElaboracionDate.substr(6, 2));
      let yearActual = parseInt(
        this.datos.ShippingElaboracionDate.substr(0, 4)
      );
      let diaCorriente = 0;
      let newYear = parseInt(
        this.datos.ShippingElaboracionDate.substr(2, 2)
      );

      //let numReferencia;


      diaCorriente = diaActual;

      for (let i = 1; i < mesActual; i++) {
        // console.log(parseInt(new Date(yearActual, i, 0).getDate()));
        diaCorriente += parseInt(new Date(yearActual, i, 0).getDate());
      }

        let numPlaza = parseInt(this.datosUser.plazaCobro.substr(0,3));

        let nomPlaza = "";

      if(numPlaza != null)
      {
        if (numPlaza == "004")
            nomPlaza = "TPZ";
        else if (numPlaza == "102"){
          nomPlaza = "PMO";
        }
        else if (numPlaza == "006")
            nomPlaza = "QRO";
        else if (numPlaza == "041")
            nomPlaza = "SLM";
        else if (numPlaza == "061")
            nomPlaza = "LBM";
        else if (numPlaza == "069")
            nomPlaza = "JOR";
        else if (numPlaza == "070")
            nomPlaza = "POL";
        else if (numPlaza == "127")
            nomPlaza = "CHI";
        else if (numPlaza == "183")
            nomPlaza = "VIL";
        else if (numPlaza == "186")
            nomPlaza = "CGO";
        else nomPlaza = "Inserte un numero correcto";
      }
      else{
        "Inserte un numero correcto"
      }

      let autoCompleteDias;
      
        if (diaCorriente < 10)
        {
            autoCompleteDias = "00" + diaCorriente.toString();
        }
        else if (diaCorriente < 100)
        {
            autoCompleteDias = "0" + diaCorriente.toString();
        }
        else
        {
            autoCompleteDias = diaCorriente.toString();
        }

      this.datos.ReferenceNumber = nomPlaza + '-'+newYear+ autoCompleteDias


      this.$store.dispatch("DTC/crearDTCTecnico", this.datos);
      this.$router.push("/home/");
    },
    // async buscarRefacciones() {
    //   console.log("COmponente");
    //   console.log(this.datos);
    //   await this.$store.dispatch("Refacciones/buscarRefacciones", this.datos);
    //   this.Piezas = await this.$store.getters[
    //     "Refacciones/getListaRefacciones"
    //   ];
    // },
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
    }
  },
  async beforeMount() {
    this.listUser = await this.$store.getters["Login/getUser"];

    for (let i = 0; i < this.listUser.length; i++) {
      if (this.listUser[i].convenio == "4500029287") {
        this.datosUser.managerName = this.listUser[i].mangerName;
        this.datosUser.posicion = this.listUser[i].posicion;
        this.datosUser.mail = this.listUser[i].mail;
        this.datosUser.tecResponsable = this.listUser[i].nombreTec;
        this.datos.UserId = this.listUser[i].userId;
        this.datos.AgremmentInfoId = this.listUser[i].idAgrement;
      }
    }

    // for(let i = 0; i < lista.length; i++){

    //     if(lista[i].convenio == convenio){

    //       this.listUser = lista[i]
    //     }
    // }

    // await this.$store.dispatch("Refacciones/buscarComponentes");
    // (this.listaPiezas = await this.$store.getters[
    //   "Refacciones/getListaRefacciones"
    // ]),
    //   await this.$store.dispatch("Header/buscarHeaders");
    // this.listaHeaders = await this.$store.getters["Header/getHeaders"];
  },
  computed: {}
  //   async beforeMount2() {
  //   await this.$store.dispatch("Header/buscarHeaders");
  //   this.listaHeaders = await this.$store.getters[
  //     "Header/listaHeaders"
  //   ];
  // }
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

.divDescription {
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