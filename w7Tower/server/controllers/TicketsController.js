import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { ticketsService } from "../services/TicketsService"
import { accountService } from '../services/AccountService'

export class TicketsController extends BaseController{
  constructor(){
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.deleteTicket)
    
  }
  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const newTicket = await ticketsService.create(req.body)
      return res.send(newTicket)
    } catch (error) {
      next(error)
    }
  }
  async deleteTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const deleteTicket = await ticketsService.deleteTicket(req.params.id, req.userInfo.id)
      return res.send(deleteTicket)
    } catch (error) {
      next(error)
    }
  }


}