import tokenService from "../services/tokenService"

class TokenController {
  async geterateToken(req, res, next) {
    try {
      const {email} = req.user
      const token = tokenService.generateToken({email})
      return res.json({token})
    } catch(e) {
      next(e)
    }
  }
}

export default new TokenController