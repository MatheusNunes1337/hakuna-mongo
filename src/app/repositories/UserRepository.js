const GenericRepository = require("./GenericRepository");
const UserSchema = require('../schemas/UserSchema')
const GroupSchema = require('../schemas/GroupSchema')

class UserRepository extends GenericRepository {
    constructor() {
        super(UserSchema)
    }

    async getAll(filter, offset = 0, limit = 100) {
        Number(limit);
        Number(offset);
    
        return UserSchema.paginate(filter, { offset, limit, populate: ['groups']})
    }

    async getByUsername(username) {
        return UserSchema.findOne({ username }).populate('groups');
    }

    async getByEmail(email) {
        return UserSchema.findOne({ email }).populate('groups');
    }

    async recoverPassword(email, password) {
        return UserSchema.findOneAndUpdate({ email }, 
            { password }, 
            { new: true }
        )
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