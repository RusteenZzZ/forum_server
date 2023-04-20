import ChatDto from "../dto/ChatDto.js"
import MessageDto from "../dto/MessageDto.js"
import ApiError from "../errors/ApiError.js"
import ChatModel from "../models/ChatModel.js"
import UserModel from "../models/UserModel.js"
import messageService from "./MessageService.js"

class ChatService {
  async createChat(email, topic) {
    const user = await UserModel.findOne({email})
    const chat = await ChatModel.create({creator: user._id, topic})

    return {chat: new ChatDto(chat)}
  }

  async getChats() {
    let chats = await ChatModel.find()
    return chats.map(chat => new ChatDto(chat))
  }

  async getChatDetails(chatId) {
    const chat = await ChatModel.findById(chatId)
    if(!chat) {
      throw ApiError.BadRequest("Non existing chat!")
    }

    const messages = await messageService.getMessagedByChat(chatId)
    const sortedMessages = [...messages].sort((a, b) => a.postedAt - b.postedAt)
    const messageDtos = sortedMessages.map(message => new MessageDto(message))

    return {
      messages: messageDtos,
      chatDetailes: new ChatDto(chat)
    }
  }

  async getChatById(chatId) {
    return await ChatModel.findById(chatId)
  }
}

export default new ChatService