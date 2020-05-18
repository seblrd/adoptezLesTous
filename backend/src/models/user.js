const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
  username: { type: String, required: true, unique: true }
});

userSchema.plugin(uniqueValidator);
// userSchema.path('email').validate(
//   function (email) {
//   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//   return emailRegex.test(email.text); // Assuming email has a text attribute
// }, 'Email incorrect ou vide.');


module.exports = mongoose.model('User', userSchema);