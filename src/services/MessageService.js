import MessageDto from "../dto/MessageDto.js"
import ApiError from "../errors/ApiError.js"
import MessageModel from "../models/MessageModel.js"
import forumService from "./ForumService.js"
import userService from "./userService.js"

class MessageService {
  async getMessagesByForum(forumId) {
    return await MessageModel.find({forum: forumId})
  }

  async postMessage(forumId, toMessage, email, text) {
    let isReplyToForum = false
    let forum
    if(forumId) {
      forum = await forumService.getForumById(forumId)
      if(!forum) {
        throw ApiError.BadRequest("Non existing forum!")
      }
      isReplyToForum = true
    } else if(toMessage) {
      const message = await MessageModel.findById(toMessage)
      if(!message) {
        throw ApiError.BadRequest("Non existing message!")
      }
    }

    const user = await userService.getUserByEmail(email)
    const messageToCreate = {
      text,
      author: user._id,
      postedAt: Date.now()
    }
    await MessageModel.create(
      isReplyToForum
        ? {...messageToCreate, forum: forum._id}
        : {...messageToCreate, toMessage}
    )

    const messages = await this.getMessagesByForum(forumId)
    const sortedMessages = [...messages].sort((a, b) => a.postedAt - b.postedAt)
    const messageDtos = await Promise.all(sortedMessages.map(async (message) => {
        const user = await userService.getUserById(message.author)
        return {...(new MessageDto(message)), authorUsername: user.username}
      }
    ))

    return messageDtos
  }

  async getMessage(messageId) {
    const message = await MessageModel.findById(messageId)

    const user = await userService.getUserById(message.author)
    return {...new MessageDto(message), authorUsername: user.username}
  }

  async getMessageReplies(messageId) {
    const messages = await MessageModel.find({
      toMessage: messageId
    })
    const sortedMessages = [...messages].sort((a, b) => a.postedAt - b.postedAt)
    const messageDtos = await Promise.all(sortedMessages.map(async (message) => {
        const user = await userService.getUserById(message.author)
        return {...(new MessageDto(message)), authorUsername: user.username}
      }
    ))

    return messageDtos
  }
}

export default new MessageService