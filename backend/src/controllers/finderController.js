const Message = require('../models/message')

async function getFilterMessage (req, res, next) {
  var valueFilter = {};
  for(element in req.body){
    if(req.body[element] !== ''){
      valueFilter[element]=req.body[element]      
    }
  }
  Message.find(valueFilter)
    .then(message => {
      if (!message) {
        return res.status(401).json({ error: 'Aucun Résultat !' });
      }
      res.status(201).json({ message });
    })
    .catch(error => res.status(500).json({ error }));
};


exports.getFilterMessage = getFilterMessage;
