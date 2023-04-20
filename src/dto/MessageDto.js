class MessageDto {
  id
  author
  chatId
  postedAt

  constructor(model) {
    this.id = model._id
    this.author = model.author
    this.chatId = model.chatId
    this.postedAt = model.postedAt
  }
}

export default MessageDto