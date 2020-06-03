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
  var data = [];
  for(element in req.body){
    if(req.body[element] !== ''){
      data[element]=req.body[element]      
    }
  }
  if(validate(data) !='')
  {
    err = validate(data)
    console.log(err)
    return res.status(401).json({ error: err });
  }
  if(typeof data.password === 'string'){
    bcrypt.hash(data.password, 10)
    .then((hash=>{
      User.updateOne({ _id: req.params.id },
        { ...data,
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
      { ...data,
        _id: req.params.id
      }
      )
      .then(() =>res.status(201).json(
        {message: "Message modifié"}))
      .catch(error => res.status(400).json({error}));
  }  
}
function validate(data)
{
  err = '';
  reg = '#^[a-zA-Z0-9]+@[a-zA-Z]{2,}\.[a-z]{2,4}$#';
  if (data.username && (data.username.length < 3 || data.username.length > 20)) {
    err = err  + "Invalid 'username' field, Must have more than 3 characters and less than 20. \n";
  }
  if (data.email && !validateEmail(data.email)) {
    err = err + "Invalid 'email' field, Wrong format.\n";
  }
  if(typeof data.password === 'string'){
    if (data.password && (data.password.length < 8 || data.password.length > 20)) {
      err = err + "Invalid 'password' field, can't be blank and password must be between 8 and 20 characters.\n"
    }
    if(data.cpassword !== data.password)
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