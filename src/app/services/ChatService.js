const NotFound = require('../errors/NotFound')
const ChatRepository = require('../repositories/ChatRepository')
const UserRepository = require('../repositories/UserRepository')

class ChatService {
    async getByUser(userId) {
        const user = UserRepository.getById(userId)
        if(!user) throw new NotFound('User')

        return ChatRepository.getByUser(userId)
    }

    async getById(id) {
        const chat = await ChatRepository.getById(id)
        if(!chat) throw new NotFound('Chat')

        return chat
    }

    async delete(id) {
        const chat = await ChatRepository.getById(id)
        if(!chat) throw new NotFound('Chat')

        return ChatRepository.delete(id)
    }
}

module.exports = new ChatService()