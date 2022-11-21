const { BaseRepository } = require("../../core/main-base/repositories.js")
const User = require("../../user/entities/user.js")

class UserRepository extends BaseRepository {
    constructor(entity) {
        super(entity)
    }
}

module.exports = {
    userRepository: new UserRepository(User)
}