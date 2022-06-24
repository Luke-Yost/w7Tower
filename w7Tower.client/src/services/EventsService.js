import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService{
  async createEvent(body){
    const res = await api.post('api/events', body)
    logger.log('posted event', res.data)
    AppState.events.push(res.data)
  }
}

export const eventsService = new EventsService()