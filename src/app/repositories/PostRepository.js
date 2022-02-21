const GenericRepository = require("./GenericRepository");
const PostSchema = require('../schemas/PostSchema')

class PostRepository extends GenericRepository {
    constructor() {
        super(PostSchema)
    }
}

module.exports = new PostRepository()