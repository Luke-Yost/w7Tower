import { dbContext } from "../db/DbContext"


class CommentsService{
  async createComment(body){
    let comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    return comment
  }
}

export const commentsService = new CommentsService