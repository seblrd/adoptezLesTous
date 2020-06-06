var express = require('express');
var router = express.Router();
const finderCtrller = require('../controllers/finderController');

router.post('/getFilterMessage', finderCtrller.getFilterMessage);

module.exports = router;