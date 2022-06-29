<template>
  <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel2">Tower Event Comments</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="makeComment">
            <textarea class="form-control m-2" cols="35" rows="6" required placeholder="Your comment here.."
              v-model="commentData.body"></textarea>
            
          </form>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button @click="makeComment(commentData, activeEvent)" type="button" class="btn btn-primary m-2">Add Comment</button>

          <div class="container">
            <div class="row">
              <div class="col-12" v-for="c in comments" :key="c.id">
                <Comment :comment="c" />
              </div>
            </div>
          </div>

          <button type="button" class="btn btn-secondary m-2" data-bs-dismiss="modal">Exit Comments</button>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { computed, ref, watchEffect } from "vue";
import { AppState } from "../AppState";
import { commentsService } from "../services/CommentsService"
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import Comment from "./Comment.vue";

export default {
    props: { editComment: { type: Object, required: false, default: {} }, comment: { type: Object, required: false, default: {} }
    },
    setup(props) {
        const commentData = ref({});
        watchEffect(() => {
            logger.log(props.editEvent);
            commentData.value = props.editComment;
        });
        return {
            commentData,
            async makeComment(commentData, activeEvent) {
                try {
                    commentData.eventId = activeEvent.id;
                    await commentsService.makeComment(commentData, activeEvent);
                }
                catch (error) {
                    logger.error(error);
                    Pop.toast(error.message, "error");
                }
            },
            account: computed(() => AppState.account),
            comments: computed(() => AppState.eventComments),
            activeEvent: computed(() => AppState.activeEvent)
        };
    },
    components: { Comment }
}
</script>


<style lang="scss" scoped>
img{
  max-width: 40px;
  max-height: 40px;
  object-fit: cover;
}

</style>