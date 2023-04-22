class ForumDto {
  id
  creator
  creatorUsername
  topic
  description
  moderators

  constructor(model) {
    this.id = model._id
    this.creator = model.creator
    this.creatorUsername = model.creatorUsername
    this.topic = model.topic
    this.description = model.description
    this.moderators = model.moderators
  }
}

export default ForumDto