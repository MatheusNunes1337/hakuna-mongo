const ChatService = require('../services/ChatService')

class ChatController {
    async findByUser(req, res) {
        const response = await ChatService.getByUser(req.userId)
        return res.status(200).json(response)
    }

    async findById(req, res) {
        const response = await ChatService.getById(req.params.id)
        return res.status(200).json(response)
    }

    async create(req, res) {
        const targetId = req.params.targetId
        const response = await ChatService.create(req.userId, targetId)
        return res.status(201).json(response)
    }

    async sendMessage(req, res) {
        const response = await ChatService.sendMessage(req.body, req.userId, req.params.id)
        return res.status(201).json(response)
    }

    async getMessages(req, res) {
        const response = await ChatService.getMessages(req.params.id)
        return res.status(200).json(response)
    }

    async delete(req, res) {
        await ChatService.delete(req.params)
        return res.status(204).end()
    }
}

module.exports = new ChatController()