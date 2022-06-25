<template>
  <div class="container">
    <div class="row">
      <div class="col-10 offset-1">
        <div class="row">
          <div class="col-12 m-2 p-1  border border-3 border-info rounded bg-dark text-center">
            <h3>Get tickets to events here at Tower Event. We just might be the best website ever made. Period.</h3>
          </div>
          <div class="col-md-8 offset-md-2 bg-light border rounded shadow d-flex justify-content-center px-1 py-2">
            <h6>Filter Events By Type</h6>
          </div>
          <div class="col-md-8 offset-md-2 bg-light border rounded shadow d-flex justify-content-evenly px-1 py-2">
              <button @click="filterEvent = ''" class="btn btn-info">All Events</button>
              <button  @click="filterEvent = 'concert'" class="btn btn-info">Concerts</button>
              <button @click="filterEvent = 'sport'" class="btn btn-info">Sporting Events</button>
              <button @click="filterEvent = 'digital'" class="btn btn-info">Digital Events</button>
              <button @click="filterEvent = 'convention'" class="btn btn-info">Conventions</button>
          </div>
        </div>
        <div class="row" v-for="e in events" :key="e.id">
          <Event :event="e" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from "../AppState"
import { computed, onMounted, ref, watchEffect } from "vue"
import { logger } from "../utils/Logger"
import Pop from '../utils/Pop'
import Event from "../components/Event.vue"
import { eventsService } from "../services/EventsService"
import { useRoute } from "vue-router"
export default {
    name: "Home",
    setup() {
        const route = useRoute()
        const filterEvent = ref('')
        watchEffect(async () => {
          try {
            await eventsService.getEvents(filterEvent.value)
          } catch (error) {
            logger.error(error)
            Pop.toast(error.message, 'error')
          }
        })
        onMounted(async () => {
            try {
                await eventsService.getEvents();
            }
            catch (error) {
                logger.error(error);
                Pop.toast(error.message, "error");
            }
        });
        return {
          filterEvent,
            events: computed(() => AppState.events.filter( e => filterEvent.value ? e.type == filterEvent.value : true))
        };
    },
    components: { Event }
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
