const NotFound = require('../errors/NotFound')
const PostRepository = require('../repositories/PostRepository')
const getCurrentDate = require('../utils/getCurrentDate')
const getCurrentTime = require('../utils/getCurrentTime')
const transformFilterToRegex = require('../utils/transformFilterToRegex')

class PostService {
    async findAll({offset, limit, ...filter}, groupId) {
        filter = transformFilterToRegex(filter)
        filter.group = groupId 
        return PostRepository.getAll(filter, offset, limit)
    }

    async findById(id, groupId) {
        const post = await PostRepository.getById(id, groupId)
        if(!post) throw new NotFound('Post')

        return post
    }

    create(payload, groupId, authorId) {
        payload.creationDate = getCurrentDate()
        payload.creationTime = getCurrentTime()
        payload.author = authorId
        payload.group = groupId

        return PostRepository.create(payload, groupId)
    }

    async update(payload, {id, groupId}) {
        await this.findById(id, groupId)
        return PostRepository.update(id, payload)
    }

    async delete({ id, groupId }) {
        await this.findById(id, groupId)
        return PostRepository.delete(id, groupId)
    }
}

module.exports = new PostService()