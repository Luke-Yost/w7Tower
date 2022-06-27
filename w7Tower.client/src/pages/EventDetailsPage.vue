<template>
  <div class="container">
    <div class="row">
      <div class="col-12 offset-1 d-flex justify-content-center">
        <h2 class="m-3 border border-2 border-dark text-info rounded p-2 bg-light shadow">{{activeEvent.name}}</h2>
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
      activeEvent: computed(() => AppState.activeEvent)
    
    }
  }
}
</script>


<style lang="scss" scoped>

</style>