const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
mongoose.Promise = global.Promise;

const MailMapSchema = new Schema({
  inboundAddress: String,
  forwardingAddress: String,
  createdAt: Date,
  updatedAt: Date
});

module.exports = mongoose.model('MailMap', MailMapSchema);
