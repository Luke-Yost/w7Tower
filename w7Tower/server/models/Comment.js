import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema({
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  eventId: { type: ObjectId, required: true, ref: 'TowerEvent'},
  body: { type: String, required: true, ref: 'Comment'},
  isAttending: {type: Boolean, required: false}
},
{
  timestamps: true, toJSON: { virtuals: true }
}
)
CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
CommentSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  ref: 'TowerEvent',
  justOne: true
}
)
CommentSchema.virtual('comment', {
  localField: 'body',
  foreignField: '_id',
  ref: 'Comment',
  justOne: true
}
)