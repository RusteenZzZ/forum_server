import { response } from "express"
import chatService from "../services/ChatService.js"

class ChatController {
  async createChat(req, res, next) {
    try {
      const {email} = req.user
      const {topic} = req.body

      const response = await chatService.createChat(email, topic)

      return res.json(response)
    } catch(e) {
      next(e)
    }
  }

  async getChats(req, res, next) {
    try {
      const response = await chatService.getChats()
      return res.json(response)
    } catch(e) {
      next(e)
    }
  }

  async getChatDetails(req, res, next) {
    try {
      const chatId = req.params.chatId
      const response = await chatService.getChatDetails(chatId)
      return res.json(response)
    } catch(e) {
      next(e)
    }
  }
}

export default new ChatController