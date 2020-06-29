const Chat = require('../models/chat')
const fs = require('fs');

async function postChat (req, res, next) {
  today = new Date();
  date = today.toLocaleDateString();
  time = today.toLocaleTimeString("fr-FR");
  dateTime = date +' '+ time;
  const chat = new Chat({
    ...req.body,
    date: dateTime,
    lastModif: dateTime,

  });
  chat.save()
    .then(() => res.status(201).json({ chat: 'Message posted' }))
    .catch(error => res.status(500).json({ error }));
};
async function getChat (req, res, next) {
  Chat.find()
    .then(chat => {
      if (!chat) {
        return res.status(401).json({ error: 'Aucun chat !' });
      }
      res.status(201).json({ chat });
    })
    .catch(error => res.status(500).json({ error }));
};
async function getOneChat (req, res, next) {
  Chat.findOne({_id: req.params.id})
    .then(chat => {
      if (!chat) {
        return res.status(401).json({ error: 'Aucun chat !' });
      }
      res.status(201).json({ chat });
    })
    .catch(error => res.status(500).json({ error:"Aucun résultat pour cet id là." }));
};


exports.postChat = postChat;
exports.getChat = getChat;
exports.getOneChat = getOneChat;
