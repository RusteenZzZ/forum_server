import jwt from 'jsonwebtoken'

import userService from './userService.js'

class TokenService {
  generateToken(payload) { // payload is just an object with only field "email"
    return jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {expiresIn: '7d'})
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