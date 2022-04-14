const CommentService = require("../services/CommentService")
const { serialize, allComentsSerialize } = require('../serialize/commentSerialize')

class CommentController {
    async findAll(req, res) {
        const { postId } = req.params
        const response = await CommentService.getAll(postId)
        return res.status(200).json(allComentsSerialize({comments: response}))
    }

    async findById(req, res) {
        const {postId, id} = req.params
        const response = await CommentService.findById(postId, id)
        return res.status(200).json(serialize(response))
    }

    async create(req, res) {
        const { postId } = req.params
        const response = await CommentService.create(req.body, postId, req.userId, req.files)
        return res.status(201).json(serialize(response))
    }

    async update(req, res) {
        const response = await CommentService.update(req.body, req.userId, req.params, req.files)
        return res.status(200).json(serialize(response))
    }

    async delete(req, res) {
        await CommentService.delete(req.params)
        return res.status(204).end()
    }
}

module.exports = new CommentController()