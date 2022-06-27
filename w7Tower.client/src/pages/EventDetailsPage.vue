<template>
  <div class="container">
    <div class="row">
      <div class="col-12 offset-1 d-flex justify-content-center">
        <h2 class="m-3 border border-2 border-dark text-info rounded p-2 bg-light shadow">{{activeEvent.name}}</h2>
      </div>
      <div class="col-12">
        <div class="row border border-2 border-dark text-dark rounded bg-light shadow d-flex">
          <div class="col-12 d-flex justify-content-center border  m-1">
            <img class="justify-content-center m-1 rounded" :src="activeEvent.coverImg" alt="event image">
          </div>
          <div class="col-12 border border-top-3 border-dark">
            <p class="fs-5">{{activeEvent.description}}</p>
          </div>
          <div class="col-md-6 d-flex flex-column align-content-center fs-4">
            <p>{{activeEvent.location}}</p>
            <p>Available Tickets{{activeEvent.capacity}}</p>
            <p>{{activeEvent.startDate}}</p>
          </div>
          <div class="col-md-6 d-flex flex-column align-content-center fs-4">
            <p>Hosted By {{activeEvent.creator.name}}</p>
            <p>Event Type: {{activeEvent.type}}</p>
            <button v-show="activeEvent.creator.id ==account.id" @click="cancelEvent(activeEvent.id)" class="btn btn-danger">Cancel Event</button>
          </div>
        </div>
      </div>
      
      </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "vue"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {

  setup(){

    return {
      account: computed(() => AppState.account),
      activeEvent: computed(() => AppState.activeEvent),
      async cancelEvent(eventId){
        try {
          await eventsService.cancelEvent(eventId)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    
    }
  }
}
</script>


<style lang="scss" scoped>
img{
  max-width:fit-content ;
  max-height: 400px;
}
</style>