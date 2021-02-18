
//Db connect
const mongoose = require('mongoose');
var pass_db = process.env.DB_PASS
mongoose.connect('mongodb+srv://nuriwo:' + process.env.DB_PASS + '@cluster0.h28d2.mongodb.net/test',
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