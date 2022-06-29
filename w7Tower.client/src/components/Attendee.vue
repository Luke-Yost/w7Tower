<template>
  <div class="row">
    <div class="col-4">
      <img :src="attendee.account.picture" :alt="attendee.account.name + ' picture'">
    </div>
    <div class="col-8">
      <h4>{{attendee.account.name}}</h4>
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