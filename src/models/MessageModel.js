import { Schema, model } from 'mongoose'

const MessageSchema = new Schema({
  text: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  chat: {type: Schema.Types.ObjectId, ref: 'Chat', required: true},
  postedAt: {type: Number, required: true}
})

export default model('Message', MessageSchema)
