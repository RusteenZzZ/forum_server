class UserDto {
  id
  email
  username
  isActivated

  constructor(model) {
    this.id = model._id
    this.email = model.email
    this.username = model.username
    this.isActivated = model.isActivated
  }
}

export default UserDto