import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
import { TowerEventSchema } from "./TowerEvent"

export const TicketSchema = new Schema(
  {
    towerEventId: { type: ObjectId, required: true, ref: 'TowerEvent' },
    accountId: { type: ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true, toJSON: { virtuals: true }
  }
)

TowerEventSchema.virtual('towerEvent', {
  localField: 'towerEventId',
  foreignField: '_id',
  ref: 'TowerEvent',
  justOne: true
}
)

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})