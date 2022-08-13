const GenericRepository = require("./GenericRepository");
//const HelpRequestSchema = require('../schemas/HelpRequestSchema')
const UserSchema = require('../schemas/UserSchema')
const PostSchema = require('../schemas/PostSchema')
const CommentSchema = require('../schemas/CommentSchema')

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

    async getAllResolved(userId) {
        const result = await CommentSchema.find({author: userId})
        const ids = result.map(comment => comment._id)
        return await PostSchema.find({resolvedBy: ids, 'group.members': {"$ne": userId}})
        .populate('group').populate('author')
    }


    async create(payload) {
        const { postId } = payload
        const { group, comments } = await PostSchema.findById(postId).populate('group')
        .populate({path: 'comments', populate: {path: 'author'}})
        const commentAuthors = comments.map(comment => comment.author._id)
        console.log('comment authors', commentAuthors)

        return await UserSchema.updateMany({groups : {"$ne": group._id }, area: group.discipline, _id: { $nin: commentAuthors }}, 
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