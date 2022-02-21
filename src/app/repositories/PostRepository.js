const GenericRepository = require("./GenericRepository");
const PostSchema = require('../schemas/PostSchema')
const GroupSchema = require('../schemas/GroupSchema')

class PostRepository extends GenericRepository {
    constructor() {
        super(PostSchema)
    }

    getById(_id, group) {
        return PostSchema.findOne({_id, group})
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
        return PostSchema.findOneAndDelete({_id, group})
    }
}

module.exports = new PostRepository()