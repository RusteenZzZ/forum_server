import { response } from "express"
import forumService from "../services/ForumService.js"

class ForumController {
  async createForum(req, res, next) {
    try {
      const {email} = req.user
      const {topic, description} = req.body

      const response = await forumService.createForum(email, topic, description)

      return res.json(response)
    } catch(e) {
      next(e)
    }
  }

  async getForums(req, res, next) {
    try {
      const response = await forumService.getForums()
      return res.json(response)
    } catch(e) {
      next(e)
    }
  }

  async getForumDetails(req, res, next) {
    try {
      const forumId = req.params.forumId
      const response = await forumService.getForumDetails(forumId)
      return res.json(response)
    } catch(e) {
      next(e)
    }
  }
}

export default new ForumController