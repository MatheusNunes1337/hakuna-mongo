const GenericRepository = require("./GenericRepository");
const CommentSchema = require('../schemas/CommentSchema');
const PostSchema = require("../schemas/PostSchema");

class CommentRepository extends GenericRepository {
    constructor() {
        super(CommentSchema)
    }

    async getAll(postId) {
        return await CommentSchema.find({post: postId}).populate('author')
    }

    async getById(_id, post) {
        return await CommentSchema.findOne({_id, post}).populate('author')
    }

    async create(payload, postId) {
        const post = await PostSchema.findById(postId)
        const comment = await CommentSchema.create(payload);
        post.comments.push(comment._id)
        await post.save()

        return comment
    }

    async delete(_id, post) {
        await PostSchema.findByIdAndUpdate(post, {$pull: {comments: _id}})
        return CommentSchema.findOneAndDelete({_id, post})
    }
}

module.exports = new CommentRepository()