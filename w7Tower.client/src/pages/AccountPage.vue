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
      <div class="col-10 offset-1 d-flex justify-content-evenly border border-2 rounded bg-light shadow my-1 p-1">
        <div class="row">
          <div class="col-md-6">
            <h4>Event Name</h4>
            <h4>Location</h4>
          </div>
          <div class="col-md-6">
            <h4>date</h4>
            <h4></h4>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myEvents),
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
