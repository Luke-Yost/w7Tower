<template>
  <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Tower Event Comments</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="makeComment">
            <textarea class="form-control m-2" cols="35" rows="10" required placeholder="Your comment here.."
              v-model="commentData.body"></textarea>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button @click="makeComment()" type="button" class="btn btn-primary">Add Comment</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref, watchEffect } from "vue";
import { commentsService } from "../services/CommentsService"
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  props: { editComment: { type: Object, required: false, default: {} } },
  setup(props){
    const commentData = ref({});
    watchEffect(() => {
      logger.log(props.editEvent);
      commentData.value = props.editComment;
    })
    return {
      commentData,
      async makeComment(){
        try {
          await commentsService.makeComment()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      account: computed(() => AppState.account),
      comments: computed( () => AppState.eventComments),
    }
  }
}
</script>


<style lang="scss" scoped>

</style>