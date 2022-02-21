const CommentService = require("../services/CommentService")

class CommentController {
    async findAll(req, res) {
        const { postId } = req.params
        const response = await CommentService.getAll(postId)
        return res.status(200).json(response)
    }
}

module.exports = new CommentController()