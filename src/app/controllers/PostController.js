const PostService = require('../services/PostService')

class PostController {
    async findAll(req, res) {
        const response = await PostService.findAll(req.query)
        return res.status(200).json(response)
    }
}

module.exports = new PostController()