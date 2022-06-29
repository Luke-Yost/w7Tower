import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService{

  async getEvents(query = ''){
    const res = await api.get('api/events'+ query)
    // logger.log('getting events', res.data)
    AppState.events = res.data
  }
  async createEvent(body){
    const res = await api.post('api/events', body)
    logger.log('posted event', res.data)
    AppState.events.push(res.data)
    AppState.activeEvent = res.data
  }

  async getEventComments(event){
    const res = await api.get('api/events/' +event.id+'/comments')
    logger.log('got events comments', res.data)
    AppState.eventComments = res.data
    console.log('appstate comments',  AppState.eventComments );
  }
  async cancelEvent(eventId){
    const res = await api.delete(`api/events/${eventId}`)
    logger.log(res.data)
  }

  async getAttendees(event){
    const res = await api.get(`api/events/${event.id}/tickets`)
    logger.log('attendees',res.data)
    AppState.eventAttendees = res.data
  }

}

export const eventsService = new EventsService()