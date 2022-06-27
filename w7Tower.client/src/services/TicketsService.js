import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{
  async getTicket(eventId){
    const res = api.post('api/tickets', eventId)
    logger.log('getting Ticket',res.data)
    AppState.myTickets.push(res.data)
    console.log('mytickets', AppState.myTickets);
  }
}

export const ticketsService = new TicketsService()