var express = require('express');
var router = express.Router();
const accountCtrller = require('../controllers/accountController');

router.post('/getInfo/:id', accountCtrller.getInfo);
router.put('/editInfo/:id', accountCtrller.editInfo);
router.delete('/deleteAccount/:id', accountCtrller.deleteAccount);
// router.post('/getPost/:id', accountCtrller.deleteOneMessage);

module.exports = router;