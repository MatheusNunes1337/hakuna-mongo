const PostService = require('../services/PostService')

class PostController {
    async findAll(req, res) {
        const response = await PostService.findAll(req.query)
        return res.status(200).json(response)
    }

    async findById(req, res) {
        const { id } = req.params
        const response = await PostService.findById(id)
        return res.status(200).json(response)
    }

    async create(req, res) {
        const response = await PostService.create(req.body, req.userId)
        return res.status(201).json(response)
    }
}

module.exports = new PostController()