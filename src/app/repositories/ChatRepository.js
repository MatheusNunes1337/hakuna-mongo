const GenericRepository = require("./GenericRepository");
const ChatSchema = require('../schemas/ChatSchema');
const MessageSchema = require("../schemas/MessageSchema");

class ChatRepository extends GenericRepository {
    constructor() {
        super(ChatSchema)
    }

    async getByUser(userId) {
        return await ChatSchema.find({participants: userId}).populate('messages').populate('participants')
    }

    async getById(id) {
        return await ChatSchema.findById(id).populate('messages').populate('participants')
    }

    async create(participants) {
        return await ChatSchema.create({participants})
    }

    async sendMessage(payload) {
        const chat = await ChatSchema.findById(payload.chat)
        const message = await MessageSchema.create(payload)
        chat.messages.push(message._id)
        await chat.save()

        return message
    }

    async getMessages(chatId) {
        return await MessageSchema.find({chat: chatId}).populate('author')
    }

    async delete(id) {
        await MessageSchema.deleteMany({chat: id})
        return ChatSchema.findByIdAndDelete(id)
    }
}

module.exports = new ChatRepository()