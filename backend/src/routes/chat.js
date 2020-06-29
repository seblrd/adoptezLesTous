var express = require('express');
var router = express.Router();
const chatCtrller = require('../controllers/chatController');
const multer = require("../middleware/multer-config")

router.post('/postChat', chatCtrller.postChat);
router.post('/getChat', chatCtrller.getChat);
router.post('/getOneChat/:id', chatCtrller.getOneChat);

module.exports = router;