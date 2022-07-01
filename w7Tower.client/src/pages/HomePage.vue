<template>
  <div class="container">
    <div class="row">
      <div class="col-10 offset-1">
        <div class="row">
          <div class="col-12 m-2 p-1 border border-dark border-2 rounded bg-light text-center">
            <b class="fs-2">Get tickets to events here at Tower Event. We just might be the best website ever made. Period.</b>
          </div>
        </div>
          <div class="row  m-1 p-2">
          <div class="col-12 p-2 bg-primary rounded-top shadow d-flex align-items-center justify-content-center">
            <b class="fs-3 text-info">Filter Events By Type</b>
          </div>
          <div class="col-12 p-3 bg-primary  rounded-bottom shadow d-flex justify-content-evenly border-top border-2 px-2">
              <button @click="filterEvent = ''" class="btn btn-light">All Events</button>
              <button  @click="filterEvent = 'concert'" class="btn btn-light">Concerts</button>
              <button @click="filterEvent = 'sport'" class="btn btn-light">Sporting Events</button>
              <button @click="filterEvent = 'digital'" class="btn btn-light">Digital Events</button>
              <button @click="filterEvent = 'convention'" class="btn btn-light">Conventions</button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4" v-for="e in events" :key="e.id">
            <Event :event="e" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <CommentsModal/>
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
