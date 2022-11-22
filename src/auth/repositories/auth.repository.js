const { BaseRepository } = require("../../core/main-base/repositories.js");
const User = require("../../user/entities/user");


class AuthRepository extends BaseRepository {
    constructor(entity) {
        super(entity)
    }
}

module.exports = {
    authRepository: new AuthRepository(User)
}