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
import { computed, onMounted } from "vue"
import { logger } from "../utils/Logger"
import Pop from '../utils/Pop'
import Event from "../components/Event.vue"
import { eventsService } from "../services/EventsService"
export default {
    name: "Home",
    setup() {
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
            events: computed(() => AppState.events)
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
