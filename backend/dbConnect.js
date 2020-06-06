//Db connect
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/adoptezlestous', {useCreateIndex: true,useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  module.exports=mongoose;