const bcrypt = require('bcryptjs')
const NotFound = require('../errors/NotFound')
const GroupRepository = require('../repositories/GroupRepository')
const transformFilterToRegex = require('../utils/transformFilterToRegex')
const Conflict = require('../errors/Conflict')
const BadRequest = require('../errors/BadRequest')

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

        if(password) {
            payload.password = await bcrypt.hash(password, 10)
        }

        if(name && group.name !== name) {
            const group = await GroupRepository.getByName(name)
            if(group) throw new Conflict('This group name is already in use')
        }

        return GroupRepository.update(id, payload)
    }

    async join(groupId, userId) {
        await this.findById(groupId)

        return GroupRepository.join(groupId, userId)
    }

    async addModerator(id, userId) {
        await this.findById(id)

        return GroupRepository.addModerator(id, userId)
    }

    async removeModerator(id, userId) {
        const group = await this.findById(id)
        const modIndex = group.mods.indexOf(userId);

        if(modIndex === -1) throw new NotFound('Moderator')

        return GroupRepository.removeModerator(id, userId)
    }

    async removeMember(id, userId) {
        const group = await this.findById(id)
        const memberIndex = group.members.indexOf(userId);

        if(memberIndex === -1) throw new NotFound('Member')

        if(group.members.length === 1) {
            throw new BadRequest('You cannot leave this group because you are the only member left')
        }

        return GroupRepository.removeMember(id, userId)
    }
}


module.exports = new GroupService()