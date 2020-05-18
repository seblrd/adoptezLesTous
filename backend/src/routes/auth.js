var express = require('express');
var router = express.Router();
const authCtrller = require('../controllers/authController');

/* GET users listing. */
router.post('/login', authCtrller.login);
router.post('/register', authCtrller.register);

module.exports = router;