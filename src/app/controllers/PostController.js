const PostService = require('../services/PostService')
const { serialize, paginateSerialize } = require('../serialize/postSerialize')

class PostController {
    async findAll(req, res) {
        const { groupId } = req.params
        const response = await PostService.findAll(req.query, groupId)
        return res.status(200).json(paginateSerialize(response))
    }

    async findById(req, res) {
        const { id, groupId } = req.params
        const response = await PostService.findById(id, groupId)
        return res.status(200).json(serialize(response))
    }

    async create(req, res) {
        const { groupId } = req.params
        const response = await PostService.create(req.body, groupId, req.userId, req.files)
        return res.status(201).json(serialize(response))
    }

    async update(req, res) {
        const response = await PostService.update(req.body, req.params, req.files)
        return res.status(200).json(serialize(response))
    }

    async delete(req, res) {
        await PostService.delete(req.params)
        return res.status(204).end()
    }
}

module.exports = new PostController()