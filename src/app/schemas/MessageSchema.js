const { model, Schema } = require('mongoose');

const MessageSchema = Schema({
  message: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: String,
    required: true
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
  },
});

const Message = model('Message', MessageSchema);

module.exports = Message;
