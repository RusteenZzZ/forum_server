import MessageDto from "../dto/MessageDto.js"
import ApiError from "../errors/ApiError.js"
import MessageModel from "../models/MessageModel.js"
import chatService from "./ChatService.js"
import userService from "./userService.js"

class MessageService {
  async getMessagedByChat(chatId) {
    return await MessageModel.find({chat: chatId})
  }

  async postMessage(chatId, email, text) {
    const chat = await chatService.getChatById(chatId)
    if(!chat) {
      throw ApiError.BadRequest("Not existing chat!")
    }

    const user = await userService.getUserByEmail(email)

    const message = await MessageModel.create({
      text,
      author: user._id,
      chat: chat._id,
      postedAt: Date.now()
    })

    return new MessageDto(message)
  }
}

export default new MessageService