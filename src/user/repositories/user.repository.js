const { BaseRepository } = require("../../core/main-base/repositories.js")
const User = require("../../user/entities/user.js")

class UserRepository extends BaseRepository {
    constructor(entity) {
        super(entity)
    }

    // async findUserByEmail(email) {
    //     return this.find({ "email": email });
    // }
}

module.exports = {
    userRepository: new UserRepository(User)
}