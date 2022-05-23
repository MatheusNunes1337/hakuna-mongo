const bcrypt = require('bcryptjs')
const NotFound = require('../errors/NotFound')
const GroupRepository = require('../repositories/GroupRepository')
const transformFilterToRegex = require('../utils/transformFilterToRegex')
const Conflict = require('../errors/Conflict')
const BadRequest = require('../errors/BadRequest')
const PostService = require('./PostService')

class GroupService {
    findAll({offset, limit, ...filter}, userId) {
        const {members} = filter
        filter = transformFilterToRegex(filter)
        if(filter.members) {
            filter.members = [members, userId]
        } else if (filter.favorites) {
            filter.favorites = userId
        }

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

    async update(payload, id, userId) {
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

    async updateFavorites(groupId, userId) {
        await this.findById(groupId)

        return GroupRepository.updateFavorites(groupId, userId)
    }

    async join(groupId, userId, { password }) {
        const group = await this.findById(groupId)

        if(password) {
            const isPasswordValid = await bcrypt.compare(password, group.password)
            if(!isPasswordValid) throw new BadRequest('The password is incorrect')
        }

        return GroupRepository.join(groupId, userId)
    }

    async addModerator(id, userId) {
        await this.findById(id)

        return GroupRepository.addModerator(id, userId)
    }

    async removeModerator(id, userId) {
        const group = await this.findById(id)
        const modsId = group.mods.map(mod => mod._id.toString())
        const modIndex = modsId.indexOf(userId);

        if(modIndex == -1) throw new NotFound('Moderator');

        return GroupRepository.removeModerator(id, userId)
    }

    async removeMember(id, userId) {
        const group = await this.findById(id)
        const membersId = group.members.map(member => member._id.toString())
        const memberIndex = membersId.indexOf(userId);

        if(memberIndex === -1) throw new NotFound('Member')

        if(membersId.length === 1) {
            throw new BadRequest('You cannot leave this group because you are the only member left')
        }

        return GroupRepository.removeMember(id, userId)
    }

    async delete(id) {
        const {posts} = await this.findById(id)

        await Promise.all(posts.map(async post => {
            await PostService.delete({id: post, groupId: id})
        }))

        return GroupRepository.delete(id)
    }
}


module.exports = new GroupService()