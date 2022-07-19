const BadRequest = require('../errors/BadRequest')
const NotFound = require('../errors/NotFound')
const decreaseContributionPoints = require('../helpers/decreaseContributionPoints')
const increaseContributionPoints = require('../helpers/increaseContributionPoints')
const FileRepository = require('../repositories/FileRepository')
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

    async create(payload, groupId, authorId, files) {
        payload.creationDate = getCurrentDate()
        payload.creationTime = getCurrentTime()
        payload.author = authorId
        payload.group = groupId

        if(files) {
            const materials = files.map(file => file.key)
            payload.files = materials
        }

        return PostRepository.create(payload, groupId)
    }

    async update(payload, userId, {id, groupId}, materials) {
        const { author, files, likes, deslikes } = await this.findById(id, groupId)
        const {isLiked, isDesliked, content, resolvedBy} = payload

        if(content) {
            payload.updated = true
        }

        if(resolvedBy) {
            const {author} = payload
            await increaseContributionPoints(author, 250)
        }
  
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
                throw new BadRequest('A post cannot have more than 3 files')

            const postFiles = materials.map(file => file.key)
            payload.files = files.concat(postFiles)
        }

        return PostRepository.update(id, payload)
    }

    async delete({ id, groupId }) {
        const { files, comments } = await this.findById(id, groupId)
        const commentFiles = comments.map(comment => comment.files)
        const allFiles = [files, ...commentFiles].flat()
        await FileRepository.deleteMany(allFiles)

        return PostRepository.delete(id, groupId)
    }
}

module.exports = new PostService()