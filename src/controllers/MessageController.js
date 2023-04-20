import messageService from "../services/MessageService.js"

class MessageController {
  async postMessage(req, res, next) {
    try {
      const {email} = req.user
      const {chatId, text} = req.body

      const response = await messageService.postMessage(chatId, email, text)
      return res.json(response)
    } catch(e) {
      next(e)
    }
  }
}

export default new MessageController