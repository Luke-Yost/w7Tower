import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
export const TicketSchema = new Schema(
  {
    eventId: { type: ObjectId, required: true, ref: 'TowerEvent' },
    accountId: { type: ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true, toJSON: { virtuals: true }
  }
)

TicketSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  ref: 'TowerEvent',
  justOne: true
}
)

TicketSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})