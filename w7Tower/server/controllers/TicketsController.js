import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { ticketsService } from "../services/TicketsService"

export class TicketsController extends BaseController{
  constructor(){
    super('api/tickets')
    this.router
      
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
    
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



}