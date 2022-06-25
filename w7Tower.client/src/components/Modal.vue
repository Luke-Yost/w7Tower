<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Create Tower Event</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createEvent">
            <input class="form-control m-2" type="text" required placeholder="Event Name" v-model="eventData.name" />
            <input class="form-control m-2" type="text" required placeholder="Image" v-model="eventData.coverImg" />
            <input class="form-control m-2" type="text" required placeholder="Event Location"
              v-model="eventData.location" />
            <input class="form-control m-2" type="number" required placeholder="Event Capacity"
              v-model="eventData.capacity" />
            <input class="form-control m-2" type="date" required placeholder="Event Date"
              v-model="eventData.startDate" />
            <select class="form-select form-select m-2" aria-label=".form-select-lg example">
              <option selected>Event Types:</option>
              <option value="concert">Concert</option>
              <option value="digital">Digital</option>
              <option value="sport">Sport</option>
              <option value="convention">Convention</option>
            </select>
            <textarea class="form-control m-2" cols="35" rows="10" required placeholder="Event Details and Description"
              v-model="eventData.description"></textarea>
            <div class="d-flex justify-content-center">
              <button @click.prevent="createEvent()" class="m-2">Create Event Post!</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

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
  props: { editEvent: { type: Object, required: false, default: {} } },
  setup(props) {
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
    watchEffect(() => {
      logger.log(props.editEvent);
      eventData.value = props.editEvent;
    })
    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events),
      // let myEvents = events.find(m =>eventData.creatorId),
      eventData,
      async createEvent() {
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