const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcryptjs');

const UserSchema = Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
  },
  area: {
    type: String,
  },
  profilePic: {
    type: String,
    default: 'user.png'
  },
  contributionPoints: {
    type: Number,
    default: 0
  },
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group',
  }],
  helpRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'HelpRequest',
  }],
});

UserSchema.plugin(mongoosePaginate);

const User = model('User', UserSchema);

module.exports = User;