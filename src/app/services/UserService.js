const UserRepository = require('../repositories/UserRepository')
const checkDuplicatedUser = require('../helpers/checkDuplicatedUser')
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

        await checkDuplicatedUser({username})
        await checkDuplicatedUser({email})

        return UserRepository.create(payload)
    }

    async update(id, payload) {
        await this.findById({ id })

        const {username, email} = payload

        if(username) await checkDuplicatedUser({username})
        if(email) await checkDuplicatedUser({email})

        return UserRepository.update(id, payload) 
    }

    async delete(id) {
        await this.findById({ id })

        return UserRepository.delete(id)
    }
}

module.exports = new UserService()