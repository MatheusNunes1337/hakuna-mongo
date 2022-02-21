const GenericRepository = require("./GenericRepository");
const PostSchema = require('../schemas/PostSchema')

class PostRepository extends GenericRepository {
    constructor() {
        super(PostSchema)
    }

    async getById(_id, group) {
        return PostSchema.findOne({_id, group})
    }
}

module.exports = new PostRepository()