var express = require('express');
var router = express.Router();
var authController = require('../controllers/AuthenticationController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', authController.login);
router.post('/register', authController.register);
module.exports = router;
