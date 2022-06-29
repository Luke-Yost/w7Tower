<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-10 offset-1 d-flex justify-content-center border border-2 rounded bg-light shadow my-2 p-1">
        <h1>Your Tickets!</h1>
      </div>

      <!-- NOTE v-for loop over your tickets appstate -->
      <div v-for="t in myTickets" :key="t.id" class="col-10 offset-1 d-flex justify-content-evenly border border-2 rounded bg-light shadow my-1 p-1">
        <Ticket :ticket="t" />
      </div>

    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import Ticket from "../components/Ticket.vue"
export default {
    name: "Account",
    setup() {
        return {
            account: computed(() => AppState.account),
            myTickets: computed(() => AppState.myTickets),
        };
    },
    components: { Ticket }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
