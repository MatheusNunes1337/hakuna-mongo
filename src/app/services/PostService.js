const NotFound = require('../errors/NotFound')
const PostRepository = require('../repositories/PostRepository')
const transformFilterToRegex = require('../utils/transformFilterToRegex')

class PostService {
    findAll({offset, limit, ...filter}) {
        filter = transformFilterToRegex(filter)
        return PostRepository.getAll(filter, offset, limit)
    }

    async findById(id) {
        const post = await PostRepository.getById(id)

        if(!post) throw new NotFound('Post')

        return post
    }
}

module.exports = new PostService()