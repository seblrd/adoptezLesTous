var express = require('express');
var router = express.Router();
const dashboardCtrller = require('../controllers/dashboardController');
const multer = require("../middleware/multer-config")

router.post('/postMessage', multer, dashboardCtrller.postMessage);
router.post('/getMessage', dashboardCtrller.getMessage);
router.post('/getOneMessage/:id', dashboardCtrller.getOneMessage);
router.put('/editOneMessage/:id', multer, dashboardCtrller.editOneMessage);
router.delete('/deleteOneMessage/:id', dashboardCtrller.deleteOneMessage);

module.exports = router;