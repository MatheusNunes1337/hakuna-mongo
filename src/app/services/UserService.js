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

        if(!user) throw new NotFound('Usuário')

        return user
    }

    getRanking() {
        return UserRepository.getRanking()
    }

    async create(payload) {
        const {username, email, password} = payload

        await checkDuplicatedUser({username})
        await checkDuplicatedUser({email})

        payload.password = await bcrypt.hash(password, 10);

        return UserRepository.create(payload)
    }

    async update(id, payload, file) {
        const user = await this.findById({ id })

        const {username, email, area } = payload
        let { password } = payload

        if(username && username !== user.username) {
            await checkDuplicatedUser({username})
        }
        
        if(email && email !== user.email) {
            await checkDuplicatedUser({email})
        }

        if(password) {
            password = await bcrypt.hash(password, 10)
            payload = {...payload, password}
        }

        if(area !== user.area) {
            payload.helpRequests = []
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