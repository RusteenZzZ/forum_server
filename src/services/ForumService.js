import ForumDto from "../dto/ForumDto.js"
import MessageDto from "../dto/MessageDto.js"
import ApiError from "../errors/ApiError.js"
import ForumModel from "../models/ForumModel.js"
import UserModel from "../models/UserModel.js"
import messageService from "./MessageService.js"
import userService from "./userService.js"

class ForumService {
  async createForum(email, topic, description) {
    const user = await UserModel.findOne({email})
    const forum = await ForumModel.create({creator: user._id, creatorUsername: user.username, topic, description})

    return {...new ForumDto(forum)}
  }

  async getForums() {
    const forums = await ForumModel.find()

    const responseForums = await Promise.all(forums.map(async (forum) =>{
        const user = await userService.getUserById(forum.creator)
        return {...forum._doc, creatorUsername: user.username}
      }
    ))
    
    return {
      forums: responseForums.map(forum => new ForumDto(forum))
    }
  }

  async getForumDetails(forumId) {
    const forum = await ForumModel.findById(forumId)
    if(!forum) {
      throw ApiError.BadRequest("Non existing forum!")
    }

    const messages = await messageService.getMessagesByForum(forumId)
    const sortedMessages = [...messages].sort((a, b) => a.postedAt - b.postedAt)
    const messageDtos = await Promise.all(sortedMessages.map(async (message) => {
        const user = await userService.getUserById(message.author)
        return {...(new MessageDto(message)), authorUsername: user.username}
      }
    ))
    const user = await userService.getUserById(forum.creator)

    return {
      messages: messageDtos,
      forumDetails: new ForumDto({...forum._doc, creatorUsername: user.username})
    }
  }

  async getForumById(forumId) {
    return await ForumModel.findById(forumId)
  }
}

export default new ForumService