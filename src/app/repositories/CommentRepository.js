const GenericRepository = require("./GenericRepository");
const CommentSchema = require('../schemas/CommentSchema')

class CommentRepository extends GenericRepository {
    constructor() {
        super(CommentSchema)
    }

    async getAll(postId) {
        return await CommentSchema.find({post: postId})
    }
}

module.exports = new CommentRepository()