<template>
  <div class="row bg-light m-3 p-1 rounded shadow">
    <div class="col-4">
      <img class="rounded p-2" :src="attendee.account.picture" :alt="attendee.account.name + ' picture'">
    </div>
    <div class="col-8">
      <h4 class="my-5">{{attendee.account.name}}</h4>
    </div>
  </div>
</template>


<script>
export default {
  props: { attendee: { type: Object, required: true}},
  setup(attendee){
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>