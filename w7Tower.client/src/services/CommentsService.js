import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{
  async makeComment(body, id){
    // body.   = id
    const res = await api.post('api/comments', body)
    logger.log('made comment', res.data)
    AppState.eventComments.push(res.data)
  }
}

export const commentsService = new CommentsService()