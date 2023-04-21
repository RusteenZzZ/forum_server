import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

import UserModel from "../models/UserModel.js"
import tokenService from "./tokenService.js"
import { ROLES } from '../const.js'
import ApiError from "../errors/ApiError.js"
import mailService from "./mailService.js"
import UserDto from "../dto/UserDto.js"

class UserService {
  async register(email, username, password) {
    const duplicateEmail = await UserModel.findOne({email})
    if(duplicateEmail) {
      throw ApiError.BadRequest("This email is already registered!")
    }

    const duplicateUsername = await UserModel.findOne({username})
    if(duplicateUsername) {
      throw ApiError.BadRequest("This username is already registered!")
    }
    
    const hashedPassword = await bcrypt.hash(password, 3)
    const activationLink = v4()
    const user = await UserModel.create({email, username, password: hashedPassword, activationLink, roles: [ROLES.USER]})

    await mailService.sendActivationLink(email, `${process.env.API_URL}/api/users/activate/${activationLink}`)

    const token = tokenService.generateToken({email})

    return {
      token,
      user: new UserDto(user)
    }
  }

  async login(email, password) {
    const user = await UserModel.findOne({email})
    if(!user) {
      throw ApiError.BadRequest("The email or password is incorrect")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) {
      throw ApiError.BadRequest("The email or password is incorrect")
    }

    const token = tokenService.generateToken({email})

    return {
      token,
      user: new UserDto(user)
    }
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({activationLink})

    if(!user) {
      throw ApiError.BadRequest("Non existing acitvation link")
    }

    user.isActivated = true
    user.activationLink = ''
    await user.save()
  }

  async getUserByEmail(email) {
    return await UserModel.findOne({email})
  }
}

export default new UserService()