const GenericRepository = require("./GenericRepository");
const UserSchema = require('../schemas/UserSchema')
const GroupSchema = require('../schemas/GroupSchema')

class UserRepository extends GenericRepository {
    constructor() {
        super(UserSchema)
    }

    async getByUsername(username) {
        return UserSchema.findOne({ username });
    }

    async delete(id) {
        const { groups } = await UserSchema.findById(id)

        await Promise.all(groups.map(async group => {
            await GroupSchema.findByIdAndUpdate({_id: group}, 
                {$pull: { members: id, mods: id }}
            )
        }))

        return UserSchema.findByIdAndDelete(id)
    }
}

module.exports = new UserRepository()