const userRepository = require('../repositories/UserRepository')
const NotFound = require('../errors/NotFound')

class UserService {
    constructor() {
        this.userRepo = userRepository
    }

    findAll({offset, limit, ...filter}) {
        return this.userRepo.getAll(filter, offset, limit)
    }
}

module.exports = new UserService()