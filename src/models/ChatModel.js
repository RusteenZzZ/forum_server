import { Schema, model } from 'mongoose'

const ChatSchema = new Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  topic: {type: String, required: true},
  moderators: [
    {type: Schema.Types.ObjectId, ref: 'User'}
  ]
})

export default model('Chat', ChatSchema)
