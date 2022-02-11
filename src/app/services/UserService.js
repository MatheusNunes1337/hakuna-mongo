const userRepository = require('../repositories/UserRepository')
const NotFound = require('../errors/NotFound')

class UserService {
    constructor() {
        this.userRepo = userRepository
    }

    findAll({offset, limit, ...filter}) {
        return this.userRepo.getAll(filter, offset, limit)
    }

    async findById({ id }) {
        const user = await this.userRepo.getById(id)

        if(!user) throw new NotFound('User')

        return user
    }
}

module.exports = new UserService()