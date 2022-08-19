const UserRepository = require('../repositories/UserRepository')
const Conflict = require('../errors/Conflict')

const checkDuplicatedUser = async (field) => {
    const fieldname = Object.keys(field)
    const user = await UserRepository.getAll(field)

    if(user.docs.length > 0) throw new Conflict(`Esse ${fieldname} já está sendo usado`)
}

module.exports = checkDuplicatedUser