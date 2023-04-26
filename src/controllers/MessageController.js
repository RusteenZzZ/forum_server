import messageService from "../services/MessageService.js"

class MessageController {
  async postMessage(req, res, next) {
    try {
      const {email} = req.user
      const {forumId, toMessage, text} = req.body

      const response = await messageService.postMessage(forumId, toMessage, email, text)
      return res.json(response)
    } catch(e) {
      next(e)
    }
  }

  async getMessage(req, res, next) {
    try {
      const messageId = req.params.messageId

      const response = await messageService.getMessage(messageId)
      return res.json(response)
    } catch(e) {
      next(e)
    }
  }

  async getMessageReplies(req, res, next) {
    try {
      const messageId = req.params.messageId

      const response = await messageService.getMessageReplies(messageId)
      return res.json(response)
    } catch(e) {
      next(e)
    }
  }
}

export default new MessageController