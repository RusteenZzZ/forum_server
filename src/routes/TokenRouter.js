import Router from 'express'

import tokenController from '../controllers/TokenController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = new Router()

router.get(
  "/",
  authMiddleware,
  tokenController.generateToken
)

export default router