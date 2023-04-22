import Router from 'express'
import { body } from 'express-validator'

import userController from '../controllers/UserController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = new Router()

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({min: 3, max: 20}),
  body("username").isLength({min: 3, max: 20}),
  userController.register
)
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({min: 3, max: 20}),
  userController.login
)
router.get("/activate/:link", userController.activate)
router.post("/check-auth", userController.checkAuth)
// router.get("/:userId", userController.get)

export default router