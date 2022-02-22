const NotFound = require('../errors/NotFound')
const CommentRepository = require('../repositories/CommentRepository')
const getCurrentDate = require('../utils/getCurrentDate')
const getCurrentTime = require('../utils/getCurrentTime')

class CommentService {
    getAll(postId) {
        return CommentRepository.getAll(postId)
    }

    async findById(postId, id) {
        const comment = await CommentRepository.getById(id, postId)
        if(!comment) throw new NotFound('Comment')
        
        return comment
    }

    async create(payload, postId, authorId) {
        payload.creationDate = getCurrentDate()
        payload.creationTime = getCurrentTime()
        payload.author = authorId
        payload.post = postId

        return CommentRepository.create(payload, postId)
    }

    async update(payload, {id, postId}) {
        await this.findById(postId, id)
        return CommentRepository.update(id, payload)
    }

    async delete({ id, postId }) {
        await this.findById(postId, id)
        return CommentRepository.delete(id, postId)
    }
}

module.exports = new CommentService()