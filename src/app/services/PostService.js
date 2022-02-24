const NotFound = require('../errors/NotFound')
const decreaseContributionPoints = require('../helpers/decreaseContributionPoints')
const increaseContributionPoints = require('../helpers/increaseContributionPoints')
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
        const { author } = await this.findById(id, groupId)
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

        return PostRepository.update(id, payload)
    }

    async delete({ id, groupId }) {
        await this.findById(id, groupId)
        return PostRepository.delete(id, groupId)
    }
}

module.exports = new PostService()