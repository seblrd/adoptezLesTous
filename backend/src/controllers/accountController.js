const User = require('../models/user')

// async function getInfo (req, res, next) {
//   User.findOne({_id: req.params.id})
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({ error: 'Aucun résultat pour cet id là.' });
//       }
//       res.status(201).json({ message });
//     })
//     .catch(error => res.status(500).json({ error:"Aucun résultat pour cet id là." }));
// };

async function editOneMessage (req, res, next) {
  today = new Date();
  date = today.toLocaleDateString();
  time = today.toLocaleTimeString("fr-FR");
  dateTime = date+' '+time;
  if(typeof req.file === 'undefined'){
    Message.updateOne({ _id: req.params.id },
      { ...req.body,
       lastModif: dateTime,
       _id: req.params.id
     })
     .then(() => res.status(201).json({message: "Message modifié"}))
     .catch(error => res.status(400).json({error}));
  }
  if(typeof req.file !== 'undefined'){
    Message.updateOne({ _id: req.params.id },
      { ...req.body,
       lastModif: dateTime,
       _id: req.params.id,
       petPic: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     })
     .then(() => res.status(201).json({message: "Message modifié"}))
     .catch(error => res.status(400).json({error}));
  };
};
async function deleteOneMessage (req, res, next) {
  Message.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({message: "Message supprimé"}))
    .catch(error => res.status(400).json({error}));
};
async function getInfo (req, res, next) {
  User.find()
    .then(message => {
      if (!message) {
        return res.status(401).json({ error: 'Aucun message !' });
      }
      res.status(201).json({ message });
    })
    .catch(error => res.status(500).json({ error }));
};


exports.getInfo = getInfo;
