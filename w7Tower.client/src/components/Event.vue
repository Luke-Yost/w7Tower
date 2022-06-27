<template>
  <div v-if="event.capacity  > 0">
    <div class="event col-12 m-2 p-1 border border-info border-3 bg-light rounded shadow">
    <div class="row">
      <div class="col-md-6">
        <p class="fs-3">Event Title: {{event.name}} </p>
        <p class="fs-3">Date: {{event.startDate.substring(0,10)}}</p>
      </div>
      <div class="col-md-6">
        <p class="fs-3">Remaining Tickets: {{event.capacity}}</p>
        <p class="fs-3">Event Location: {{event.location}}</p>
      </div>
      <div class="col-12 d-flex justify-content-evenly p-2">
        <button @click="getTicket(event.id)" class="btn btn-success">Get Ticket</button>
        <button @click="setActiveEvent(event)" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
          See Comments
        </button>
      </div>
    </div>
  </div>
  </div>
  <div v-if="event.capacity == 0 || event.isCanceled">
    <div class="event col-12 m-2 p-1 border border-danger border-3 bg-dark text-light rounded shadow">
    <div class="row">
      <div class="col-md-6">
        <p class="fs-3">Event: {{event.name}} </p>
        <p class="fs-3">Date: {{event.startDate.substring(0,10)}}</p>
      </div>
      <div class="col-md-6">
        <p class="fs-3">Remaining Tickets: {{event.capacity}}</p>
        <p class="fs-3">Location: {{event.location}}</p>
      </div>
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
    // const route = useRouter()
    //   watchEffect(async () => {
    //       try {
    //         if (route.name == 'EventComments') {
    //           await eventsService.getEventComments(route.params.id)
    //           console.log('comments request sent');
    //         }
    //       } catch (error) {
    //         logger.error(error)
    //         Pop.toast(error.message, 'error')
    //       }
    //     })
    return {
      async getTicket(event){
        try {
          await ticketsService.getTicket(event)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
    setActiveEvent(event){
      AppState.activeEvent = event
      console.log(AppState.activeEvent);
      this.getComments(event)
    },
      async getComments(event){
        await eventsService.getEventComments(event)
      },
      account: computed(() => AppState.account),
      comments: computed( () => AppState.eventComments),
      activeEvent: computed( () => AppState.activeEvent),
    }
  }
}
</script>


<style lang="scss" scoped>

</style>