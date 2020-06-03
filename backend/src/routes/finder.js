var express = require('express');
var router = express.Router();
const dashboardCtrller = require('../controllers/dashboardController');
const finderCtrller = require('../controllers/finderController');

router.post('/getFilterMessage', finderCtrller.getFilterMessage);
router.post('/getOneMessage/:id', dashboardCtrller.getOneMessage);

module.exports = router;