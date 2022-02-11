const GenericRepository = require("./GenericRepository");
const UserSchema = require('../schemas/UserSchema')

class UserRepository extends GenericRepository {
    constructor() {
        super(UserSchema)
    }

    async getByUsername(username) {
        return UserSchema.findOne({ username });
    }
}

module.exports = new UserRepository()