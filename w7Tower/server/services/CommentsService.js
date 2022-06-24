import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class CommentsService{
  async deleteComment(id, userId) {
    const deleteComment = await dbContext.Comments.findById(id)
    if (deleteComment.creatorId.toString() != userId) {
      throw new BadRequest("you don't have permission to delete this Comment")
    }
        deleteComment.remove()
  return 'comment delete'
    }
  
  async createComment(body){
    let comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    return comment
  }
}

export const commentsService = new CommentsService