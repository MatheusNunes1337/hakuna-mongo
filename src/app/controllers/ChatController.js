const ChatService = require('../services/ChatService')

class ChatController {
    async findByUser(req, res) {
        const response = await ChatService.getByUser(req.userId)
        return res.status(200).json(response)
    }

    async findById(req, res) {
        const response = await ChatService.getById(req.params)
        return res.status(200).json(response)
    }

    async delete(req, res) {
        await ChatService.delete(req.params)
        return res.status(204).end()
    }
}

module.exports = new ChatController()