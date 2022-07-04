const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const HelpRequestSchema = Schema({
  content: {
    type: String,
    required: true
  },
  creationDate: {
    type: String,
    required: true
  },
  creationTime: {
    type: String,
    required: true
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  },
});

HelpRequestSchema.plugin(mongoosePaginate);

const HelpRequest = model('HelpRequest', HelpRequestSchema);

module.exports = HelpRequest;
