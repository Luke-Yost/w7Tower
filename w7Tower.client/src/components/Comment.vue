<template>
<div class="row my-1 p-1 border border-2 bg-dark text-light rounded">
              <div class="col-md-4">
                <img class="rounded p-1" :src="comment.creator.picture" :alt="`${comment.creator.name} profile picture`">
                <h3>{{comment.creator.name}}</h3>
              </div>  
              <div class="col-md-8 d-flex justify-content-center align-items-center">
                <h5>{{comment.body}}</h5>
              </div>
                <!-- <div  v-show="account.id == comment.creatorId" class="col-12 d-flex justify-content-center pb-2">
                  <button class="btn btn-danger">Delete Comment</button>
                </div> -->
            </div>
</template>


<script>
import { computed } from "vue"
import { AppState } from "../AppState"

export default {
  props: { comment: { type: Object, required: true}},
  setup(){
    return {
      account: computed(() => AppState.account),
    }
  }
}
</script>


<style lang="scss" scoped>

</style>