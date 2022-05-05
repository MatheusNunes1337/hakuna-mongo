const NotFound = require('../errors/NotFound')
const ChatRepository = require('../repositories/ChatRepository')
const UserRepository = require('../repositories/UserRepository')
const getCurrentDate = require('../utils/getCurrentDate')
const getCurrentTime = require('../utils/getCurrentTime')

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

    async create(userId, targetId) {
        const participants = [userId, targetId]
        const chat = await ChatRepository.getByParticipants(participants)
        if(chat) return chat

        return ChatRepository.create(participants)
    }

    async sendMessage(payload, authorId, chatId) {
        const chat = await ChatRepository.getById(chatId)
        if(!chat) throw new NotFound('Chat')

        payload.author = authorId
        payload.chat = chatId
        payload.creationDate = getCurrentDate()
        payload.creationTime = getCurrentTime()

        return ChatRepository.sendMessage(payload)
    
    }

    async getMessages(chatId) {
        const chat = await ChatRepository.getById(chatId)
        if(!chat) throw new NotFound('Chat')

        return ChatRepository.getMessages(chatId)
    }

    async delete(id) {
        const chat = await ChatRepository.getById(id)
        if(!chat) throw new NotFound('Chat')

        return ChatRepository.delete(id)
    }
}

module.exports = new ChatService()