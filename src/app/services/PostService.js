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

    async update(payload, {id, groupId}, materials) {
        const { author, files } = await this.findById(id, groupId)
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