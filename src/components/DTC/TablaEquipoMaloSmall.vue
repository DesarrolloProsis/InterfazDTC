<template>
  <div>
    <!-- <TablaEquipoPropuesto :listaEquipo="arrayPartidas"></TablaEquipoPropuesto> -->
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
// import TablaEquipoPropuesto from "../DTC/TablaEquipoPropuesto.vue";
import Service from "../../services/EquipoMaloService.js";
import moment from "moment";

export default {
  name: "TablaEquipoMalo",
  components: {
    Multiselect,
    //TablaEquipoPropuesto
  },
  data() {
    return {
      datosPrePartida: {
        rowPartida: [],
        rowUnidad: [],
        rowName: "",
        rowCantidad: 0,
        rowMarca: [],
        rowModelo: [],
        rowNumSerie: [],
        rowUbicacion: [],
        rowDateInstalacion: [],
        rowDateMantenimiento: [],
        rowFolioMantenimiento: [],
        rowDateReal: [],
        rowDateFabricante: [],
        rowPrecio: [],
        rowUp: true,
      },
      arrayPartidas: [],
      //nombre del Compoente
      updtComp: "",
      //Multiselect Normal
      listLane: [],
      laneSelect: [],
      //datos para editar Componente
      saveObjectEdiar: [],
      objectEditar: {},
      updtCompEditar: "",
      listLaneEditar: [],
      laneSelectEditar: [],
      //Modal atributos
      modal: false,
      objectModal: {},
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
  methods: {
    UpdateComp: async function () {
      for (const propiedades in this.datosPrePartida) {
        this.datosPrePartida[propiedades] = [];
      }
      this.listLane = [];
      this.laneSelect = [];

      let comp_rep = this.arrayPartidas.some((item) => {
        return (
          item["row3"].description == this.updtComp.description &&
          item["row3"].brand == this.updtComp.brand
        );
      });

      if (!comp_rep) {
        let newObject = await this.$store.getters["Header/getConvenioPlaza"];
        newObject["id"] = this.updtComp;
        await this.$store.dispatch("Refacciones/buscarComponenteId", newObject);
        this.listLane = await this.$store.getters["Refacciones/getListaLane"];
      } else {
        this.updtComp = "";
        this.$notify.warning({
          title: "Ups!",
          msg: `EL COMPONENTE ESTA REPETIDO.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
    },
    UpdateCompEditado: async function () {
      let comp_rep = this.arrayPartidas.some((item) => {
        return (
          item["row3"].description == this.updtCompEditar.description &&
          item["row3"].brand == this.updtCompEditar.brand
        );
      });

      if (!comp_rep) {
        this.laneSelectEditar = [];
        this.listLaneEditar = [];
        let newObject = await this.$store.getters["Header/getConvenioPlaza"];
        newObject["id"] = this.updtCompEditar;
        await this.$store.dispatch("Refacciones/buscarComponenteId", newObject);
        this.listLaneEditar = await this.$store.getters[
          "Refacciones/getListaLane"
        ];
      } else if (
        this.updtCompEditar.description ==
          this.saveObjectEdiar[2].description &&
        this.updtCompEditar.brand == this.saveObjectEdiar[2].brand
      ) {
        this.updtCompEditar = "";
        this.laneSelectEditar = [];
        this.listLaneEditar = [];
        for (const propiedades in this.objectEditar) {
          this.objectEditar[propiedades] = [];
        }
        this.$notify.warning({
          title: "Ups!",
          msg: `ESTAS EDITANDO EL COMPONENTE.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      } else {
        this.laneSelectEditar = [];
        for (const propiedades in this.objectEditar) {
          this.objectEditar[propiedades] = [];
        }
        this.$notify.warning({
          title: "Ups!",
          msg: `EL COMPONENTE ESTA REPETIDO.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
    },
    deleteItem: function (index) {
      this.arrayPartidas.splice(index, 1);
      for (let i = 0; i < this.arrayPartidas.length; i++) {
        this.arrayPartidas[i]["row1"] = i + 1;
      }
      this.$store.commit("DTC/listaDmgMutationDelete", index);
    },
    updateRowTable: async function (index, datos) {
      if (this.saveObjectEdiar.length == 0) {
        this.saveObjectEdiar = Object.values(datos);
        this.updtCompEditar = this.saveObjectEdiar[2];

        let newObject = await this.$store.getters["Header/getConvenioPlaza"];
        newObject["id"] = this.updtCompEditar;
        await this.$store.dispatch("Refacciones/buscarComponenteId", newObject);
        this.listLaneEditar = await this.$store.getters[
          "Refacciones/getListaLane"
        ];

        this.laneSelectEditar = this.saveObjectEdiar[7];
        this.arrayPartidas[index]["rowUp"] = false;
      } else {
        this.$notify.warning({
          title: "Ups!",
          msg: `YA SE ESTA EDITANDO UN COMPONENTE.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
    },
    confirmRowTable: async function (index) {
      if (this.updtCompEditar != "") {
        if (this.laneSelectEditar.length > 0) {
          let equipoValid = await this.$store.getters[
            "Refacciones/getEquipoMalo"
          ];
          //AGREGAMOS PARTIDA AL STORE
          let objPartida = Service.obj_partida(
            this.laneSelectEditar,
            equipoValid,
            this.dateSinester
          );

          let objMutation = {
            index: index,
            value: objPartida,
          };
          this.$store.commit("DTC/listaDmgMutationUpdate", objMutation);

          //COMPLETAMOS ATRIBUTOS QUE FALTAN
          let key_partidas = [
            "row1",
            "row2",
            "row3",
            "row4",
            "row5",
            "row6",
            "row7",
            "row8",
            "row9",
            "row10",
            "row11",
            "row12",
            "row13",
            "row14",
            "rowUp",
          ];
          let new_partida = Service.lane_select(
            this.laneSelectEditar,
            key_partidas,
            equipoValid,
            this.dateSinester
          );

          new_partida["row1"] = index + 1;
          new_partida["row2"] = this.objectEditar.rowUpd2;
          new_partida["row3"] = this.updtCompEditar;
          new_partida["row8"] = this.laneSelectEditar;

          this.arrayPartidas.splice(index, 1, new_partida);

          this.objectEditar = {};
          this.saveObjectEdiar = [];
          this.laneSelectEditar = [];
          this.updtCompEditar = "";
          this.listLaneEditar = [""];
        } else {
          this.$notify.warning({
            title: "Ups!",
            msg: `FALTA AGREGAR LA UBICACION.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        }
      } else {
        this.$notify.warning({
          title: "Ups!",
          msg: `FALTA AGREGAR UN COMPONENTE.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
    },
    abortUpdateRowTable: function (index) {
      let lanes = this.saveObjectEdiar[7];
      let key_abort = [
        "row1",
        "row2",
        "row3",
        "row4",
        "row5",
        "row6",
        "row7",
        "row8",
        "row9",
        "row10",
        "row11",
        "row12",
        "row13",
        "row14",
        "rowUp",
      ];
      let newObject = this.$store.getters["Header/getConvenioPlaza"];
      newObject["id"] = this.saveObjectEdiar[2];
      this.$store.dispatch("Refacciones/buscarComponenteId", newObject);
      let equipoValid = this.$store.getters["Refacciones/getEquipoMalo"];
      let obj_abort = Service.lane_select(
        lanes,
        key_abort,
        equipoValid,
        this.dateSinester
      );

      obj_abort["row3"] = this.saveObjectEdiar[2];
      obj_abort["row8"] = this.saveObjectEdiar[7];
      this.arrayPartidas[index] = obj_abort;

      this.saveObjectEdiar = [];
      this.objectEditar = {};
      this.listLaneEditar = [""];
      this.updtCompEditar = "";
      this.laneSelectEditar = [];
    },
    agregarPartida: async function () {
      if (this.updtComp != "") {
        if (this.laneSelect.length > 0) {
          let equipoValid = await this.$store.getters[
            "Refacciones/getEquipoMalo"
          ];
          //AGREGAMOS PARTIDA AL STORE
          let objPartida = Service.obj_partida(
            this.laneSelect,
            equipoValid,
            this.dateSinester
          );
          this.$store.commit("DTC/newlistaDmgMutationPush", objPartida);

          //COMPLETAMOS ATRIBUTOS QUE FALTAN
          let key_partidas = [
            "row1",
            "row2",
            "row3",
            "row4",
            "row5",
            "row6",
            "row7",
            "row8",
            "row9",
            "row10",
            "row11",
            "row12",
            "row13",
            "row14",
            "rowUp",
          ];
          let new_partida = Service.lane_select(
            this.laneSelect,
            key_partidas,
            equipoValid,
            this.dateSinester
          );

          new_partida["row1"] = this.arrayPartidas.length + 1;
          new_partida["row3"] = this.updtComp;
          new_partida["row8"] = this.laneSelect;

          this.arrayPartidas.push(new_partida);

          //LIMPIA LA LISTA PRE_PARTIDA
          for (const propiedades in this.datosPrePartida) {
            if (propiedades == "rowCantidad")
              this.datosPrePartida[propiedades] = 0;
            else this.datosPrePartida[propiedades] = [];
          }
          //LIMPIAMOS COMPONENTE Y LANE
          this.updtComp = "";
          this.laneSelect = [];
          this.listLane = [];
        } else {
          this.$notify.warning({
            title: "Ups!",
            msg: `FALTA AGREGAR UN COMPONENTE.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        }
      } else {
        this.$notify.warning({
          title: "Ups!",
          msg: `FALTA AGREGAR LA UBICACION.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
    },
    infoModal: function (value) {
      this.modal = true;
      this.objectModal = Object.assign(this.arrayPartidas[value]);
    },
  },
  watch: {
    laneSelect: async function (newValue) {
      for (const propiedades in this.datosPrePartida) {
        if (propiedades == "rowCantidad") this.datosPrePartida[propiedades] = 0;
        else this.datosPrePartida[propiedades] = [];
      }
      if (newValue.length > 0) {
        let equipoValid = await this.$store.getters[
          "Refacciones/getEquipoMalo"
        ];
        this.datosPrePartida = Service.lane_select(
          newValue,
          this.datosPrePartida,
          equipoValid,
          this.dateSinester
        );
      }
    },
    laneSelectEditar: async function (newValue) {
      for (const propiedades in this.objectEditar) {
        if (propiedades == "rowUpd4") this.objectEditar[propiedades] = 0;
        else this.objectEditar[propiedades] = [];
      }
      if (newValue.length > 0) {
        let key_updt = [
          "rowUpd1",
          "rowUpd2",
          "rowUpd3",
          "rowUpd4",
          "rowUpd5",
          "rowUpd6",
          "rowUpd7",
          "rowUpd8",
          "rowUpd9",
          "rowUpd10",
          "rowUpd11",
          "rowUpd12",
          "rowUpd13",
          "rowUpd14",
          "rowUpd15",
        ];
        let equipoValid = await this.$store.getters[
          "Refacciones/getEquipoMalo"
        ];
        this.objectEditar = await Service.lane_select(
          newValue,
          key_updt,
          equipoValid,
          this.dateSinester
        );
        this.listLaneEditar = await this.$store.getters[
          "Refacciones/getListaLane"
        ];
      }
    },
  },
  filters: {
    formatDate: function (value) {
      return moment(value.substring(0, 10)).format("DD/MM/YYYY");
    },
    formatPlaza: function (value) {
      return value.split("-")[0];
    },
  },
  destroyed: function () {
    this.arrayPartidas = [];
    this.$store.commit("DTC/listaDmgClearMutation");
    this.$store.commit("DTC/insertDmgCompleteMutation", false);
    this.$store.commit("Header/insertHeaderCompleteMutation", false);
    this.$store.dispatch("Header/buscarListaUnique");
    this.$store.commit("Header/clearDatosSinesterMutation");
    this.$store.commit("DTC/COMPONENTES_EDIT", {});
    this.$store.commit("Header/DIAGNOSTICO_MUTATION", "");
  },
  beforeMount: async function () {
    let componetesEdit = await this.$store.getters["DTC/getcomponentesEdit"];

    if (JSON.stringify(componetesEdit) != "{}") {
      for (const item of componetesEdit.items) {
        let newObject = await this.$store.getters["Header/getConvenioPlaza"];
        newObject["id"] = { description: item.name, brand: item.marca };
        await this.$store.dispatch("Refacciones/buscarComponenteId", newObject);
        let equipoValid = await this.$store.getters[
          "Refacciones/getEquipoMalo"
        ];

        let array_ubicacion = [];

        componetesEdit.serialNumbers.map((lane) => {
          if (item.item == lane.item)
            array_ubicacion.push(lane.lane_SerialNumber.replace(/ /g, ""));
        });

        let otra_prueba = await this.$store.getters["Header/getFechaSiniestro"];
        //AGREGAMOS PARTIDA AL STORE
        let objPartida = Service.obj_partida(
          array_ubicacion,
          equipoValid,
          otra_prueba
        );

        await this.$store.commit("DTC/newlistaDmgMutationPush", objPartida);

        //COMPLETAMOS ATRIBUTOS QUE FALTAN
        let key_partidas = [
          "row1",
          "row2",
          "row3",
          "row4",
          "row5",
          "row6",
          "row7",
          "row8",
          "row9",
          "row10",
          "row11",
          "row12",
          "row13",
          "row14",
          "rowUp",
        ];
        let new_partida = Service.lane_select(
          array_ubicacion,
          key_partidas,
          equipoValid,
          otra_prueba
        );

        new_partida["row1"] = this.arrayPartidas.length + 1;
        new_partida["row3"] = { description: item.name, brand: item.marca };
        new_partida["row8"] = array_ubicacion;

        this.arrayPartidas.push(new_partida);
      }
    }
  },
};
</script>

