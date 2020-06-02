const User = require('../models/user')
const bcrypt = require('bcrypt');

async function getInfo (req, res, next) {
  User.findOne({_id: req.params.id})
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Id vide.' });
      }
      res.status(201).json({ user });
    })
    .catch(error => res.status(500).json({ error:"Aucun résultat pour cet id là." }));
};

async function editInfo (req, res, next) {
  if(validate(req, res, next) !='')
  {
    err = validate(req)
    console.log(err)
    return res.status(401).json({ error: err });
  }
  if(typeof req.body.password === 'string'){
    bcrypt.hash(req.body.password, 10)
    .then((hash=>{
      User.updateOne({ _id: req.params.id },
        { ...req.body,
          _id: req.params.id,          
          password: hash
        })
        .then(() =>res.status(201).json(
          {message: "Message modifié"}))
        .catch(error => res.status(400).json({err}));
    }))
  }
  else{
    User.updateOne({ _id: req.params.id },
      { ...req.body,
        _id: req.params.id
      }
      )
      .then(() =>res.status(201).json(
        {message: "Message modifié"}))
      .catch(error => res.status(400).json({error}));
  }  
}
function validate(req, res, next)
{
  err = '';
  reg = '#^[a-zA-Z0-9]+@[a-zA-Z]{2,}\.[a-z]{2,4}$#';
  if (req.body.username && (req.body.username.length < 3 || req.body.username.length > 20)) {
    err = err  + "Invalid 'username' field, Must have more than 3 characters and less than 20. \n";
  }
  if (req.body.email && !validateEmail(req.body.email)) {
    err = err + "Invalid 'email' field, Wrong format.\n";
  }
  if(typeof req.body.password === 'string'){
    if (req.body.password && (req.body.password.length < 8 || req.body.password.length > 20)) {
      err = err + "Invalid 'password' field, can't be blank and password must be between 8 and 20 characters.\n"
    }
    if(req.body.cpassword !== req.body.password)
    {
      err = err + "Invalid password confirmation.\n";
    }
  }
  // if (err != '') {
  //   return res.status(401).json({ error: err });
  // }
  return err;
}
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
async function deleteAccount (req, res, next) {
  User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({user: "Compte supprimé"}))
    .catch(error => res.status(400).json({error}));
};
exports.getInfo = getInfo;
exports.editInfo = editInfo;
exports.deleteAccount = deleteAccount;