import Router from 'express'

import forumRouter from './ForumRouter.js'
import messageRouter from './MessageRouter.js'
import tokenRouter from './TokenRouter.js'
import userRouter from './UserRouter.js'

const router = new Router()

router.use("/forums", forumRouter)
router.use("/messages", messageRouter)
router.use("/tokens", tokenRouter)
router.use("/users", userRouter)

export default router