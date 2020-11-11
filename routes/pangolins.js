var express = require('express');
var router = express.Router();
var pangolinsController = require('../controllers/PangolinsController');

router.get('/', pangolinsController.getAll);
router.get('/:id', pangolinsController.getById);
router.get('/addToList/:id/:idFriend', pangolinsController.addToList);

module.exports = router;
