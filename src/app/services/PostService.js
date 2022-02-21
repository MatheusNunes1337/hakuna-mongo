const PostRepository = require('../repositories/PostRepository')
const transformFilterToRegex = require('../utils/transformFilterToRegex')

class PostService {
    findAll({offset, limit, ...filter}) {
        filter = transformFilterToRegex(filter)
        return PostRepository.getAll(filter, offset, limit)
    }
}

module.exports = new PostService()