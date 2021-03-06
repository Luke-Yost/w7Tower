import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors"
class TowerEventsService {
  async getAll(query = {}){
    let towerEvents = await dbContext.TowerEvents.find(query).populate('creator')
    return towerEvents
  }

  async getById(id) {
    let towerEvent = await dbContext.TowerEvents.findById(id).populate('creator')
    return towerEvent
  }

  async getEventTickets(eventId) {
    let tickets = await dbContext.Tickets.find({eventId}).populate('account')
    return tickets
  }

  async getEventComments(eventId) {
    let comments = await dbContext.Comments.find({eventId}).populate('creator')
    return comments
  }

  async create(body) {
    const createDate = new Date(body.startDate)
    const Today = new Date()
    if (createDate < Today) {
      throw new BadRequest('You cant create a event in the past')
    }
    let towerEvent = await dbContext.TowerEvents.create(body)
    await towerEvent.populate('creator')
    return towerEvent
  }

  async edit(id, edit) {
    const originalTowerEvent = await dbContext.TowerEvents.findById(id).populate('creator')
    if (originalTowerEvent.creatorId.toString() != edit.creatorId) {
      throw new BadRequest('only the creator of this TowerEvent can edit it')
    }
    if (originalTowerEvent.isCanceled == true) {
      throw new BadRequest('You cannot edit canceled TowerEvents')
    }
      originalTowerEvent.name = edit.name ? edit.name : originalTowerEvent.name 
      originalTowerEvent.description = edit.description ? edit.description : originalTowerEvent.description
      originalTowerEvent.coverImg = edit.coverImg ? edit.coverImg : originalTowerEvent.coverImg
      originalTowerEvent.location = edit.location ? edit.location : originalTowerEvent.location 
      originalTowerEvent.capacity = edit.capacity ? edit.capacity : originalTowerEvent.capacity 
      originalTowerEvent.startDate = edit.startDate ? edit.startDate : originalTowerEvent.startDate 
      // originalTowerEvent.isCanceled = edit.isCanceled ? edit.isCanceled : originalTowerEvent.isCanceled 
      originalTowerEvent.save()
      return edit
  }

  async delete(id, userId) {
    const deleteEvent = await dbContext.TowerEvents.findById(id)
    if (deleteEvent.creatorId.toString() != userId) {
      throw new BadRequest("you don't have permission to delete this TowerEvent")
    }
    deleteEvent.isCanceled = true 
    deleteEvent.save()
    return deleteEvent
  }

}

export const towerEventsService = new TowerEventsService()