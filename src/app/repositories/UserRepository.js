const GenericRepository = require("./GenericRepository");
const UserSchema = require('../schemas/UserSchema')

class UserRepository extends GenericRepository {
    constructor() {
        super(UserSchema)
    }
}

module.exports = new UserRepository()