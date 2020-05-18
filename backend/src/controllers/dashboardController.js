const Message = require('../models/message')

async function postMessage (req, res, next) {
  today = new Date();
  date = today.toLocaleDateString();
  time = today.toLocaleTimeString("fr-FR");
  dateTime = date+' '+time;
  const message = new Message({
    ...req.body,
    date: dateTime,
    lastModif: dateTime
  });
  message.save()
    .then(() => res.status(201).json({ message: 'Message posted' }))
    .catch(error => res.status(500).json({ error }));
};

async function getMessage (req, res, next) {
  Message.find()
    .then(message => {
      if (!message) {
        return res.status(401).json({ error: 'Aucun message !' });
      }
      res.status(201).json({ message });
    })
    .catch(error => res.status(500).json({ error }));
};
async function getOneMessage (req, res, next) {
  Message.findOne({_id: req.params.id})
    .then(message => {
      if (!message) {
        return res.status(401).json({ error: 'Aucun message !' });
      }
      res.status(201).json({ message });
    })
    .catch(error => res.status(500).json({ error }));
};

async function editOneMessage (req, res, next) {
  Message.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id})
    .then(() => res.status(201).json({message: "Message modifié"}))
    .catch(error => res.status(400).json({error}));
};
async function deleteOneMessage (req, res, next) {
  Message.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({message: "Message supprimé"}))
    .catch(error => res.status(400).json({error}));
};


exports.postMessage = postMessage;
exports.getMessage = getMessage;
exports.getOneMessage = getOneMessage;
exports.editOneMessage = editOneMessage;
exports.deleteOneMessage = deleteOneMessage;
