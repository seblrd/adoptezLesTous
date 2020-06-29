const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  chat: {type: required: true },
  userBanned: {required: false },
  ownerId: {required: true },
  customerId: {required: true },
  date:{require: true},
  lastModif:{require: true},
});

module.exports = mongoose.model('Chat', chatSchema);