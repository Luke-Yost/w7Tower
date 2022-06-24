<template>
  <div class="event col-12 m-2 p-1 border border-info border-3 bg-light rounded">
    <div class="row">
      <div class="col-6">
        <h3>Event Title: {{event.name}} </h3>
        <h3>Date: {{event.startDate}}</h3>
      </div>
      <div class="col-6">
        <h3>Remaining Tickets: {{event.capacity}}</h3>
        <h3>Event Location: {{event.location}}</h3>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState"
import { computed, onMounted, reactive } from "vue"
import { logger } from "../utils/Logger"
import Pop from '../utils/Pop'
import { eventsService } from "../services/EventsService"
export default {
  props: { event: { type: Object, required: true}},
  setup(props){
    return {
      account: computed(() => AppState.account),
      
    }
  }
}
</script>


<style lang="scss" scoped>

</style>