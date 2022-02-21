const PostService = require('../services/PostService')

class PostController {
    async findAll(req, res) {
        const { groupId } = req.params
        const response = await PostService.findAll(req.query, groupId)
        return res.status(200).json(response)
    }

    async findById(req, res) {
        const { id, groupId } = req.params
        const response = await PostService.findById(id, groupId)
        return res.status(200).json(response)
    }

    async create(req, res) {
        const { groupId } = req.params
        const response = await PostService.create(req.body, groupId, req.userId)
        return res.status(201).json(response)
    }

    async update(req, res) {
        const { id } = req.params
        const response = await PostService.update(req.body, id)
        return res.status(200).json(response)
    }
}

module.exports = new PostController()