const { BaseRepository } = require("../../core/main-base/repositories.js")
const User = require("../entities/user.js")

class UserRepository extends BaseRepository {
    constructor(entity) {
        super(entity)
    }

    async findUserByEmail(email) {
        return this.findOneByOption({ "email": email });
    }

    async findUsersByName(string){
        return this.findManyByOption()
    }
}

module.exports = {
    userRepository: new UserRepository(User)
}