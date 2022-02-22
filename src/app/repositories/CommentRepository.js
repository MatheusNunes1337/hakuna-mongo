const GenericRepository = require("./GenericRepository");
const CommentSchema = require('../schemas/CommentSchema')

class CommentRepository extends GenericRepository {
    constructor() {
        super(CommentSchema)
    }

    async getAll(postId) {
        return await CommentSchema.find({post: postId})
    }

    async getById(_id, post) {
        return await CommentSchema.findOne({_id, post})
    }
}

module.exports = new CommentRepository()