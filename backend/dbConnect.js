
//Db connect
require('dotenv').config();
const mongoose = require('mongoose');
var pass_db = String(process.env.DB_PASS)
var url_db = String('mongodb+srv://nuriwo:' + pass_db + '@cluster0.h28d2.mongodb.net/test')
mongoose.connect(url_db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
// mongoose.connect('mongodb://localhost:27017/adoptezlestous', {useCreateIndex: true,useNewUrlParser: true, useUnifiedTopology: true})
//   .then(() => console.log('Connexion à MongoDB réussie !'))
//   .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = mongoose;