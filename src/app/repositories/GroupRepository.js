const GenericRepository = require("./GenericRepository");
const GroupSchema = require('../schemas/GroupSchema')

class GroupRepository extends GenericRepository {
    constructor() {
        super(GroupSchema)
    }

    async create(payload, userId) {
        const group = await GroupSchema.create(payload)

        group.members.push(userId)
        group.mods.push(userId)

        return group.save()
    }
}

module.exports = new GroupRepository()