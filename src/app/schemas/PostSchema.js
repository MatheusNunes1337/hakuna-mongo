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
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  },
});

PostSchema.plugin(mongoosePaginate);

const Post = model('Post', PostSchema);

module.exports = Post;
