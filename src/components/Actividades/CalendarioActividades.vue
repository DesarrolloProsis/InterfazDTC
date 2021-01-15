<template>
  <div>
    <Nav></Nav>
    <div class="text-center mt-5">
      <h2 class=" text-2xl">Calendario de Actividades</h2>
      <p class="text-lg font-medium text-gray-600 mb-6">
        Roll your own calendars using scoped slots
      </p>
    </div>
    <div class="pl-10 pr-10">
      <v-calendar
        @dayclick="onDayClick"
        class="max-w-full"
        :masks="masks"
        :attributes="attributes"                   
        is-expanded
      >
        <template :dayEvents='onDayClick' v-slot:day-content="{ day, attributes }">
          <div class="flex flex-col h-full z-10 overflow-hidden">
            <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
            <div class="flex-grow overflow-y-auto overflow-x-auto">
              <p v-for="(attr, key) in attributes" :key="key" class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1" :class="attr.customData.class">
                {{ attr.customData.title }}
              </p>
            </div>
          </div>
        </template>
      </v-calendar>
    </div>
  </div>
</template>

<script>
import Nav from "../../components/Navbar";
export default {
  components:{
    Nav
  },
  data() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
      masks: {
        weekdays: 'WWW',
      },
      attributes: [
        {
          key: 1,
          customData: {
            title: 'Lunch with mom.',
            class: 'bg-red-600 text-white',
          },
          dates: new Date(year, month, 1),
        },
        {
          key: 8,
          customData: {
            title: 'Lunch with mom.',
            class: 'bg-red-600 text-white',
          },
          dates: new Date(year, month, 1),
        },
        {
          key: 2,
          customData: {
            title: 'Take Noah to basketball practice',
            class: 'bg-blue-500 text-white',
          },
          dates: new Date(year, month, 2),
        },
        {
          key: 3,
          customData: {
            title: "Noah's basketball game.",
            class: 'bg-blue-500 text-white',
          },
          dates: new Date(year, month, 5),
        },
        {
          key: 4,
          customData: {
            title: 'Take car to the shop',
            class: 'bg-indigo-500 text-white',
          },
          dates: new Date(year, month, 5),
        },
        {
          key: 4,
          customData: {
            title: 'Meeting with new client.',
            class: 'bg-teal-500 text-white',
          },
          dates: new Date(year, month, 7),
        },
        {
          key: 5,
          customData: {
            title: "Mia's gymnastics practice.",
            class: 'bg-pink-500 text-white',
          },
          dates: new Date(year, month, 11),
        },
        {
          key: 6,
          customData: {
            title: 'Cookout with friends.',
            class: 'bg-orange-500 text-white',
          },
          dates: { months: 5, ordinalWeekdays: { 2: 1 } },
        },
        {
          key: 7,
          customData: {
            title: "Mia's gymnastics recital.",
            class: 'bg-pink-500 text-white',
          },
          dates: new Date(year, month, 22),
        },
        {
          key: 8,
          customData: {
            title: 'Visit great grandma.',
            class: 'bg-red-600 text-white',
          },
          dates: new Date(year, month, 25),
        },
      ],
    };
  },
  methods:{
    onDayClick(day){
      alert('hola mundo!')
      console.log(day)
    }
  }
};
</script>

