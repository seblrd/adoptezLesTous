var express = require('express');
var router = express.Router();
const dashboardCtrller = require('../controllers/dashboardController');

/* GET users listing. */

router.post('/postMessage', dashboardCtrller.postMessage);
router.post('/getMessage', dashboardCtrller.getMessage);
router.post('/getOneMessage/:id', dashboardCtrller.getOneMessage);
router.put('/editOneMessage/:id', dashboardCtrller.editOneMessage);
router.delete('/deleteOneMessage/:id', dashboardCtrller.deleteOneMessage);

module.exports = router;