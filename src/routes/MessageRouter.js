import Router from 'express'

import authMiddleware from '../middlewares/authMiddleware.js'
import messageController from '../controllers/MessageController.js'

const router = new Router()

router.post(
  "/",
  authMiddleware,
  messageController.postMessage
)
router.get(
  "/:messageId",
  authMiddleware,
  messageController.getMessage
)
router.get(
  "/replies/:messageId",
  authMiddleware,
  messageController.getMessageReplies
)

export default router