const { model, Schema } = require('mongoose');

const ChatSchema = Schema({
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message',
  }],
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});

const Chat = model('Chat', ChatSchema);

module.exports = Chat;
