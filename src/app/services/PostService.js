const NotFound = require('../errors/NotFound')
const GroupService = require('../services/GroupService')
const PostRepository = require('../repositories/PostRepository')
const getCurrentDate = require('../utils/getCurrentDate')
const getCurrentTime = require('../utils/getCurrentTime')
const transformFilterToRegex = require('../utils/transformFilterToRegex')

class PostService {
    async findAll({offset, limit, ...filter}) {
        filter = transformFilterToRegex(filter)
        return PostRepository.getAll(filter, offset, limit)
    }

    async findById(id) {
        const post = await PostRepository.getById(id)

        if(!post) throw new NotFound('Post')

        return post
    }

    async create(payload, authorId) {
        payload.creationDate = getCurrentDate()
        payload.creationTime = getCurrentTime()
        payload.author = authorId

        return PostRepository.create(payload)
    }
}

module.exports = new PostService()