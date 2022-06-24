import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getUserTickets)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getUserTickets(req, res, next) {
    try {
      const accountInfo = req.userInfo.id
      const tickets = await accountService.getAccountTicket( accountInfo)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

}
