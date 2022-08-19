const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcryptjs');

const GroupSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discipline: {
    type: String,
    required: true,
  },
  topics: [{
    type: String,
    required: true,
  }],
  isPublic: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  maxMembers: {
    type: Number,
    default: 100
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  mods: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
});

GroupSchema.plugin(mongoosePaginate);

const Group = model('Group', GroupSchema);

module.exports = Group;
