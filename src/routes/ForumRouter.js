import Router from 'express'
import { body } from 'express-validator'

import forumController from '../controllers/ForumController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = new Router()

router.post(
  "/",
  body("topic").isLength({min: 3, max: 30}),
  body("description").isLength({min: 0, max: 300}),
  authMiddleware,
  forumController.createForum
)
router.get(
  "/",
  authMiddleware,
  forumController.getForums
)
router.get(
  "/:forumId",
  authMiddleware,
  forumController.getForumDetails
)

export default router