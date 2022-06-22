import { dbContext } from "../db/DbContext";

class TowerEventsService {
  async getAll(query = {}){
    let towerEvents = await dbContext.TowerEvents.find(query).populate('creator')
    return towerEvents
  }
}

export const towerEventsService = new TowerEventsService()