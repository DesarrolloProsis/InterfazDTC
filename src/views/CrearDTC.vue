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
            <img src="../assets/img/prosis-logo.jpg" height="150" width="150" class="m-4"  />
          </div>
          <div class="w-3/5 h-14">
            <h1 class="title">Dictamen Tecnico y Cotizacion</h1>
          </div>
          <div class="w-1/5 h-14">
          <br>
            <label class="m-16" for="inline-full-name" style="font-weight: normal">
                Referencia:
              </label>
            <label class="" for="inline-full-name" style="font-weight: bold">
                PM-20037-01
            </label>
          </div>
        </div>
  
      <!-- SEGUNDO ENCABEZADO CENTRAL -->
        <div class="flex">
          <div class="w-1/5 h-14 pt-4">
            <br>
            <label class="" for="inline-full-name" style="font-weight: normal">
                Contrato / Oferta:
            </label>
              <label class="staticLabel" for="inline-full-name" style="font-weight: bold">
                4500029286
              </label>
          </div>
          <div class="divtitle2  h-14">
            <br>
            <h6 class="title2">En caso de Siniestro</h6>
          </div>
          <div class="w-1/5 h-14">
            <br>
            <label class="" for="inline-full-name">
                Tipo de Dictamen:
            </label>
            <select
              v-model="datos.OpinionType"
              class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
              id="convenios"
              style="margin-left: 2vw; width: 9vw;"
              type="text"
            >
             <option disabled value>Selecionar...</option>
              <option 
                v-for="(desc, index) in listaTipoDictamen"
                v-bind:value="desc.value"
                :key="index"
              >{{desc.text}}</option>
            </select>
          </div>
        </div>
        <div class="divtitle2">
            
        </div>
        <hr>
        <br>

<!-- *********************************************************** -->
        <!-- <div class="grid-container2" style="margin-bottom: 3vh">
          <div class="labelInput">
            <label class="atntn" for="inline-full-name" style="font-weight: normal">
                Contrato / Oferta:
              </label>
              <label class="staticLabel" for="inline-full-name" style="font-weight: bold">
                4500029286
              </label>
          </div>
          <div></div>
          <div></div>
          <div class="labelInput2">
            <label class="" for="inline-full-name">
                Tipo de Dictamen:
            </label>
            <select
              v-model="datos.OpinionType"
              class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
              id="convenios"
              style="margin-left: 2vw; width: 9vw;"
              type="text"
            >
             <option disabled value>Selecionar...</option>
              <option 
                v-for="(desc, index) in listaTipoDictamen"
                v-bind:value="desc.value"
                :key="index"
              >{{desc.text}}</option>
            </select>
          </div>
        </div>
        <hr/>
        <br> -->

      <div class="flex items-center mb-4">
        <div class="w-1/4 h-8">
          <label class="atntn" for="inline-full-name">
            Atencion:
          </label>
          <label class="staticLabel h-8" for="inline-full-name">
            Lic. Fidel Uribe Hernandez
          </label>
        </div>
        <div class="w-1/4 h-8">
          <label class="" for="inline-full-name">
            No. Siniestro:
          </label>
             <input
            v-model="datos.FailureNum"
            class="md:border border-black h-8"
            id="grid-last-name"
            type="text"
            style="margin-left: 1vw"
            placeholder=""
            />
        </div>
        <div class="w-1/4 h-8">
          <label class="" for="inline-full-name">
            Reporte:
          </label>
          <input
            v-model="datos.ReportNum"
            class="md:border border-black h-8"
            id="grid-last-name"
            type="text"
            placeholder="10301/3030099"
          />
        </div>
        <div class="w-1/4 h-8">
          <label class="" for="inline-full-name">
            Descripcion:
          </label>
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
        <div class="w-1/4 h-14 content-center" style="align-items: center">
          <label class="atntn" for="inline-full-name">
            Cargo:
          </label>
          <label class="staticLabel h-8" for="inline-full-name">
            Encargado de despacho de la subcoordinacion de operacion 6 cuernavaca
          </label>
        </div>
        <div class="w-1/4 h-8">
          <label class="" for="inline-full-name">
            Fecha Siniestro:
          </label>
          <input
            v-model="datos.IncidentDate"
            class="fecha appearance-none bg-grey-lighter text-grey-darker border border-black h-8"
            type="date"
          />
        </div>
        <div class="w-1/4 h-8">
        </div>
        <div class="w-1/4 h-8">
          <label class="" for="inline-full-name">
            Fecha de Envio:
          </label>
          <input
            v-model="datos.ShippingDate"
            class="fecha appearance-none w-40 bg-grey-lighter text-grey-darker border border-black h-8"
            type="date"
            style="margin-left: 2.9vw"
          />
        </div>
      </div>

<!--***********************************************************-->

      <div class="flex mb-4 items-center">
        <div class="w-1/4 h-8 content-center" style="align-items: center">
          <label class="atntn" for="inline-full-name">
            Correo:
          </label>
          <label class="staticLabel" for="inline-full-name" style="color: blue">
             furibe@capufe.gob.mx
          </label>
        </div>
        <div class="w-1/4 h-8">
          <label class="h-8" for="inline-full-name">
            Folio Falla:
          </label>
          <input
            v-model="datos.FaultSheet"
            class="md:border border-black h-8"
            id="grid-last-name"
            type="text"
            style="margin-left: 2vw"
            placeholder="S/M"
          />
        </div>
        <div class="w-1/4 h-8">
        </div>
        <div class="w-1/4 h-8">
          <label class="" for="inline-full-name">
            Fecha Elaboracion:
          </label>
          <input
            v-model="datos.ShippingDate"
            class="fecha appearance-none w-40 bg-grey-lightertext-grey-darker border border-black h-8"
            type="date"
            style="margin-left: 1.7vw"
          />
        </div>
      </div>

<!--***********************************************************-->

        <div class="flex mb-4 items-center">
        <div class="w-1/4 h-8 content-center" style="align-items: center">
          <label class="atntn" for="inline-full-name">
            Plaza Cobro:
          </label>
          <select
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
          </select>
        </div>
        <div class="w-1/4 h-8">
          <label class="" for="inline-full-name">
            Fecha Falla:
          </label>
          <input
            v-model="datos.FailureDate"
            class="fecha appearance-none w-40 bg-grey-lightertext-grey-darker border border-black h-8"
            type="date"
            style="margin-left: 1.6vw"
          />
        </div>
        <div class="w-1/4 h-8">
        </div>
        <div class="w-1/4 h-8">
          <label class="" for="inline-full-name">
             Tecnico Responsable:
          </label>
          <label class="staticLabel h-8" for="inline-full-name" style="margin-left: 0.8vw">
            Ben Hur
          </label>
        </div>
      </div>

<!--***********************************************************-->

        <div class="flex mb-4 items-center">
        <div class="w-1/4 h-8 content-center">
        </div>
        <div class="w-1/4 h-8">
        </div>
        <div class="w-1/4 h-8">
        </div>
        <div class="w-1/4 h-8">
          <label class="" for="inline-full-name">
            Coordinacion Regional:
          </label>
          <input
            v-model="datos.ReferenceNum"
            class="md:border border-black h-8"
            id="grid-last-name"
            type="text"
            style="margin-left: 0.1vw"
            placeholder=""
          />
        </div>
      </div>

<!--***********************************************************-->

        <div class="flex mb-4 items-center">
        <div class="w-1/4 h-8 content-center">
        </div>
        <div class="w-1/4 h-8">
        </div>
        <div class="w-1/4 h-8">
        </div>
        <div class="w-1/4 h-8">
          <label class="" for="inline-full-name">
            Centro de Servicio:
          </label>
          <label class="staticLabel" for="inline-full-name h-8" style="margin-left: 1.8vw">
              CDMX
          </label>
        </div>
      </div>
<!--***********************************************************-->

      <!-- <div class="grid-container">
        <div class="labelInput">
          <label class="atntn" for="inline-full-name">
            Atencion:
          </label>
          <label class="staticLabel" for="inline-full-name">
                Lic. Fidel Uribe Hernandez
          </label>
        </div>

        <div class="labelInput2">
          <label class="" for="inline-full-name">
              No. Siniestro:
            </label>
             <input
            v-model="datos.ReferenceNum"
            class="md:border border-black"
            id="grid-last-name"
            type="text"
            style="margin-left: 1vw"
            placeholder=""
            />
        </div>

        <div class="labelInput2">
          <label class="" for="inline-full-name">
              Reporte:
            </label>
             <input
            v-model="datos.ReferenceNum"
            class="md:border border-black"
            id="grid-last-name"
            type="text"
            placeholder="10301/3030099"
            />
        </div>

        <div class="labelInput3">
          <label class="" for="inline-full-name">
              Descripcion:
            </label>
            <select
              v-model="datos.Description"
              class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
              id="convenios"
              style="margin-left: 3.9vw; width: 9vw;"
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
      </div> -->

<!-- *********************************************************** -->
        <!-- <div class="grid-container2" style="padding-bottom: 1vh">
          <div class="labelInput">
            <label class="atntn" for="inline-full-name">
              Cargo:
            </label>
            <label class="staticLabel" for="inline-full-name">
              Encargado de despacho de la subcoordinacion de operacion 6 cuernavaca
            </label>
          </div>

          <div class="labelInput2">
            <label class="" for="inline-full-name">
                Fecha Siniestro:
              </label>
              <input
                v-model="datos.IncidentDate"
                class="fecha appearance-none w-40 bg-grey-lighter text-grey-darker border border-black"
                type="date"
              />
          </div>

          <div></div>

          <div class="labelInput3">
            <label class="" for="inline-full-name">
                Fecha de Envio:
              </label>
              <input
                v-model="datos.IncidentDate"
                class="fecha appearance-none w-40 bg-grey-lighter text-grey-darker border border-black"
                type="date"
                style="margin-left: 2.8vw"
              />
          </div>
        </div> -->

<!-- ************************************************************** -->

        <!-- <div class="grid-container2" style="padding-bottom: 1vh;">
          <div class="labelInput">
            <label class="atntn" for="inline-full-name">
                Correo:
              </label>
            <label class="staticLabel" for="inline-full-name" style="color: blue">
              furibe@capufe.gob.mx
            </label>
          </div>

          <div class="labelInput2">
            <label class="" for="inline-full-name">
                Folio Falla:
              </label>
              <input
              v-model="datos.ReferenceNum"
              class="md:border border-black"
              id="grid-last-name"
              type="text"
              style="margin-left: 2vw"
              placeholder="S/M"
              />
          </div>

          <div></div>
          <div class="labelInput3">
            <label class="" for="inline-full-name">
                Fecha Elaboracion:
              </label>
              <input
                v-model="datos.IncidentDate"
                class="fecha appearance-none w-40 bg-grey-lighter text-grey-darker border border-black"
                type="date"
                style="margin-left: 1.7vw"
              />
          </div>
        </div> -->

<!-- ************************************************************** -->

        <!-- <div class="grid-container2">
          <div class="labelInput">
            <label class="atntn" for="inline-full-name">
                Plaza Cobro:
              </label>
              <select
                @change="getCarriles()"
                v-model="datos.PlazaCobro"
                class="appearance-none w-sm bg-grey-lighter text-grey-darker border border-black py-1"
                id="convenios"
                type="text"
              >
                <option disabled value>Selecionar...</option>
                <option
                  v-for="(plaza, index) in listaPlazas"
                  v-bind:value="plaza.value"
                  :key="index"
                >{{plaza.text}}</option>
              </select>
          </div>

          <div class="labelInput2">
            <label class="" for="inline-full-name">
                Fecha Falla:
              </label>
              <input
                v-model="datos.FailureDate"
                class="fecha appearance-none w-40 bg-grey-lighter text-grey-darker border border-black"
                type="date"
                style="margin-left: 1.6vw"
              />
          </div>

          <div></div>

          <div class="labelInput3">
            <label class="" for="inline-full-name">
                Tecnico Responsable:
              </label>
            <label class="staticLabel" for="inline-full-name" style="margin-left: 0.8vw">
              Ben Hur
            </label>
          </div>
        </div> -->

<!-- ************************************************************** -->

        <!-- <div class="grid-container2">
          <div>
          </div>

          <div>
          </div>

          <div></div>

          <div class="labelInput3 mb-5">
            <label class="" for="inline-full-name">
                Coordinacion Regional:
              </label>
              <input
              v-model="datos.ReferenceNum"
              class="md:border border-black"
              id="grid-last-name"
              type="text"
              style="margin-left: 0.1vw"
              placeholder=""
              />
          </div>
        </div>
        <br> -->

<!-- ************************************************************** -->

        <!-- <div class="grid-container2">
          <div>
          </div>

          <div>
          </div>

          <div></div>

          <div class="labelInput3 mb-3">
            <label class="" for="inline-full-name">
                Centro de Servicio:
              </label>
            <label class="staticLabel" for="inline-full-name" style="margin-left: 1.8vw">
              CDMX
            </label>
          </div>
        </div>
        <br>
        <br> -->

<!-- ************************************************************** -->

        <div class="grid-container2">
          <div>
          </div>

          <div>
          </div>

          <div></div>

          <div class="labelInput3 mb-3">
            <label class="" for="inline-full-name">
                Correo:
              </label>
            <label class="staticLabel" for="inline-full-name" style="margin-left: 1.8vw">
              hguzman@grupo-prosis.com
            </label>
          </div>
          <br>
        </div>
        <br>  
        <br>

<!-- ************************************************************** -->
        <div class="divtitle2  h-14">
            <h6 class="title2">Equipo Dañado</h6>
        </div>
        <br>

<!-- ************************************************************** -->
      <div class="grid-container3" style="text-align: center">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div class="labelInput">
          <label class="atntn" for="inline-full-name">
              Ultimo Mantenimiento
            </label>
        </div>

        <div class="labelInput2">
          <label class="" for="inline-full-name">
              Tiempo de Vida:
            </label>
        </div>
      </div>
      <br>

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
            <th>Ubicacion <br>(carril/cuerpo)</th>
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
                placeholder=""
              />
            </td>
            <td>
              <input
                class="md:border border-black"
                id="grid-last-name"
                type="text"
                style="width: 6vw"
                placeholder=""
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
                placeholder=""
              />
            </td>
            <td>
              <input
                class="md:border border-black"
                id="grid-last-name"
                type="text"
                style="width: 6vw"
                placeholder=""
              />
            </td>
          </tr>
        </table>
        <br>

      <!-- ************************************************************** -->
      <br>
        <div class="divtitle2">
            <h6 class="title2" style="font-size: 1.3rem">Equipo Propuesto</h6>
        </div>
        <br>

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
            <th>Precio<br>(Unitario Peso)</th>
            <th>Precio <br>(Unitario Dolar)</th>
            <th>Precio Total<br>(Pesos)</th>
            <th>Precio <br>(Dolares)</th>
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
            <span class="relleno">
              Total M.N.                                      
            </span>
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
        <hr>
      </div>

      <br>
      <div>
        <div class="flex mb-4">
          <div class="w-1/4 h-56 border border-black">
            <p>
              <span style="font-weight: bold">Tiempo de entrega: </span>  <br>
              <span style="font-weight: bold">Vigencia de la Cotización:</span>  15 días calendario, a partir de la fecha del presente. <br>
              <span style="font-weight: bold">Forma de Pago:</span>  100% al término de los trabajos. <br>
              <span style="font-weight: bold">Precios en M.N:</span> No incluyen IVA, el cual se cargara al momento de facturarse. En caso de una variación de la paridad Peso/Dólar mayor al 5%, se revisarán los precios. <br>
              <span style="font-weight: bold">Precios en USCY:</span> No incluyen IVA, el cual se cargará al momentode facturarse. 

            </p>
          </div>
          <div class="w-1/4 h-12"></div>
          <div class="w-1/4 h-48">
            <span style="font-weight: bold">Observaciones</span>
            <br>
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


      <br>
      <div>
        <div class="flex mb-4">
          <div class="w-1/4 h-40 border border-black items-center">
            <p style="text-align: center">
              <span style="font-weight: bold">Autorizacion Tecnica y Comercial: </span>

              <br>
              <br>
              <br>
              <br>
              <br>
              <span>Autorizacion comercial Director de Comercializacion</span>  
              <br>
              <span style="font-size: 0.7vw">C.P. Hermilia Guzman</span> 
            </p>
          </div>
          <div class="w-1/4 h-12"></div>
          <div class="w-1/4 h-12">
          </div>
          <div class="w-1/4 h-40 border border-black">
          <!-- <p style="text-align: center">
            <span>Jose Juan Iturbide Espin</span> 
            <br>
            <hr>
            <span>Administrador Plaza de Cobro</span><br>
            <span>c102adm@capufe.gob.mx</span>
          </p> -->
          <p style="text-align: center">
            <br>
            <br>
            <br>
            <br>
            <span style="font-weight: bold">Jose Juan Iturbide Espin</span>
          </p>
          <hr>
          <p style="text-align: center">
            <span>Administrador Plaza de Cobro</span>  
            <br>
            <span>c102adm@capufe.gob.mx</span> 
          </p>
          </div>
        </div>
      </div>


      



















          <!-- <div class="-mx-3 w-full sm:screen md:flex mb-4">
            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              >Plaza</label>
              <select
                @change="getCarriles()"
                v-model="datos.Plaza"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
              >
                <option disabled value>Seleciona la Plaza</option>
                <option
                  v-for="(plaza, index) in listaPlazas"
                  v-bind:value="plaza.value"
                  :key="index"
                >{{plaza.text}}</option>
              </select>
            </div>

            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              >Carril</label>
              <select
                @change="actualizarCapufeId()"
                v-model="datos.LanesCatalogCapufeLaneNum"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
              >
                <option disabled value>Seleciona un Carril</option>
                <option
                  v-for="(carril, index) in listaCarriles"
                  v-bind:value="carril.capufeLaneNum"
                  :key="index"
                >{{carril.lane}}</option>
              </select>
            </div>
          </div> -->

          <!--Segundos dos input  -->
          <!-- <div class="-mx-3 w-full sm:screen md:flex mb-4">
            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Tipo de Dictamen</label>
              <select
                v-model="datos.OpinionType"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
              >
                <option value="Correctivo">Correctivo</option> -->
                <!-- <option
                  v-for="(componente, index) in listaPiezas"
                  v-bind:value="componente.componentId"
                  :key="index"
                >{{componente.componentName}}</option>-->
              <!-- </select>
            </div>

            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Status</label>
              <select
                v-model="datos.Status"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="status"
              >
                <option disabled value>Selecionar...</option>
                <option
                  v-for="(choose, index) in listaStatus"
                  v-bind:value="choose.value"
                  :key="index"
                >{{choose.text}}</option>
              </select>
            </div>

            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Subir Imagen</label>
              <input
                @change="processFile($event)"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="file"
              />
            </div>
          </div>

          <h4
            class="text-center text-3xl text-blue-600 font-mono text-lg mb-10"
          >Datos de la Aseguradora</h4> -->

          <!-- input Info Aseguradora -->
          <!-- <div class="-mx-3 md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Numero AXA</label>
              <input
                v-model="datos.AxaNum"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red py-2 rounded-lg mb-3"
                id="input-Convenio"
                type="text"
                placeholder="Numero AXA"
              />
            </div>

            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Folio de Falla</label>
              <input
                v-model="datos.FailureNum"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                placeholder="Folio Falla"
              />
            </div>
          </div>

          <div class="-mx-3 md:flex mb-4">
            <div class="md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              >Fecha del Siniestro</label>
              <input
                v-model="datos.IncidentDate"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                type="date"
              />
            </div>

            <div class="md:w-1/4 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Fecha de Falla</label>
              <input
                v-model="datos.FailureDate"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="date"
              />
            </div>
            <div class="md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              >Fecha de Envio</label>
              <input
                v-model="datos.ShippingDate"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                type="date"
              />
            </div>

            <div class="md:w-1/4 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Fecha de Elaboracion</label>
              <input
                v-model="datos.ElaborationDate"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="date"
              />
            </div>
          </div>

          <div class="-mx-3 md:flex mb-6"></div> -->

          <!--Tercero Input -->
          <div class="-mx-3 md:flex mb-6">
            <!-- <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Descripcion</label>
              <textarea
                v-model="datos.Description"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
              />
            </div>

            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Observacion</label>
              <textarea
                v-model="datos.Observation"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
              />
            </div>
            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Diagnostico</label>
              <textarea
                v-model="datos.Diagnostic"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
              />
            </div> -->
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
        ReferenceNum: "",
        OpinionType: "",
        Description: "",
        PlazaCobro: "",
        UserId: "",
        DTCHeaderId: "H-8080",
        AxaNum: "",
        FailureNum: "",
        Status: "false",
        FailureDate: "",
        IncidentDate: "",
        ElaborationDate: "",
        ShippingDate: "",
        Diagnostic: "",
        Observation: "",
        Image: "No-Img",
        LanesCatalogCapufeLaneNum: "",
        LanesCatalogIdGare: "87",
        faultSheet: ""
      },
      listaStatus: [
        { value: "1", text: "Finalizado" },
        { value: "2", text: "En Proceso" }
      ],
      selectedEncabezado: null,
      listaPlazas: [
        { value: "161", text: "Alpuyeca - 101" },
        { value: "005", text: "Paso Morelos - 102" },
        { value: "006", text: "Palo Blanco - 103" },
        { value: "041", text: "La Venta - 104" },
        { value: "061", text: "Xochitepec - 105" },
        { value: "127", text: "Aeropuerto - 106" },
        { value: "183", text: "Emiliano Zapata - 107" },
        { value: "186", text: "Tlalpan - 186" },
        { value: "186", text: "Tres Marias - 108" },
        { value: "186", text: "Francisco Velazco - 109" }
      ],
      listaTipoDictamen: [
        { value: "1", text: "Correctivo" },
        { value: "2", text: "Acondicionamiento" }
      ],
      listaDescripciones: [
        { value: "1", text: "Vandalismo" },
        { value: "2", text: "Acondicionamiento" }
      ],
      listaCarriles: [],
      listaPiezas: [],
      listaHeaders: [],
      loader: false
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
    await this.$store.dispatch("Refacciones/buscarComponentes");
    (this.listaPiezas = await this.$store.getters[
      "Refacciones/getListaRefacciones"
    ]),
      await this.$store.dispatch("Header/buscarHeaders");
    this.listaHeaders = await this.$store.getters["Header/getHeaders"];
  }
  //   async beforeMount2() {
  //   await this.$store.dispatch("Header/buscarHeaders");
  //   this.listaHeaders = await this.$store.getters[
  //     "Header/listaHeaders"
  //   ];
  // }
};
</script>



<style scoped>

  .title{
    text-align: center;
    font-weight: bold;
    font-size: 2vw;
    border: 2px solid black;
  }

  .divtitle{
    margin: 0 auto;
  }

  .divtitle2{
  margin: 0 auto;
  }

  .title2{
  text-align: center;
  font-weight: bold;
  font-size: 1.2vw;
  border: 2px solid black;
  }

  .imgRefNum{
    display: grid;
    grid-template-columns: 20% 80%;
  }

  .input{
    text-align: end;
    padding-top: 5vh;
  }

  .fecha{
    width: 12.1rem;
  }

  .grid-container{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    font-size: 0.85rem;
    margin-bottom: -5vh;
  }

  .grid-container3{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    font-size: 0.85rem;
    margin-bottom: -5vh;
    padding-left: 3vw;
  }

  label{
    font-weight: bold;
    color: black;
    font-family: Tahoma, Geneva, Verdana, sans-serif;
  }

  .grid-container2{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    font-size: 0.85rem;
    margin-bottom: -4vh;
    overflow: hidden;
  }

  .staticLabel{
    font-weight: normal;
  }

  .divDescription{
    display: inline-block;
    padding-bottom: 1vh;
  }

  .inputDesc{
    height: 10vh;
    width: 18vw;
  }

  .divLastTable{
    border-spacing: 10px;
    border-collapse: separate;
    display: inline-block;
  }

  .relleno{
    display: inline-block;
  }

@media (max-width: 750px) {
  .grid-container{
    margin-bottom: 0;
  }
    .grid-container2{
    margin-bottom: 0;
  }
}
</style>