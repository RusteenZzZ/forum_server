import MessageDto from "../dto/MessageDto.js"
import ApiError from "../errors/ApiError.js"
import MessageModel from "../models/MessageModel.js"
import forumService from "./ForumService.js"
import userService from "./userService.js"

class MessageService {
  async getMessagesByForum(forumId) {
    return await MessageModel.find({forum: forumId})
  }

  async postMessage(forumId, email, text) {
    const forum = await forumService.getForumById(forumId)
    if(!forum) {
      throw ApiError.BadRequest("Not existing forum!")
    }

    const user = await userService.getUserByEmail(email)

    await MessageModel.create({
      text,
      author: user._id,
      forum: forum._id,
      postedAt: Date.now()
    })

    const messages = await this.getMessagesByForum(forumId)
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