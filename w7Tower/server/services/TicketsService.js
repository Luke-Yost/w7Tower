import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors"

class TicketsService{
  async create(body) {
    let ticket = await dbContext.Tickets.create(body)
    await ticket.populate('account')
    await ticket.populate('event')
    return ticket
  }

}

export const ticketsService = new TicketsService()