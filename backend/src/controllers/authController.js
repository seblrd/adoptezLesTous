const User = require('../models/user')
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
async function register (req, res, next) {
  if(validate(req, res, next) !='')
  {
    err = validate(req)
    return res.status(401).json({ error: err });
  }
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        ...req.body,
        password: hash,
        admin: false,
        ban: false
      });
      user.save()
        .then(() => res.status(201).json({
          userId: user._id,
          username: user.username,
          admin: user.admin,
          phoneNumber: user.phoneNumber,
          token: jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          )
        }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

async function login (req, res, next) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              username: user.username,
              admin: user.admin,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
            let headers = new Headers();
            headers.append("Authorization","Beared "+ token);
            this.http.post(AUTHENTICATION_ENDPOINT + "?grant_type=password&scope=trust&username=" + login + "&password=" + password, null, {headers: headers}).subscribe(response => {
              console.log(response);
            });
          })
          // .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};
function validate(req, res, next)
{
  err = '';
  reg = '#^[a-zA-Z0-9]+@[a-zA-Z]{2,}\.[a-z]{2,4}$#';
  if (!req.body.username || req.body.username.length < 3 || req.body.username.length > 20) {
    err = err  + "Invalid 'username' field, Must have more than 3 characters and less than 20.";
  }
  if (!req.body.email || !validateEmail(req.body.email)) {
    err = err + "Invalid 'email' field, Wrong format.";
  }
  if (!req.body.password || req.body.password.length < 8 || req.body.password.length > 20) {
    err = err + "Invalid 'password' field, can't be blank and password must be between 8 and 20 characters.";
  }
  if(req.body.cpassword !== req.body.password)
  {
    err = err + "Invalid password confirmation.";
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
exports.login = login;
exports.register = register;