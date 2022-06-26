<template>
  <div v-if="event.capacity  > 0">
    <div class="event col-12 m-2 p-1 border border-info border-3 bg-light rounded shadow">
    <div class="row">
      <div class="col-md-6">
        <h3>Event Title: {{event.name}} </h3>
        <h3>Date: {{event.startDate.substring(0,10)}}</h3>
      </div>
      <div class="col-md-6">
        <h3>Remaining Tickets: {{event.capacity}}</h3>
        <h3>Event Location: {{event.location}}</h3>
      </div>
      <div class="col-12 d-flex justify-content-evenly">
        <button class="btn btn-success">Get Ticket</button>
      </div>
      <div class="col-12 d-flex justify-content-evenly">
        <button @click="getComments" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
          See Comments
        </button>
      </div>
    </div>
  </div>
  </div>
  <div v-if="event.capacity == 0 || event.isCanceled">
    <div class="event col-12 m-2 p-1 border border-dark border-3 bg-danger text-light rounded shadow">
    <div class="row">
      <div class="col-md-6">
        <h3>Event Title: {{event.name}} </h3>
        <h3>Date: {{event.startDate.substring(0,10)}}</h3>
      </div>
      <div class="col-md-6">
        <h3>Remaining Tickets: {{event.capacity}}</h3>
        <h3>Event Location: {{event.location}}</h3>
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
      
      // getComments(){
      //   router.push({ name: 'EventComments', params: { id: props.event.id}})
      // },
      account: computed(() => AppState.account),
      comments: computed( () => AppState.eventComments),
    }
  }
}
</script>


<style lang="scss" scoped>

</style>