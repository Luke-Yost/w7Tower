<template>
  <div class="row">
    <div class="col-md-6">
      <h4>Event: {{ticket.event.name}}</h4>
      <h4>Location: {{ticket.event.location}}</h4>
    </div>
    <div class="col-md-6">
      <h4>{{formatTicketDate(ticket.event.startDate)}}</h4>
      <h4>1/{{ticket.event.capacity}}</h4>
    </div>
  </div>
</template>


<script>
export default {
  props: { ticket: { type: Object, required: false, default: {}}},
  setup(props){
    return {
      formatTicketDate(rawDate){
        let prettyDate = new Date(rawDate)
        prettyDate.toString
        return prettyDate
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>