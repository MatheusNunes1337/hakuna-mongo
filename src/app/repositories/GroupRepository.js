const GenericRepository = require("./GenericRepository");
const GroupSchema = require('../schemas/GroupSchema')
const UserSchema = require('../schemas/UserSchema')

class GroupRepository extends GenericRepository {
    constructor() {
        super(GroupSchema)
    }

    async getByName(name) {
        return GroupSchema.findOne({ name })
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