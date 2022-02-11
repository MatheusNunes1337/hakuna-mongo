const GenericRepository = require("./GenericRepository");
const UserSchema = require('../schemas/UserSchema')

class UserRepository extends GenericRepository {
    constructor() {
        super(UserSchema)
    }

    async getByEmail(email) {
        return UserSchema.findOne({ email });
    }
}

module.exports = new UserRepository()