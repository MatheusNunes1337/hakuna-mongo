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
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  deslikes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
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
