import { Schema, model } from 'mongoose'

const MessageSchema = new Schema({
  text: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  forum: {type: Schema.Types.ObjectId, ref: 'Forum', required: false},
  toMessage: {type: Schema.Types.ObjectId, ref: 'Message', required: false},
  postedAt: {type: Number, required: true}
})

export default model('Message', MessageSchema)
