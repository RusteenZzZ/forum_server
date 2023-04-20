class ChatDto {
  id
  creator
  topic
  moderators

  constructor(model) {
    this.id = model._id
    this.creator = model.creator
    this.topic = model.topic
    this.moderators = model.moderators
  }
}

export default ChatDto