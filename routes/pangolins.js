var express = require('express');
var router = express.Router();
var pangolinsController = require('../controllers/PangolinsController');

router.get('/', pangolinsController.getAll);
router.get('/:id', pangolinsController.getById);
router.post('/addToList/:id/:idFriend', pangolinsController.addToList);
router.post('/removeFromList/:id/:idFriend', pangolinsController.removeFromList);

module.exports = router;
