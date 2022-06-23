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

  async create(body) {
    let towerEvent = await dbContext.TowerEvents.create(body)
    await towerEvent.populate('creator')
    return towerEvent
  }
    
  async edit(id, edit) {
    const originalTowerEvent = await dbContext.TowerEvents.findById(id).populate('creator')
    if (originalTowerEvent.creatorId.toString() != edit.creatorId) {
      throw new BadRequest('only the creator of this TowerEvent can edit it')
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

}

export const towerEventsService = new TowerEventsService()