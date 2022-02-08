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
  maxMembers: {
    type: Number,
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
  favorites: {
    type: Number,
    default: 0,
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
});

GroupSchema.pre('save', async function encryptPass(next) {
  const encriptedPassword = await bcrypt.hash(this.password, 10);
  this.password = encriptedPassword;
  next();
});

GroupSchema.plugin(mongoosePaginate);

const Group = model('Group', GroupSchema);

module.exports = Group;
