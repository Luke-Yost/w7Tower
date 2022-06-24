import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors"


class TicketsService{
  
  async create(body) {
    let TowerEvent = await dbContext.TowerEvents.findById(body.eventId)
    if (TowerEvent.capacity == 0) {
      throw new BadRequest("nah my person this event is sold out. Better luck next time")
    }
    let ticket = await dbContext.Tickets.create(body)
    await ticket.populate('account')
    await ticket.populate('event')
    TowerEvent.capacity --
    TowerEvent.save()
    return ticket
  }

  async deleteTicket(id, userId){
    
    const ticket = await dbContext.Tickets.findById(id)
    .populate('account')
    .populate('event')
    if (ticket.accountId.toString() != userId) {
      throw new BadRequest("you don't have permission to delete this ticket")
    }
    let TowerEvent = await dbContext.TowerEvents.findById(ticket.event)
    TowerEvent.capacity ++
    TowerEvent.save()
    ticket.remove()
    
    return `deleted ticket`
  }

}

export const ticketsService = new TicketsService()