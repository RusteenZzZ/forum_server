import Router from 'express'

import tokenController from '../controllers/TokenController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = new Router()

router.get(
  "/",
  authMiddleware,
  tokenController.geterateToken
)

export default router