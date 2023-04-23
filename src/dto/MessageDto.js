class MessageDto {
  id
  author
  text
  chatId
  postedAt

  constructor(model) {
    this.id = model._id
    this.author = model.author
    this.text = model.text
    this.chatId = model.chatId
    this.postedAt = model.postedAt
  }
}

export default MessageDto