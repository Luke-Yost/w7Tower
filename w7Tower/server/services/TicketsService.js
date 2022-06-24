import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors"


class TicketsService{
  
  async create(body) {
    let ticket = await dbContext.Tickets.create(body)
    await ticket.populate('account')
    await ticket.populate('event')
    let TowerEvent = await dbContext.TowerEvents.findById(ticket.eventId)
    TowerEvent.capacity --
    TowerEvent.save()
    return ticket
  }

  // async getUserTickets(accountId) {
  //   let ticket = await dbContext.Tickets.findById(accountId)
  //   return ticket
  // }

}

export const ticketsService = new TicketsService()