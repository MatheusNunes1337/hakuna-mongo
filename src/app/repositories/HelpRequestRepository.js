const GenericRepository = require("./GenericRepository");
//const HelpRequestSchema = require('../schemas/HelpRequestSchema')
const UserSchema = require('../schemas/UserSchema')
const PostSchema = require('../schemas/PostSchema')

class HelpRequestRepository extends GenericRepository {
    constructor() {
        super()
    }

    /*
    getAll(filter, offset = 0, limit = 500) {
        Number(limit);
        Number(offset);
    
        const {discipline} = filter
        return HelpRequestSchema.paginate({'group.discipline': discipline}, {offset, limit, populate: ['group']})
    }
    */

    /*
    getById(_id) {
        return HelpRequestSchema.findOne({_id})
        .populate([{path: 'post', populate: {path: 'group'}}])
    }*/


    async create(payload) {
        const { postId } = payload
        const { group } = await PostSchema.findById(postId).populate('group')

        return await UserSchema.updateMany({groups : {"$ne": group._id }, area: group.discipline}, 
            {$push: { helpRequests: postId }})
    }

    async cancel(_id) {
        return UserSchema.updateMany({helpRequests: _id}, 
            {$pull: { helpRequests: _id }})
    }

    async decline(_id, userId) {
        return UserSchema.findByIdAndUpdate(userId, 
            {$pull: { helpRequests: _id }})
    }
}

module.exports = new HelpRequestRepository()