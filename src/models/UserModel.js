import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  email: {type: String, unique: true, required: true},
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String},
  avatarURL: {type: String},
  roles: {type: [String]}
})

export default model('User', UserSchema)
