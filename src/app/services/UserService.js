const UserRepository = require('../repositories/UserRepository')
const checkDuplicatedUser = require('../helpers/CheckDuplicatedUser')
const NotFound = require('../errors/NotFound')

class UserService {
    findAll({offset, limit, ...filter}) {
        return UserRepository.getAll(filter, offset, limit)
    }

    async findById({ id }) {
        const user = await UserRepository.getById(id)

        if(!user) throw new NotFound('User')

        return user
    }

    async create(payload) {
        const {username, email} = payload

        await checkDuplicatedUser(username)
        await checkDuplicatedUser(email)

        return UserRepository.create(payload)
    }
}

module.exports = new UserService()