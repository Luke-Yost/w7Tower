import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { towerEventsService } from "../services/TowerEventsService"

export class TowerEventController extends BaseController{
  constructor(){
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tickets', this.getEventTickets)
      .get('/:id/comments', this.getEventComments )
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
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

  async getEventTickets(req, res, next) {
    try {
      const eventTickets = await towerEventsService.getEventTickets(req.params.id)
      return res.send(eventTickets)
    } catch (error) {
      next(error)
    }
  }

  async getEventComments(req, res, next) {
    try {
      const eventComments = await towerEventsService.getEventComments(req.params.id)
      return res.send(eventComments)
    } catch (error) {
      next(error)
    }
  }
  

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.create(req.body)
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

  async delete(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      const deleteEvent = await towerEventsService.delete(req.params.id, req.userInfo.id)
      return res.send(deleteEvent)
    } catch (error) {
      next(error)
    }
  }

}