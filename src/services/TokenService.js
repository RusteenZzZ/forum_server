import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

import userService from './userService.js'

class TokenService {
  generateToken(payload) { // payload is just an object with only field "email"
    return jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRATION_PERIOD})
  }

  async validateToken (token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_TOKEN_SECRET)

      const user = await userService.getUserByEmail(userData.email)
      if(!user) {
        return null
      }

      return userData
    } catch (e) {
      return null
    }
  }
}

export default new TokenService