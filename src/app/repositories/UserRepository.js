const GenericRepository = require("./GenericRepository");
const UserSchema = require('../schemas/UserSchema')
const GroupSchema = require('../schemas/GroupSchema')

class UserRepository extends GenericRepository {
    constructor() {
        super(UserSchema)
    }

    async getAll(filter, offset = 0, limit = 500) {
        Number(limit);
        Number(offset);
        return UserSchema.paginate(filter, { offset, limit, populate: ['groups']})
    }

    async getById(id) {
        return UserSchema.findById(id).populate('groups').populate({path: 'helpRequests', populate: {path: 'group'}});
    }

    async getRanking() {
        return UserSchema.find().sort({ contributionPoints: -1 }).limit(3);
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