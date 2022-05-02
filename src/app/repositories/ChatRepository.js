const GenericRepository = require("./GenericRepository");
const ChatSchema = require('../schemas/ChatSchema');
const MessageSchema = require("../schemas/MessageSchema");

class ChatRepository extends GenericRepository {
    constructor() {
        super(ChatSchema)
    }

    async getAll(userId) {
        return await ChatSchema.find({participants: userId}).populate('messages')
    }

    async getById(id) {
        return await ChatSchema.findById(id).populate('messages')
    }

    async delete(id) {
        await MessageSchema.deleteMany({chat: id})
        return ChatSchema.findByIdAndDelete(id)
    }
}

module.exports = new ChatRepository()