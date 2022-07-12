const NotFound = require('../errors/NotFound')
const CommentRepository = require('../repositories/CommentRepository')
const decreaseContributionPoints = require('../helpers/decreaseContributionPoints')
const increaseContributionPoints = require('../helpers/increaseContributionPoints')
const FileRepository = require('../repositories/FileRepository')
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
            const materials = files.map(file => file.key)
            payload.files = materials
        }

        return CommentRepository.create(payload, postId)
    }

    async update(payload, userId, {id, postId}, materials) {
        const { author, files, likes, deslikes } = await this.findById(postId, id)
        const {isLiked, isDesliked} = payload

        payload.updated = true
  
        if(isLiked) {
            if(!likes.includes(userId)) {
                await increaseContributionPoints(author._id, 50)
                payload = {$push : {likes : userId}, $pull : {deslikes : userId}}
            } else {
                await decreaseContributionPoints(author._id, 50)
                payload = {$pull : {likes : userId}}
            }
        } else if(isDesliked) {
            if(!deslikes.includes(userId)) {
                await decreaseContributionPoints(author._id, 50)
                payload = {$push : {deslikes : userId}, $pull : {likes : userId}}
            } else {
                await increaseContributionPoints(author._id, 50)
                payload = {$pull : {deslikes : userId}}
            } 
        }

        if(materials) {
            if(materials.length + files.length > 3) 
                throw new BadRequest('A comment cannot have more than 3 files')

            const commentFiles = materials.map(file => file.key)
            payload.files = commentFiles
        }

        return CommentRepository.update(id, payload)
    }

    async delete({ id, postId }) {
        const { files } = await this.findById(postId, id)
        await FileRepository.deleteMany(files)
        return CommentRepository.delete(id, postId)
    }
}

module.exports = new CommentService()