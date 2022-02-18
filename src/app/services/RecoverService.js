const NotFound = require('../errors/NotFound')
const UserRepository = require('../repositories/UserRepository')

class RecoverService {
    async recoverPassword(email, password) {
        const user = await UserRepository.getByEmail(email)
        if(!user) throw new NotFound('User')

        return UserRepository.recoverPassword(email, password)
    }
}

module.exports = new RecoverService()