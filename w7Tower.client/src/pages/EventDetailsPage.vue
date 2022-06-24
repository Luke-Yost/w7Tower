<template>
  <div class="container">
    <div class="row">
      <div class="col-10 offset-1 d-flex justify-content-center">
        <h2 class="m-3 border border-2 border-dark text-info rounded p-2 bg-light shadow">Create a Tower Event Posting!</h2>
      </div>
    </div>  
    <div class="row">
      <div class="col-10 offset-1 bg-dark border border-info border-3 rounded p-3 justify-content-center">
        <form @submit.prevent="createEvent">
          <input
            class="form-control m-2"
            type="text"
            required
            placeholder="Event Name"
            v-model="eventData.name"
          />
          <input
            class="form-control m-2"
            type="text"
            required
            placeholder="Image"
            v-model="eventData.coverImg"
          />
          <input
            class="form-control m-2"
            type="text"
            required
            placeholder="Event Location"
            v-model="eventData.location"
          />
          <input
            class="form-control m-2"
            type="number"
            required
            placeholder="Event Capacity"
            v-model="eventData.capacity"
          />
          <input
            class="form-control m-2"
            type="date"
            required
            placeholder="Event Date"
            v-model="eventData.startDate"
          />
          <input
              class="form-control m-2"
            type="text"
            required
            placeholder="Event Type"
            v-model="eventData.type"
          />
          <textarea
            class="form-control m-2"
            cols="35"
            rows="10"
            required
            placeholder="Event Details and Description"
            v-model="eventData.description"
          ></textarea>
          <div class="d-flex justify-content-center">
            <!-- <button class="m-2">Abandon Event</button> -->
            <button @click.prevent="createEvent()" class="m-2">Create Event Post!</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-10 offset-1">
        <h2>Your Posted Tower Events</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-10 offset-1">
        
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
  props: { editEvent: { type: Object, required: false, default: {}}},
  setup(props){
        onMounted(async () => {
            try {
                await eventsService.getEvents();
            }
            catch (error) {
                logger.error(error);
                Pop.toast(error.message, "error");
            }
        });
      const eventData = ref({});
      watchEffect(()=>{
        logger.log(props.editEvent);
        eventData.value = props.editEvent;
      })
    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events),
      let myEvents = events.find(m =>eventData.creatorId) ,
      eventData,
      async createEvent(){
        try {
          logger.log(eventData.value)
          await eventsService.createEvent(eventData.value)
          eventData.value = {};
                Pop.toast("Tower Event Posted!", "success")
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

</style>