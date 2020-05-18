const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  petLocation: { type: String, required: true },
  petPic: { type: String, required: true },
  petName: { type: String, required: false },
  petType: { type: String, required: true },
  petAge: { type: Number, required: false },
  petBreed: { type: String, required: false },
  date: {type: String, required: true},
  lastModif: {type: String, required: true}
});

module.exports = mongoose.model('Message', messageSchema);