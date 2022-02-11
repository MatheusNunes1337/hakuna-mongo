const userRepository = require('../repositories/UserRepository')
const NotFound = require('../errors/NotFound')
const Conflict = require('../errors/Conflict')

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

    async create(payload) {
        let user
        const {username, email} = payload
        
        user = await this.findAll({ username })
    
        if(user.docs.length > 0) throw new Conflict('This username is already in use')

        user = await this.findAll({ email })

        if(user.docs.length > 0) throw new Conflict('This email is already in use')

        return this.userRepo.create(payload)
    }
}

module.exports = new UserService()