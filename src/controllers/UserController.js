import { validationResult } from 'express-validator'
import userService from '../services/userService.js'
import ApiError from '../errors/ApiError.js'

class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()))
      }

      const {email, username, password} = req.body
      const response = await userService.register(email, username, password)

      return res.json(response)
    } catch(e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()))
      }

      const {email, password} = req.body
      const response = await userService.login(email, password)

      return res.json(response)
    } catch(e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      await userService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch(e) {
      next(e)
    }
  }
}

export default new UserController