const GenericRepository = require("./GenericRepository");
const PostSchema = require('../schemas/PostSchema')
const GroupSchema = require('../schemas/GroupSchema')
const CommentSchema = require('../schemas/CommentSchema')

class PostRepository extends GenericRepository {
    constructor() {
        super(PostSchema)
    }

    async getAll(filter, offset = 0, limit = 100) {
        Number(limit);
        Number(offset);
    
        return PostSchema.paginate(filter, { offset, limit, populate: ['author', 'comments']})
    }

    getById(_id, group) {
        return PostSchema.findOne({_id, group}).populate('author').populate('comments')
    }

    async create(payload, groupId) {
        const post = await PostSchema.create(payload);
        const group = await GroupSchema.findById(groupId)
        group.posts.push(post._id)
        await group.save()

        return post
    }

    async delete(_id, group) {
        await GroupSchema.findByIdAndUpdate(group, {$pull: {posts: _id}})
        await CommentSchema.deleteMany({post: _id})
        return PostSchema.findOneAndDelete({_id, group})
    }
}

module.exports = new PostRepository()