const UserRepository = require('../repositories/UserRepository')
const checkDuplicatedUser = require('../helpers/CheckDuplicatedUser')
const NotFound = require('../errors/NotFound')
const bcrypt = require('bcryptjs')
const transformFilterToRegex = require('../utils/transformFilterToRegex')
const FileRepository = require('../repositories/FileRepository')

class UserService {
    findAll({offset, limit, ...filter}) {
        filter = transformFilterToRegex(filter)
        return UserRepository.getAll(filter, offset, limit)
    }

    async findById({ id }) {
        const user = await UserRepository.getById(id)

        if(!user) throw new NotFound('User')

        return user
    }

    getRanking() {
        return UserRepository.getRanking()
    }

    async create(payload) {
        const {username, email} = payload

        await checkDuplicatedUser({username})
        await checkDuplicatedUser({email})

        return UserRepository.create(payload)
    }

    async update(id, payload, file) {
        const user = await this.findById({ id })

        const {username, email } = payload
        let { password } = payload

        if(username) await checkDuplicatedUser({username})
        if(email) await checkDuplicatedUser({email})

        if(password) {
            password = await bcrypt.hash(password, 10)
            payload = {...payload, password}
        }

        if(file) {
            const { key } = file
            payload.profilePic = key

            if(user.profilePic !== 'user.png') 
                await FileRepository.delete(user.profilePic)
        }

        return UserRepository.update(id, payload) 
    }

    async delete(id) {
        const { profilePic } = await this.findById({ id })
        if(profilePic !== 'user.png') 
            await FileRepository.delete(profilePic)
        
        return UserRepository.delete(id)
    }
}

module.exports = new UserService()