const GenericRepository = require("./GenericRepository");
const GroupSchema = require('../schemas/GroupSchema')
const UserSchema = require('../schemas/UserSchema')

class GroupRepository extends GenericRepository {
    constructor() {
        super(GroupSchema)
    }

    async getAll(filter, offset = 0, limit = 100) {
        Number(limit);
        Number(offset);
   
        /*return GroupSchema.find().or([{discipline: filter.discipline}, {topics: filter.top}]).populate('members')
        .populate('mods')
        .populate('posts')
        .limit(limit)
        .skip(offset)*/
        return GroupSchema.paginate({$or: [{discipline: filter.discipline}, {topics: filter.top}]}, { offset, limit, populate: ['members', 'mods', 'posts']})
    }

    async getById(id) {
        return GroupSchema.findById(id)
        .populate('members')
        .populate('mods')
        .populate('posts')
    }

    async getByName(name) {
        return GroupSchema.findOne({ name })
        .populate('members')
        .populate('mods')
        .populate('posts')
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
        const { members } = await GroupSchema.findById(id)

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

        const user = await UserSchema.findById(userId)
        user.groups.push(groupId)

        return user.save()
    }

    addModerator(groupId, userId) {
        return GroupSchema.findByIdAndUpdate({_id: groupId}, 
            {$push: { mods: userId }})
    }

    removeModerator(groupId, userId) {
        return GroupSchema.findByIdAndUpdate({_id: groupId}, 
            {$pull: { mods: userId }})
    }

    async removeMember(groupId, userId) {
        await GroupSchema.findByIdAndUpdate({_id: groupId}, 
            {$pull: { mods: userId, members: userId }})
        
        const user = await UserSchema.findById(userId)
        user.groups.pull(groupId)

        return user.save()
    }
    
}

module.exports = new GroupRepository()