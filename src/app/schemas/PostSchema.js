const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = Schema({
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
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  },
});

PostSchema.plugin(mongoosePaginate);

const Post = model('Post', PostSchema);

module.exports = Post;
