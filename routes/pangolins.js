var express = require('express');
var router = express.Router();
var pangolinsController = require('../controllers/PangolinsController');

router.get('/', pangolinsController.getAll);
router.get('/:id', pangolinsController.getById);
router.put('/update', pangolinsController.update);
router.get('/addToList/:id/:idPang', pangolinsController.addToList);
router.get('/addPangolinToList/:id/:idPang', pangolinsController.addToList);
router.post('/removeFromList/:id/:idFriend', pangolinsController.removeFromList);

router.get('/getAllUnknownPangolin/:id', pangolinsController.getAllUnknownPangolin);

module.exports = router;
