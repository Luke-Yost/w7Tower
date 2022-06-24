<template>
  <div class="container">
    <div class="row">
      <div class="col-10 offset-1">
        <div class="row">
          <div class="col-12 m-3 p-2">
            <div class=" border border-3 border-info rounded bg-dark text-center">
              <h3>Get tickets to events here at Tower Event. We just might be the best website ever made. Period.</h3>
            </div>
          </div>
          <!-- NOTE put events here -->
          <!-- <div class="event col-12 m-2 p-1 border border-info border-3 bg-light rounded">
            <div class="row">
              <div class="col-6">
                <h3>Event Title: </h3>
                <h3>Date:</h3>
              </div>
              <div class="col-6">
                <h3>Remaining Tickets: </h3>
                <h3>Event Location: </h3>
              </div>
            </div>
          </div> -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from "../AppState"
import { computed, onMounted } from "vue"
import Pop from '../utils/Pop'
export default {
  name: 'Home',
  setup(){
    onMounted(async() => {
      try {
        await eventService.getEvents()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
