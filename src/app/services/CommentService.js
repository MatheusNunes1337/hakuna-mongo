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

    async create(payload, postId, authorId, files) {
        payload.creationDate = getCurrentDate()
        payload.creationTime = getCurrentTime()
        payload.author = authorId
        payload.post = postId

        if(files) {
            const materials = files.map(file => file.filename)
            payload.files = materials
        }

        return CommentRepository.create(payload, postId)
    }

    async update(payload, {id, postId}) {
        const { author } = await this.findById(postId, id)
        const { likes, deslikes } = payload

        if(likes) {
            if(likes === 'enable') {
                await increaseContributionPoints(author._id)
                payload = {$inc : {likes : 1}}
            } else {
                await decreaseContributionPoints(author._id)
                payload = {$inc : {likes : -1}}
            }
        } else if(deslikes) {
            if(deslikes === 'enable') {
                await decreaseContributionPoints(author._id)
                payload = {$inc : {deslikes : 1}}
            } else {
                await increaseContributionPoints(author._id)
                payload = {$inc : {deslikes : -1}}
            } 
        }

        return CommentRepository.update(id, payload)
    }

    async delete({ id, postId }) {
        await this.findById(postId, id)
        return CommentRepository.delete(id, postId)
    }
}

module.exports = new CommentService()