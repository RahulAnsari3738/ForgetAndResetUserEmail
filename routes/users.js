var express = require('express');
var router = express.Router();
const userController =require('../controller/user.Controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',userController.register)
router.post('/login',userController.login)

module.exports = router;
