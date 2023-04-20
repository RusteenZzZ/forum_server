import ApiError from "../errors/ApiError.js";
import tokenService from "../services/tokenService.js";

async function authMiddleware(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }

    let token = authorizationHeader.split(' ')[1]
    if (!token) {
      return next(ApiError.UnauthorizedError())
    }

    const userData = await tokenService.validateToken(token)
    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }

    token = tokenService.generateToken({email: userData.email})

    req.user = userData
    req.token = token
    next()
  } catch (e) {
    return next(ApiError.UnauthorizedError())
  }
}

export default authMiddleware