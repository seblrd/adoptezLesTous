const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  petLocation: { type: String, required: true },
  petPic: { type: String, required: true },
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  petAge: { type: Number, required: true },
  petBreed: { type: String, required: false },
  petBreed: { type: String, required: false },
  date: {type: String, required: true},
  petSexe: {type: String, required: true},
  lastModif: {type: String, required: true},
  adopted: {type: String, required: true},
  usernameId:{type: String, required: true}
});

module.exports = mongoose.model('Message', messageSchema);