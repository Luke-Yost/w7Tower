import { Auth0Provider } from '@bcwdev/auth0provider'
import { towerEventsService } from "../services/TowerEventsService"
import BasController from '../utils/BaseController'

export class TowerEventController extends BasController{
  constructor(){
    super('api/towerEvents')
    this.router
      .get('', this.getAll)
  }
  async getAll(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getAll(req.query)
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }
}