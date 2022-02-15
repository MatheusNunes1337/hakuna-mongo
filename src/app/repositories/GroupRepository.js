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

    join(groupId, userId) {
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
}

module.exports = new GroupRepository()