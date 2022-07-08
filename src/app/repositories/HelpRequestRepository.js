const GenericRepository = require("./GenericRepository");
const HelpRequestSchema = require('../schemas/HelpRequestSchema')
const UserSchema = require('../schemas/UserSchema')

class HelpRequestRepository extends GenericRepository {
    constructor() {
        super(HelpRequestSchema)
    }

    /*
    getAll(filter, offset = 0, limit = 500) {
        Number(limit);
        Number(offset);
    
        const {discipline} = filter
        return HelpRequestSchema.paginate({'group.discipline': discipline}, {offset, limit, populate: ['group']})
    }
    */

    getById(_id) {
        return HelpRequestSchema.findOne({_id})
        .populate('group')
    }

    async create(payload) {
        let helpRequest = await HelpRequestSchema.create(payload)

        const {_id, group} = await this.getById(helpRequest._id)

        await UserSchema.updateMany({groups : {"$ne": group._id }, area: group.discipline}, 
            {$push: { helpRequests: _id }})

        return helpRequest
    }

    decline(_id, userId) {
        return UserSchema.findByIdAndUpdate(userId, 
            {$pull: { helpRequests: _id }})
    }
}

module.exports = new HelpRequestRepository()