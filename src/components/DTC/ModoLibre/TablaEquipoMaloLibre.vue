<template>
  <div>
    <div class="flex justify-center sm:hidden">
      <div class="p-4">
        <div class="text-center mb-5">
          <h6 class="font-bold text-xl text-gray-800">Equipo Dañado</h6>
        </div>
        <table class="border-collapse">
          <!--/////////////////////////////////////////////////////////////////
            ////                 CABECERA DE LA TABLA                       ////
          ////////////////////////////////////////////////////////////////////-->
          <thead>
            <tr class="border-2 text-xs text-gray-400 font-normal bg-blue-800">
              <th class="px-1 border-2 border-gray-800 xl:w-20">Partida</th>
              <th class="px-1 border-2 border-gray-800 xl:w-32">Unidad</th>
              <th class="px-4 border-2 border-gray-800 text-red-600 xl:w-40">
                Componentes
              </th>
              <th class="px-4 border-2 border-gray-800 text-red-600 text-xs">
                Cantidad
              </th>
              <th class="px-4 border-2 border-gray-800 xl:w-32">Marca</th>
              <th class="px-4 border-2 border-gray-800 xl:w-32">Modelo</th>
              <th class="px-4 border-2 border-gray-800">Numero de Serie</th>
              <th class="px-4 border-2 border-gray-800 text-red-600">
                Ubicacion
                <br />(carril/cuerpo)
              </th>
              <th class="px-4 text-xs border-2 border-gray-800">
                Fecha de Instalacion
              </th>
              <th class="px-4 text-xs border-2 border-gray-800">
                Fecha
                <br />(Ultimo Mantenimiento)
              </th>
              <th class="px-4 text-xs border-2 border-gray-800">
                Folio
                <br />(Ultimo Mantenimiento)
              </th>
              <th class="px-12 border-2 border-gray-800">Real</th>
              <th class="px-1 border-2 border-gray-800 xl:w-32">Fabricante</th>
              <th class="px-4 border-2 border-gray-800"></th>
            </tr>
          </thead>
          <!--/////////////////////////////////////////////////////////////////
            ////                 CUERPO DE LA TABLA                          ////
          ////////////////////////////////////////////////////////////////////-->
          <tbody>
            <tr
              class="hover:bg-blue-200 text-center"
              v-for="(equipo, index) in listaequipoMalo"
              :key="index"
            >
              <td class="border border-gray-800">
                <template v-if="equipo.rowUp"></template>
                <template v-else>{{ equipo.partida }}</template>
              </td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUp">
                  <select
                    v-validate="'required'"
                    :class="{ 'is_valid': !errors.first('unidad'), 'is_invalid': errors.first('unidad')}"
                    v-model="editComponent.unidad"
                    name="unidad"
                  >
                    <option value>Seleccion</option>
                    <option value="Pza">Pza</option>
                    <option value="Metro">Metro</option>
                  </select>
                </template>
                <template v-else>{{ equipo.unidad }}</template>
              </td>
              <td class="border border-gray-800">
                <div v-if="equipo.rowUp">
                  <input
                    class="w-32"
                    type="text"
                    v-validate="'required'"
                    :class="{ 'is_valid': !errors.first('componentes'), 'is_invalid': errors.first('componentes')}"
                    name="componentes"
                    v-model="editComponent.componente"
                  />
                  <p class="text-red-600 text-xs">
                    {{ errors.first("componentes") }}
                  </p>
                </div>
                <div v-else>{{ equipo.componente }}</div>
              </td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUp">
                  <input
                    v-validate="'required|numeric'"
                    :class="{ 'is_valid': !errors.first('cantidades'), 'is_invalid': errors.first('cantidades')}"
                    class="w-32"
                    name="cantidades"
                    type="text"
                    v-model="editComponent.cantidad"
                  />
                </template>
                <template v-else>{{ equipo.cantidad }}</template>
              </td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUp">
                  <textarea
                    v-validate="'required'"
                    :class="{ 'is_valid': !errors.first('marcas'), 'is_invalid': errors.first('marcas')}"
                    class="w-20"
                    type="text"
                    name="marcas"
                    v-model="editComponent.marca"
                  ></textarea>
                </template>
                <template v-else>
                  <p v-for="(item, key) in equipo.marca.split(`\n`)" :key="key">
                    {{ item }}
                  </p>
                </template>
              </td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUp">
                  <textarea
                    v-validate="'required'"
                    :class="{ 'is_valid': !errors.first('modelos'), 'is_invalid': errors.first('modelos')}"
                    class="w-20"
                    type="text"
                    name="modelos"
                    v-model="editComponent.modelo"
                  ></textarea>
                </template>
                <template v-else>
                  <p
                    v-for="(item, key) in equipo.modelo.split(`\n`)"
                    :key="key"
                  >
                    {{ item }}
                  </p>
                </template>
              </td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUp">
                  <textarea
                    v-validate="'required'"
                    :class="{ 'is_valid': !errors.first('numseries'), 'is_invalid': errors.first('numseries')}"
                    class="w-20"
                    type="text"
                    name="numseries"
                    v-model="editComponent.numserie"
                  ></textarea>
                </template>
                <template v-else>
                  <p
                    v-for="(item, key) in equipo.numserie.split(`\n`)"
                    :key="key"
                  >
                    {{ item }}
                  </p>
                </template>
              </td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUp">
                  <textarea
                    v-validate="'required'"
                    :class="{ 'is_valid': !errors.first('ubicaciones'), 'is_invalid': errors.first('ubicaciones')}"
                    class="w-20"
                    placeholder="A01"
                    type="text"
                    name="ubicaciones"
                    v-model="editComponent.ubicacion"
                  ></textarea>
                </template>
                <template v-else>
                  <p
                    v-for="(item, key) in equipo.ubicacion.split(`\n`)"
                    :key="key"
                  >
                    {{ item }}
                  </p>
                </template>
              </td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUp">
                  <textarea
                    v-validate="'required|FechaValidaList'"
                    :class="{ 'is_valid': !errors.first('fechaInstalaciones'), 'is_invalid': errors.first('fechaInstalaciones')}"
                    class="w-24 text-md"
                    type="text"
                    name="fechaInstalaciones"
                    placeholder="dd/mm/yyyy"
                    v-model="editComponent.fechaInstalacion"
                  ></textarea>
                </template>
                <template v-else>
                  <p
                    v-for="(item, key) in equipo.fechaInstalacion.split(`\n`)"
                    :key="key"
                  >
                    {{ item }}
                  </p>
                </template>
              </td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUp">
                  <textarea
                    v-validate="'required|FechaValidaList'"
                    :class="{ 'is_valid': !errors.first('fechaMantenimientos'), 'is_invalid': errors.first('fechaMantenimientos')}"
                    class="w-24 text-md"
                    type="text"
                    placeholder="dd/mm/yyyy"
                    name="fechaMantenimientos"
                    v-model="editComponent.fechaMantenimiento"
                  ></textarea>
                </template>
                <template v-else>
                  <p
                    v-for="(item, key) in equipo.fechaMantenimiento.split(`\n`)"
                    :key="key"
                  >
                    {{ item }}
                  </p>
                </template>
              </td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUp">
                  <textarea
                    v-validate="'required'"
                    :class="{ 'is_valid': !errors.first('folioMantenimientos'), 'is_invalid': errors.first('folioMantenimientos')}"
                    class="w-20"
                    type="text"
                    name="folioMantenimientos"
                    v-model="editComponent.folioMantenimiento"
                  ></textarea>
                </template>
                <template v-else>
                  <p
                    v-for="(item, key) in equipo.folioMantenimiento.split(`\n`)"
                    :key="key"
                  >
                    {{ item }}
                  </p>
                </template>
              </td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUp">
                  <textarea
                    v-validate="'required'"
                    :class="{ 'is_valid': !errors.first('fechaReales'), 'is_invalid': errors.first('fechaReales')}"
                    class="w-20"
                    type="text"
                    name="fechaReales"
                    v-model="editComponent.fechaReal"
                  ></textarea>
                </template>
                <template v-else>
                  <p
                    v-for="(item, key) in equipo.fechaReal.split(`\n`)"
                    :key="key"
                  >
                    {{ item }}
                  </p>
                </template>
              </td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUp">
                  <textarea
                    v-validate="'required'"
                    :class="{ 'is_valid': !errors.first('fechaFabricantes'), 'is_invalid': errors.first('fechaFabricantes')}"
                    class="w-20"
                    type="text"
                    name="fechaFabricantes"
                    v-model="editComponent.fechaFabricante"
                  ></textarea>
                </template>
                <template v-else>
                  <p
                    v-for="(item, key) in equipo.fechaFabricante.split(`\n`)"
                    :key="key"
                  >
                    {{ item }}
                  </p>
                </template>
              </td>
              <td class="border border-gray-800">
                <template v-if="equipo.rowUp">
                  <button
                    @click="cancelar_edicion(index)"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-red-700 m-2"
                  >
                    <img
                      src="../../../assets/img/cerrar.png"
                      class="mr-2 sm:m-1"
                      width="15"
                      height="15"
                    />
                    <span>Cancelar</span>
                  </button>
                  <button
                    @click="confirmar_componente(index)"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700 m-2"
                  >
                    <img
                      src="../../../assets/img/garrapata.png"
                      class="mr-2 sm:m-1"
                      width="15"
                      height="15"
                    />
                    <span>Confirmar</span>
                  </button>
                </template>
                <template v-else>
                  <button
                    @click="borrar_componente(index)"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-red-700 m-2"
                  >
                    <img
                      src="../../../assets/img/bin.png"
                      class="mr-2 sm:m-1"
                      width="15"
                      height="15"
                    />
                    <span>Borrar</span>
                  </button>

                  <button
                    @click="editar_componente(index)"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded inline-flex items-center border-2 border-yellow-500 m-2"
                  >
                    <img
                      src="../../../assets/img/pencil.png"
                      class="mr-2 sm:m-1"
                      width="15"
                      height="15"
                    />
                    <span>Editar</span>
                  </button>
                </template>
              </td>
            </tr>
            <!--/////////////////////////////////////////////////////////////////
              ////           FOOTER DE LA TABLA + PARTIDA                    ////
            ////////////////////////////////////////////////////////////////////-->
            <tr class="text-center">
              <td class="border border-gray-800">{{ "*" }}</td>
              <td class="border border-gray-800">
                <select
                  name="_unidad"
                  v-model="objectMalo.unidad"
                  :disabled="disable_agregar"
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('_unidad'), 'is_invalid': errors.first('_unidad')}"
                >
                  <option value="Pza">Pza</option>
                </select>
              </td>
              <td class="border border-gray-800">
                <input
                  v-validate="'required'"
                  class="w-32"
                  type="text"
                  
                  :class="{ 'is_valid': !errors.first('_componente'), 'is_invalid': errors.first('_componente')}"
                  name="_componente"
                  v-model="objectMalo.componente"
                  :disabled="disable_agregar"
                />
              </td>
              <td class="border border-gray-800">
                <input
                  v-validate="'required|numeric'"
                  :class="{ 'is_valid': !errors.first('_cantidad'), 'is_invalid': errors.first('_cantidad')}"
                  class="w-12"
                  type="text"
                  name="_cantidad"
                  v-model="objectMalo.cantidad"
                  :disabled="disable_agregar"
                />
              </td>
              <td class="border border-gray-800">
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('_marca'), 'is_invalid': errors.first('_marca')}"
                  class="w-20"
                  type="text"
                  name="_marca"
                  v-model="objectMalo.marca"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border border-gray-800">
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('_modelo'), 'is_invalid': errors.first('_modelo')}"
                  class="w-20"
                  type="text"
                  name="_modelo"
                  v-model="objectMalo.modelo"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border border-gray-800">
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('_numserie'), 'is_invalid': errors.first('_numserie')}"
                  class="w-20"
                  type="text"
                  name="_numserie"
                  v-model="objectMalo.numserie"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border border-gray-800">
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('_ubicacion'), 'is_invalid': errors.first('_ubicacion')}"
                  class="w-20"
                  type="text"
                  placeholder="A01"
                  name="_ubicacion"
                  v-model="objectMalo.ubicacion"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border border-gray-800 ">
                <textarea
                  v-validate="'required|FechaValidaList'"
                  :class="{ 'is_valid': !errors.first('_fechaInstalacion'), 'is_invalid': errors.first('_fechaInstalacion')}"
                  class="w-24 text-md"
                  v-tooltip="{ content: `La fecha debe tener este formato DD/MM/YYYY.`,                        
                        classes: ['text-xs', 'border-yellow-600', 'border','rounded-full', 'text-gray-900' ],
                        delay: {
                          show: 100,
                          hide: 300,
                        },
                  }"
                  type="text"
                  name="_fechaInstalacion"
                  placeholder="dd/mm/yyyy"
                  v-model="objectMalo.fechaInstalacion"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border border-gray-800">
                <textarea
                  v-validate="'required|FechaValidaList'"
                  :class="{ 'is_valid': !errors.first('_fechaMantenimiento'), 'is_invalid': errors.first('_fechaMantenimiento')}"
                  class="w-24 text-md"
                  type="text"
                    v-tooltip="{ content: `La fecha debe tener este formato DD/MM/YYYY.`,                        
                        classes: ['text-xs', 'border-yellow-600', 'border','rounded-full', 'text-gray-900' ],
                        delay: {
                          show: 100,
                          hide: 300,
                        },
                  }"
                  placeholder="dd/mm/yyyy"
                  name="_fechaMantenimiento"
                  v-model="objectMalo.fechaMantenimiento"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border border-gray-800">
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('_folioMantenimiento'), 'is_invalid': errors.first('_folioMantenimiento')}"
                  class="w-20"
                  type="text"
                  name="_folioMantenimiento"
                  v-model="objectMalo.folioMantenimiento"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border border-gray-800">
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('_fechaReal'), 'is_invalid': errors.first('_fechaReal')}"
                  class="w-20"
                  type="text"
                  name="_fechaReal"
                  v-model="objectMalo.fechaReal"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border border-gray-800">
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('_fechaFabricante'), 'is_invalid': errors.first('_fechaFabricante')}"
                  class="w-20"
                  type="text"
                  name="_fechaFabricante"
                  v-model="objectMalo.fechaFabricante"
                  :disabled="disable_agregar"
                ></textarea>
              </td>
              <td class="border border-gray-800 p-2">
                <button
                
                  v-on:click.stop.prevent="agregar_componente()"
                  :disabled="disable_agregar"
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700"
                >
                  <img
                    src="../../../assets/img/more.png"
                    width="20"
                    height="20"
                  />
                  <span class="ml-2 text-xs">Agregar Partida</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex flex-col justify-center md:hidden lg:hidden xl:hidden">
      <div class="p-4" :class="{ hidden: modal }">
        <div class="text-center mb-5">
          <h6 class="font-bold text-xl text-gray-800">Equipo Dañado</h6>
        </div>
        <table class="border-collapse">
          <!--/////////////////////////////////////////////////////////////////
              ////                 CABECERA DE LA TABLA                       ////
          ////////////////////////////////////////////////////////////////////-->
          <thead>
            <tr class="border-2 text-xs text-gray-400 font-normal bg-blue-800">
              <th class="w-20 border-2 border-gray-800">Partida</th>
              <th class="w-48 border-2 border-gray-800 text-red-600">
                Componente
              </th>
              <th class="w-48 border-2 border-gray-800 text-red-600">
                Ubicacion
                <br />(carril/cuerpo)
              </th>
              <th class="w-48 border-2 border-gray-800">Acciones</th>
            </tr>
          </thead>
          <!--/////////////////////////////////////////////////////////////////
              ////                 CUERPO DE LA TABLA                          ////
          ////////////////////////////////////////////////////////////////////-->
          <tbody>
            <!--/////////////////////////////////////////////////////////////////
                ////           FOOTER DE LA TABLA + PARTIDA                      ////
            ////////////////////////////////////////////////////////////////////-->
            <tr
              class="text-center"
              v-for="(item, key) in listaequipoMalo"
              :key="key"
            >
              <td class="border-2 border-gray-800">{{ item.partida }}</td>
              <td class="border-2 border-gray-800">{{ item.componente }}</td>
              <td class="border-2 border-gray-800">{{ item.ubicacion }}</td>
              <td class="border-2 border-gray-800">
                <button
                  v-on:click.stop.prevent="editar_componente_cel(key)"
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-yellow-500 m-2"
                >
                  <img
                    src="../../../assets/img/pencil.png"
                    class
                    width="10"
                    height="10"
                  />
                  <span class="text-sm">Editar</span>
                </button>
                <button
                  v-on:click.stop.prevent="borrar_componente"
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-red-600 m-2"
                >
                  <img
                    src="../../../assets/img/cerrar.png"
                    class
                    width="10"
                    height="10"
                  />
                  <span class="text-sm">Borrar</span>
                </button>
              </td>
            </tr>

            <tr class="text-center">
              <td class></td>
              <td class></td>
              <td class></td>
              <td class>
                <button
                  v-on:click.stop.prevent="
                    (modal = true), (objectMalo.rowUpPropuesto = true)
                  "
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700 m-2"
                >
                  <img
                    src="../../../assets/img/more.png"
                    class
                    width="10"
                    height="10"
                  />
                  <span class="text-sm">Agregar</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
          <!--/////////////////////////////////////////////////////////////////
           ////                 MODAL                                   ////
          ////////////////////////////////////////////////////////////////////-->
      <div class="flex flex-col p-5" v-if="modal">
        <div
          class="text-xs text-center border border-gray-800 shadow-lg rounded-lg z-40 h-72 p-2"
        >
          <h1 class="text-lg">Equipo Dañado</h1>
          <div class="inline-flex m-2">
            <div class="m-1">
              <p class="text-md mb-1 font-semibold text-gray-900">
                Componente:
              </p>
              <template v-if="!modalEdit">
                <input
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('componente_'), 'is_invalid': errors.first('componente_')}"
                  v-model="objectMalo.componente"
                  class="w-full"
                  name="componente_"
                  type="text"
                />
              </template>
              <template v-else>
                <input
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('componente_'), 'is_invalid': errors.first('componente_')}"
                  v-model="editComponent.componente"
                  class="w-full"
                  name="componente_"
                  type="text"
                />
              </template>
            </div>
            <div class="m-1">
              <p class="text-md mb-1 font-semibold text-gray-900">Unidad:</p>
              <template v-if="!modalEdit">
                <select
                    v-validate="'required'"
                    :class="{ 'is_valid': !errors.first('unidad_'), 'is_invalid': errors.first('unidad_')}"
                    class="w-12"
                    v-model="objectMalo.unidad"
                    name="unidad_"
                  >
                    <option value>Seleccion</option>
                    <option value="Pza">Pza</option>
                    <option value="Metro">Metro</option>
                  </select>
              </template>
              <template v-else>
                <select
                    v-validate="'required'"
                    :class="{ 'is_valid': !errors.first('unidad_'), 'is_invalid': errors.first('unidad_')}"
                    v-model="editComponent.unidad"
                    class="w-12"
                    name="unidad_"
                  >
                    <option value>Seleccion</option>
                    <option value="Pza">Pza</option>
                    <option value="Metro">Metro</option>
                  </select>
              </template>
            </div>
            <div class="m-1">
              <p class="text-md mb-1 font-semibold text-gray-900">Cantidad:</p>
              <template v-if="!modalEdit">
                <input
                  v-validate="'required|numeric'"
                  :class="{ 'is_valid': !errors.first('cantidad_'), 'is_invalid': errors.first('cantidad_')}"
                  v-model="objectMalo.cantidad"
                  class="w-12"
                  name="cantidad_"
                  type="text"
                />
              </template>
              <template v-else>
                <input
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('cantidad_'), 'is_invalid': errors.first('cantidad_')}"
                  v-model="editComponent.cantidad"
                  name="cantidad_"
                  class="w-12"
                  type="text"
                />
              </template>
            </div>
          </div>
          <div class="inline-flex m-2">
            <div class="m-1">
              <p class="text-md mb-1 font-semibold text-gray-900">Marca:</p>
              <template v-if="!modalEdit">
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('marca_'), 'is_invalid': errors.first('marca_')}"
                  v-model="objectMalo.marca"
                  class="w-full"
                  name="marca_"
                  type="text"
                ></textarea>
              </template>
              <template v-else>
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('marca_'), 'is_invalid': errors.first('marca_')}"
                  v-model="editComponent.marca"
                  class="w-full"
                  name="marca_"
                  type="text"
                ></textarea>
              </template>
            </div>
            <div class="m-1">
              <p class="text-md mb-1 font-semibold text-gray-900">Modelo:</p>
              <template v-if="!modalEdit">
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('modelo_'), 'is_invalid': errors.first('modelo_')}"
                  v-model="objectMalo.modelo"
                  class="w-full"
                  type="text"
                  name="modelo_"
                ></textarea>
              </template>
              <template v-else>
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('modelo_'), 'is_invalid': errors.first('modelo_')}"
                  v-model="editComponent.modelo"
                  class="w-full"
                  type="text"
                  name="modelo_"
                ></textarea>
              </template>
            </div>
            <div class="m-1">
              <p class="text-md mb-1 font-semibold text-gray-900">
                Numero Serie:
              </p>
              <template v-if="!modalEdit">
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('numserie_'), 'is_invalid': errors.first('numserie_')}"
                  v-model="objectMalo.numserie"
                  class="w-full"
                  type="text"
                  name="numserie_"
                ></textarea>
              </template>
              <template v-else>
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('numserie_'), 'is_invalid': errors.first('numserie_')}"
                  v-model="editComponent.numserie"
                  class="w-full"
                  type="text"
                  name="numserie_"
                ></textarea>
              </template>
            </div>
          </div>
          <div class="inline-flex m-2">
            <div class="m-1 mt-5">
              <p class="text-md mb-1 font-semibold text-gray-900">Ubicacion:</p>
              <template v-if="!modalEdit">
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('ubicacion_'), 'is_invalid': errors.first('ubicacion_')}"
                  v-model="objectMalo.ubicacion"
                  class="w-full"
                  placeholder="A01"
                  name="ubicacion_"
                  type="text"
                ></textarea>
              </template>
              <template v-else>
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('ubicacion_'), 'is_invalid': errors.first('ubicacion_')}"
                  v-model="editComponent.ubicacion"
                  class="w-full"
                  name="ubicacion_"
                  placeholder="A01"
                  type="text"
                ></textarea>
              </template>
            </div>
            <div class="m-1">
              <p class="text-md mb-1 font-semibold text-gray-900">
                Fecha Instalacion:
              </p>
              <template v-if="!modalEdit">
                <textarea
                  v-validate="'required|FechaValidaList'"
                  :class="{ 'is_valid': !errors.first('fechaInstalacion_'), 'is_invalid': errors.first('fechaInstalacion_')}"
                  v-model="objectMalo.fechaInstalacion"
                  class="w-full"
                  placeholder="dd/mm/yyyy"
                  name="fechaInstalacion_"
                  type="text"
                ></textarea>
              </template>
              <template v-else>
                <textarea
                  v-validate="'required|FechaValidaList'"
                  :class="{ 'is_valid': !errors.first('fechaInstalacion_'), 'is_invalid': errors.first('fechaInstalacion_')}"
                  v-model="editComponent.fechaInstalacion"
                  class="w-full"
                  placeholder="dd/mm/yyyy"
                  name="fechaInstalacion_"
                  type="text"
                ></textarea>
              </template>
            </div>
            <div class="m-1">
              <p class="text-md mb-1 font-semibold text-gray-900">
                Fecha Ultimo Mantenimiento:
              </p>
              <template v-if="!modalEdit">
                <textarea
                  v-validate="'required|FechaValidaList'"
                  :class="{ 'is_valid': !errors.first('fechaMantenimiento_'), 'is_invalid': errors.first('fechaMantenimiento_')}"
                  v-model="objectMalo.fechaMantenimiento"
                  class="w-full"
                  placeholder="dd/mm/yyyy"
                  name="fechaMantenimiento_"
                  type="text"
                ></textarea>
              </template>
              <template v-else>
                <textarea
                  v-validate="'required|FechaValidaList'"
                  :class="{ 'is_valid': !errors.first('fechaMantenimiento_'), 'is_invalid': errors.first('fechaMantenimiento_')}"
                  v-model="editComponent.fechaMantenimiento"
                  class="w-full"
                  placeholder="dd/mm/yyyy"
                  name="fechaMantenimiento_"
                  type="text"
                ></textarea>
              </template>
            </div>
          </div>
          <div class="inline-flex m-2">
            <div class="m-1">
              <p class="text-md mb-1 font-semibold text-gray-900">
                Folio Ultimo Mantenimiento:
              </p>
              <template v-if="!modalEdit">
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('folioMantenimiento_'), 'is_invalid': errors.first('folioMantenimiento_')}"
                  v-model="objectMalo.folioMantenimiento"
                  name="folioMantenimiento_"
                  class="w-full"
                  type="text"
                ></textarea>
              </template>
              <template v-else>
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('folioMantenimiento_'), 'is_invalid': errors.first('folioMantenimiento_')}"
                  v-model="editComponent.folioMantenimiento"
                  name="folioMantenimiento_"
                  class="w-full"
                  type="text"
                ></textarea>
              </template>
            </div>
            <div class="m-1 mt-5">
              <p class="text-md mb-1 font-semibold text-gray-900">
                Fecha Real:
              </p>
              <template v-if="!modalEdit">
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('fechaReal_'), 'is_invalid': errors.first('fechaReal_')}"
                  v-model="objectMalo.fechaReal"
                  name="fechaReal_"
                  class="w-full"
                  type="text"
                ></textarea>
              </template>
              <template v-else>
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('fechaReal_'), 'is_invalid': errors.first('fechaReal_')}"
                  v-model="editComponent.fechaReal"
                  class="w-full"
                  name="fechaReal_"
                  type="text"
                ></textarea>
              </template>
            </div>
            <div class="m-1">
              <p class="text-md mb-1 font-semibold text-gray-900">
                Fecha Fabricante:
              </p>
              <template v-if="!modalEdit">
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('fechaFabricante_'), 'is_invalid': errors.first('fechaFabricante_')}"
                  v-model="objectMalo.fechaFabricante"
                  name="fechaFabricante_"
                  class="w-full"
                  type="text"
                ></textarea>
              </template>
              <template v-else>
                <textarea
                  v-validate="'required'"
                  :class="{ 'is_valid': !errors.first('fechaFabricante_'), 'is_invalid': errors.first('fechaFabricante_')}"
                  v-model="editComponent.fechaFabricante"
                  name="fechaFabricante_"
                  class="w-full"
                  type="text"
                ></textarea>
              </template>
            </div>
          </div>
          <div class="flex justify-end">
            <template v-if="!modalEdit">
              <button
                v-on:click.stop.prevent="(modal = false), (objectModal = {})"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-red-700 m-2"
              >
                <img
                  src="../../../assets/img/cerrar.png"
                  class="mr-2 sm:m-1"
                  width="15"
                  height="15"
                />
                <span class="text-sm">Cancelar Normal</span>
              </button>
              <button
                v-on:click.stop.prevent="agregar_componente_cel"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700 m-2"
              >
                <img
                  src="../../../assets/img/more.png"
                  class="mr-2 sm:m-1"
                  width="15"
                  height="15"
                />
                <span class="text-sm">Aceptar</span>
              </button>
            </template>
            <template v-else>
              <button
                v-on:click.stop.prevent="(modal = false), (objectModal = {})"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-red-700 m-2"
              >
                <img
                  src="../../../assets/img/cerrar.png"
                  class="mr-2 sm:m-1"
                  width="15"
                  height="15"
                />
                <span class="text-sm">Cancelar</span>
              </button>
              <button
                v-on:click.stop.prevent="confirmar_componente_cel"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700 m-2"
              >
                <img
                  src="../../../assets/img/more.png"
                  class="mr-2 sm:m-1"
                  width="15"
                  height="15"
                />
                <span class="text-sm">Aceptar</span>
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
    <TablaEquipoPropuesto
      @desbloquear_partida="desbloquear_partida"
      :listaEquipo="listaequipoMalo"
      :typeCel="typoCelBool"
    ></TablaEquipoPropuesto>
  </div>
</template>

<script>
import TablaEquipoPropuesto from "../ModoLibre/TablaEquipoPropuestoLibre";
import EventBus from "../../../services/EventBus.js";

export default {
  name: "TablaEquipoMalo",
  components: {
    TablaEquipoPropuesto,
  },
  data() {
    return {
      listaequipoMalo: [],
      objectMalo: {
        rowUpPropuesto: "",
        rowUp: "",
        partida: "",
        unidad: 'Pza',
        componente: "",
        cantidad: "",
        marca: "",
        modelo: "",
        numserie: "",
        ubicacion: "",
        fechaInstalacion: "",
        fechaMantenimiento: "",
        folioMantenimiento: "",
        fechaReal: "",
        fechaFabricante: "",
      },
      editComponent: {},
      disable_agregar: false,
      modal: false,
      modalEdit: false,
      typoCelBool: true,
    };
  },
  props: {
    listaComponentes: {
      type: Array,
      default: () => [],
    },
    dateSinester: {
      type: String,
      required: true,
      default: "",
    },
  },
  beforeMount: function () {
    let componetesEdit = this.$store.getters["DTC/getcomponentesEdit"];

    if (JSON.stringify(componetesEdit) != "{}") {
      console.log(componetesEdit);

      for (let item of componetesEdit.requestedComponents) {
        let objectMalo = {
          rowUpPropuesto: false,
          rowUp: false,
          partida: item.item,
          unidad: item.unity,
          componente: item.component,
          cantidad: item.quantity,
          marca: item.brand,
          modelo: item.model,
          numserie: item.serialNumber,
          ubicacion: item.lane,
          fechaInstalacion: item.installationDate,
          fechaMantenimiento: item.maintenanceDate,
          folioMantenimiento: item.maintenanceFolio,
          fechaReal: item.lifeTimeReal,
          fechaFabricante: item.lifeTimeExpected,
        };
        this.listaequipoMalo.push(objectMalo);
      }
    }
  },
  watch: {
    listaequipoMalo: {
      deep: true,
      handler(newValue) {
        this.$store.commit("DTC/LISTA_DMG_LIBRE_MUTATION", newValue);
      },
    },
  },
  methods: {
    borrar_componente: function (index) {
      this.listaequipoMalo.splice(index, 1);
      EventBus.$emit("borrar_componente", index);
      let partida = 1;
      for (let item of this.listaequipoMalo) {
        item.partida = partida;
        partida += 1;
      }
    },
    desbloquear_partida: function () {
      this.disable_agregar = false;
    },
    cancelar_edicion: function (index) {
      this.listaequipoMalo[index].rowUp = false;
      this.editComponent = {};
    },
    cancelar_edicion_cel: function (index) {
      this.listaequipoMalo[index].rowUp = false;
      this.editComponent = {};
    },
    confirmar_componente_cel: function () {
      let index = this.listaequipoMalo.findIndex(
        (item) => item.partida == this.editComponent.partida
      );
      console.log(index);

      this.listaequipoMalo[index].partida = this.editComponent.partida;
      this.listaequipoMalo[index].unidad = this.editComponent.unidad;
      this.listaequipoMalo[index].componente = this.editComponent.componente;
      this.listaequipoMalo[index].cantidad = this.editComponent.cantidad;
      this.listaequipoMalo[index].marca = this.editComponent.marca;
      this.listaequipoMalo[index].modelo = this.editComponent.modelo;
      this.listaequipoMalo[index].numserie = this.editComponent.numserie;
      this.listaequipoMalo[index].ubicacion = this.editComponent.ubicacion;
      this.listaequipoMalo[
        index
      ].fechaInstalacion = this.editComponent.fechaInstalacion;
      this.listaequipoMalo[
        index
      ].fechaMantenimiento = this.editComponent.fechaMantenimiento;
      this.listaequipoMalo[
        index
      ].folioMantenimiento = this.editComponent.folioMantenimiento;
      this.listaequipoMalo[index].fechaReal = this.editComponent.fechaReal;
      this.listaequipoMalo[
        index
      ].fechaFabricante = this.editComponent.fechaFabricante;

      this.listaequipoMalo[index].rowUp = false;

      let obj = {
        data: this.editComponent,
        index: index,
      };

      EventBus.$emit("editar_componente", obj);

      this.modal = false;
      this.modalEdit = false;
      this.editComponent = {};
    },
    confirmar_componente: function (index) {
      this.listaequipoMalo[index].partida = this.editComponent.partida;
      this.listaequipoMalo[index].unidad = this.editComponent.unidad;
      this.listaequipoMalo[index].componente = this.editComponent.componente;
      this.listaequipoMalo[index].cantidad = this.editComponent.cantidad;
      this.listaequipoMalo[index].marca = this.editComponent.marca;
      this.listaequipoMalo[index].modelo = this.editComponent.modelo;
      this.listaequipoMalo[index].numserie = this.editComponent.numserie;
      this.listaequipoMalo[index].ubicacion = this.editComponent.ubicacion;
      this.listaequipoMalo[
        index
      ].fechaInstalacion = this.editComponent.fechaInstalacion;
      this.listaequipoMalo[
        index
      ].fechaMantenimiento = this.editComponent.fechaMantenimiento;
      this.listaequipoMalo[
        index
      ].folioMantenimiento = this.editComponent.folioMantenimiento;
      this.listaequipoMalo[index].fechaReal = this.editComponent.fechaReal;
      this.listaequipoMalo[
        index
      ].fechaFabricante = this.editComponent.fechaFabricante;

      


      this.listaequipoMalo[index].rowUp = false;
      let obj = {
        data: this.editComponent,
        index: index,
      };

      EventBus.$emit("editar_componente", obj);
      this.editComponent = {};
    },
    editar_componente_cel: function (index) {
      this.editComponent.rowUpPropuesto = this.listaequipoMalo[
        index
      ].rowUpPropuesto;
      this.editComponent.rowUp = this.listaequipoMalo[index].rowUp;
      this.editComponent.partida = this.listaequipoMalo[index].partida;
      this.editComponent.unidad = this.listaequipoMalo[index].unidad;
      this.editComponent.componente = this.listaequipoMalo[index].componente;
      this.editComponent.cantidad = this.listaequipoMalo[index].cantidad;
      this.editComponent.marca = this.listaequipoMalo[index].marca;
      this.editComponent.modelo = this.listaequipoMalo[index].modelo;
      this.editComponent.numserie = this.listaequipoMalo[index].numserie;
      this.editComponent.ubicacion = this.listaequipoMalo[index].ubicacion;
      this.editComponent.fechaInstalacion = this.listaequipoMalo[
        index
      ].fechaInstalacion;
      this.editComponent.fechaMantenimiento = this.listaequipoMalo[
        index
      ].fechaMantenimiento;
      this.editComponent.folioMantenimiento = this.listaequipoMalo[
        index
      ].folioMantenimiento;
      this.editComponent.fechaReal = this.listaequipoMalo[index].fechaReal;
      this.editComponent.fechaFabricante = this.listaequipoMalo[
        index
      ].fechaFabricante;

      this.modal = true;
      this.modalEdit = true;
    },
    editar_componente: function (index) {
      this.editComponent = { ...this.listaequipoMalo[index] };
      this.listaequipoMalo[index].rowUp = true;
    },
    agregar_componente_cel: function () {
      this.$validator
        .validateAll()
        .then((item) => {
          if (item) {
            let partida = 0;
            this.typoCelBool = false;
            this.objectMalo.rowUpPropuesto = false;
            this.objectMalo.partida = this.listaequipoMalo.length + 1;
            partida = this.objectMalo.partida;
            this.listaequipoMalo.push(Object.assign({}, this.objectMalo));
            for (const propiedades in this.objectMalo) {
              this.objectMalo[propiedades] = "";
            }
            this.modal = false;
            this.objectMalo.unidad = 'Pza'
            EventBus.$emit("nuevo_componente", partida);
          } else {
            this.$notify.error({
              title: "Error",
              msg: `FALTA LLENAR CAMPOS PARA LA PARTIDA.`,
              position: "bottom right",
              styles: {
                height: 100,
                width: 500,
              },
            });
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: "Error",
            msg: `${err}.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        });
    },
    agregar_componente: function () {
      this.$validator
        .validateAll()
        .then((item) => {
          if (item) {
            this.disable_agregar = true;
            this.objectMalo.partida = this.listaequipoMalo.length + 1;
            this.objectMalo.rowUp = false;
            this.objectMalo.rowUpPropuesto = true;
            this.listaequipoMalo.push(Object.assign({}, this.objectMalo));
            for (const propiedades in this.objectMalo) {
              this.objectMalo[propiedades] = "";
            }
            this.objectMalo.unidad = 'Pza'
          } else {
            this.$notify.error({
              title: "Error",
              msg: `FALTA LLENAR CAMPOS PARA LA PARTIDA.`,
              position: "bottom right",
              styles: {
                height: 100,
                width: 500,
              },
            });
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: "Error",
            msg: `${err}.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        });
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.tooltip {
  display: block !important;
  z-index: 10000;

}

.tooltip .tooltip-inner {
  background: #2d3748;
  opacity: .80;
  color: white;
  border-radius: 56px;

  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: #2d3748;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}

</style>