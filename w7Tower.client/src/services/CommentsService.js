import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{
  async makeComment(body, id){
    // body.   = id
    const res = await api.post('api/comments', body)
    logger.log('made comment', res.data)
    
    AppState.eventComments.push(res.data)
    console.log('dfsdf',AppState.activeEvent);
    console.log('event commetns', AppState.eventComments );
  }

  async deleteComment(comment){
    const res = await api.delete('api/comments/' + comment.id)
    logger.log(res.data)
  }

}


export const commentsService = new CommentsService()