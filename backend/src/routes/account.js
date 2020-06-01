var express = require('express');
var router = express.Router();
const accountCtrller = require('../controllers/accountController');

router.post('/getInfo', accountCtrller.getInfo);
// router.put('/editInfo/:id', accountCtrller.editOneMessage);
// router.delete('/deleteAccount/:id', accountCtrller.deleteOneMessage);
// router.post('/getPost/:id', accountCtrller.deleteOneMessage);

module.exports = router;