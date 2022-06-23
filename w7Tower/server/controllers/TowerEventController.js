import { Auth0Provider } from '@bcwdev/auth0provider'
import { towerEventsService } from "../services/TowerEventsService"
import BaseController from '../utils/BaseController'

export class TowerEventController extends BaseController{
  constructor(){
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getAll(req.query)
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const towerEvent = await towerEventsService.getById(req.params.id)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      let towerEvent = await towerEventsService.create(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id 
      const towerEvent = await towerEventsService.edit(req.params.id, req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

}