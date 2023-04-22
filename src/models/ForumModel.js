import { Schema, model } from 'mongoose'

const ForumSchema = new Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  topic: {type: String, required: true},
  description: {type: String, required: true},
  moderators: [
    {type: Schema.Types.ObjectId, ref: 'User'}
  ]
})

export default model('Forum', ForumSchema)
