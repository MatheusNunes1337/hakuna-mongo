const { model, Schema } = require('mongoose');

const CommentSchema = Schema({
  content: {
    type: String,
    required: true,
  },
  creationDate: {
    type: String,
    required: true
  },
  creationTime: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0,
  },
  deslikes: {
    type: Number,
    default: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  files: [{
    type: String
  }],
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
