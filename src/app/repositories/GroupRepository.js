const GenericRepository = require("./GenericRepository");
const GroupSchema = require('../schemas/GroupSchema')
const UserSchema = require('../schemas/UserSchema')
const PostSchema = require('../schemas/PostSchema')

class GroupRepository extends GenericRepository {
    constructor() {
        super(GroupSchema)
    }

    async getAll(filter, offset = 0, limit = 500) {
        Number(limit);
        Number(offset);
        const {members, favorites} = filter

        if(members) {
            return await GroupSchema.paginate({members: {$all: members}}, { offset, limit, populate: ['members', 'mods', 'posts']})
        }

        if(favorites) {
            return await GroupSchema.paginate({favorites}, { offset, limit})
        }

        return GroupSchema.paginate({$or: [{discipline: filter.discipline}, {topics: filter.topics}]}, { offset, limit, populate: ['members', 'mods', 'posts']})
    }

    async getById(id) {
        return GroupSchema.findById(id)
        .populate('members')
        .populate('mods')
        .populate({path: 'posts', populate: [{path: 'author'}, {path: 'comments', populate: {path: 'author'}}]})
    }

    async getByName(name) {
        return GroupSchema.findOne({ name })
        .populate('members')
        .populate('mods')
        .populate({path: 'posts', populate: {path: 'author'}})
    }

    async create(payload, userId) {
        const group = await GroupSchema.create(payload)

        group.members.push(userId)
        group.mods.push(userId)

        const user = await UserSchema.findById(userId)
        user.groups.push(group._id)
        user.save()

        return group.save()
    }

    async delete(id) {
        const { members, posts } = await GroupSchema.findById(id)

        await Promise.all(members.map(async member => {
            await UserSchema.findByIdAndUpdate({_id: member}, 
                {$pull: {groups: id}}
            )
        }))

        return GroupSchema.findByIdAndDelete(id)
    }

    async join(groupId, userId) {
        await GroupSchema.findByIdAndUpdate({_id: groupId}, 
            {$push: { members: userId }})

        return await UserSchema.findByIdAndUpdate({_id: userId}, 
             {$push: { groups: groupId }})

    }

    addModerator(groupId, userId) {
        return GroupSchema.findByIdAndUpdate({_id: groupId}, 
            {$push: { mods: userId }})
    }

    async updateFavorites(groupId, userId) {
        const {favorites} = await GroupSchema.findById(groupId)
      
        if(favorites.includes(userId)) {
            return await GroupSchema.findByIdAndUpdate({_id: groupId}, 
                {$pull: { favorites: userId }})
        } else {
            return await GroupSchema.findByIdAndUpdate({_id: groupId}, 
                {$push: { favorites: userId }})
        }
    }

    removeModerator(groupId, userId) {
        return GroupSchema.findByIdAndUpdate({_id: groupId}, 
            {$pull: { mods: userId }})
    }

    async removeMember(groupId, userId) {
        await GroupSchema.findByIdAndUpdate({_id: groupId}, 
            {$pull: { mods: userId, members: userId }})
        
        return await UserSchema.findByIdAndUpdate({_id: userId}, 
            {$pull: { groups: groupId }})
    }
    
}

module.exports = new GroupRepository()