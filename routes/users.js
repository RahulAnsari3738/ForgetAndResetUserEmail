var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
const userController =require('../controller/user.Controller')
const authorization =require ('../middleware/tokenVerify')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',userController.register)
router.post('/login',userController.login)
router.put('/update',authorization,userController.update)
router.post('/forget',authorization,userController.forget)
router.post('/reset',authorization,userController.reset)

module.exports = router;
