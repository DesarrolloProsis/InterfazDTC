<template>
  <div class="">
    <Nav></Nav>
    <div class="pl-10 pr-10 mt-10 mb-32">
        <vue-cal selected-date="2021-01-19"         
        :disable-views="['years', 'year','week']"
        active-view="month"
        locale="es"         
        :eventsCountOnYearView="true"        
        @cell-click="cellclick"
        events-on-month-view="short"
        :events="events"
        :on-event-click="onEventClick">
        
  <template v-slot:title="{ title, view }">
    🎉
    <span v-if="view.id === 'years'">Years</span>
    <!-- Using Vue Cal injected Date prototypes -->    
    <span v-else-if="view.id === 'month'">{{ view.startDate.format('MMMM YYYY') }}</span>    
    <span v-else-if="view.id === 'day'">{{ view.startDate.format('dddd D MMMM (YYYY)') }}</span>
    🎉
  </template>
    <!-- Custom cells -->
  <template v-slot:cell-content="{ cell, view, events }">    
      
  
    
  </template>

        

</vue-cal>
    </div>
  </div>
</template>

<script>
import Nav from "../../components/Navbar";
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/es.js'

export default {
  components:{
    VueCal,
    Nav
  },
  data() {
    return{
      events: [
    {
      start: '2021-01-20',
      end: '2021-01-20',
      title: 'Actividad Mensual',
      content: '<i class="v-icon material-icons">shopping_cart</i>',
      class: 'leisure',
      deletable: true,
      allDay: true
    },
    {
      start: '2021-01-19',
      end: '2021-01-19',
      title: 'Golf with John',
      content: '<i class="v-icon material-icons">golf_course</i>',
      class: 'sport'
    },
    {
      start: '2021-01-21',
      end: '2021-01-21',
      title: 'Dad\'s birthday!',
      content: '<div class="text-2xl w-64 inline-block bg-blue-600"><p>Ayuda</p><p>Ayuda</p><p>Ayuda</p></div>',
      class: 'sport'
    },
  
    
  ]
    }
  },
  methods: {
    onEventClick(){
      
    },
    cellclick(item){
      
      console.log(item)
    }
  }
}
</script>

<style >
.vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
.vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}
.vuecal--month-view .vuecal__cell {height: 90px;}

.vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: flex-end;
}
.vuecal__menu, .vuecal__cell-events-count { background-color :  #42b983 ;} 


</style>