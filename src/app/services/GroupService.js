const bcrypt = require('bcryptjs')
const NotFound = require('../errors/NotFound')
const GroupRepository = require('../repositories/GroupRepository')
const transformFilterToRegex = require('../utils/transformFilterToRegex')
const Conflict = require('../errors/Conflict')

class GroupService {
    findAll({offset, limit, ...filter}) {
        filter = transformFilterToRegex(filter)
        return GroupRepository.getAll(filter, offset, limit)
    }

    async findById(id) {
        const group = await GroupRepository.getById(id)
    
        if(!group) throw new NotFound('Group')

        return group
    }

    async create(payload, userId) {
        const { name } = payload
        const group = await GroupRepository.getByName(name)

        if(group) throw new Conflict('This group name is already in use')

        return GroupRepository.create(payload, userId)
    }

    async update(payload, id) {
        const { password, name } = payload

        const group = await this.findById(id)

        if(!group) throw new NotFound('Group')

        if(password) {
            payload.password = await bcrypt.hash(password, 10)
        }

        if(name && group.name !== name) {
            const group = await GroupRepository.getByName(name)
            if(group) throw new Conflict('This group name is already in use')
        }

        return GroupRepository.update(id, payload)
    }
}


module.exports = new GroupService()