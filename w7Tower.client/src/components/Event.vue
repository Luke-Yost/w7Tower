<template>
  <div v-if="event.capacity  > 0">
    <div id="event" class="row m-1 px-2 pt-1 bg-light rounded shadow">
      <div class="col-12">
        <h4 class="text-center">{{event.name}} </h4>
        <p class="fs-6">Date: {{formatEventDate(event.startDate)}}</p>
        <p class="fs-6">Remaining Tickets: {{event.capacity}}</p>
        <p class="fs-6">Location: {{event.location}}</p>
      </div>
      <div class="col-12 border-top border-3 border-dark d-flex justify-content-center m-0 pt-3">
        <button @click="setActiveEvent(event)" type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
          See Comments
        </button>
      </div>
      <div class="col-12 d-flex justify-content-evenly py-1">
        <button  @click="getTicket(event.id)"  class="btn btn-sm btn-success">Get Ticket</button>
        <router-link class="" :to="{ name: 'EventDetails' }">
          <button class="btn btn-sm btn-info" @click="setActiveEvent(event)">Event Details</button>
        </router-link>
      </div>
    </div>
  </div>

  <div v-if="event.capacity == 0 || event.isCanceled">
    <div id="event" class="row m-1 p-2 border border-danger border-3 bg-dark text-light rounded shadow">
      <div class="col-12">
        <h4>{{event.name}} </h4>
        <p class="fs-6">Date: {{formatEventDate(event.startDate)}}</p>
        <p class="fs-6">Remaining Tickets: {{event.capacity}}</p>
        <p class="fs-6">Location: {{event.location}}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState"
import { computed, onMounted, reactive, watchEffect } from "vue"
import { logger } from "../utils/Logger"
import Pop from '../utils/Pop'
import { eventsService } from "../services/EventsService"
import {ticketsService} from  "../services/TicketsService"
import { useRouter } from 'vue-router'
export default {
  props: { event: { type: Object, required: true}},
  setup(props){
    const router = useRouter()
    return {
      async getTicket(event){
        try {
          await ticketsService.getTicket(event)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      formatEventDate(inputDate){
              let prettyDate = new Date(inputDate).toDateString()
              return `${prettyDate}`
            },
    setActiveEvent(event){
      AppState.activeEvent = event
      console.log(AppState.activeEvent);
      this.getComments(event)
      this.getAttendees(event)
    },
      async getComments(event){
        await eventsService.getEventComments(event)
      },
      async getAttendees(event){
        await eventsService.getAttendees(event)
      },
      account: computed(() => AppState.account),
      comments: computed( () => AppState.eventComments),
      activeEvent: computed( () => AppState.activeEvent),
    }
  }
}
</script>


<style lang="scss" scoped>
  #event{
    height: 50vh;
  }
  .btn{
    height: min-content;
  }
</style>