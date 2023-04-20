import Router from 'express'

import chatController from '../controllers/ChatController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = new Router()

router.post(
  "/",
  authMiddleware,
  chatController.createChat
)
router.get(
  "/",
  authMiddleware,
  chatController.getChats
)
router.get(
  "/:chatId",
  authMiddleware,
  chatController.getChatDetails
)

export default router