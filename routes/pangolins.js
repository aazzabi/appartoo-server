var express = require('express');
var router = express.Router();
var pangolinsController = require('../controllers/PangolinsController');
const { check, validationResult } = require("express-validator/check");

router.get('/', pangolinsController.getAll);
router.get('/:id',
    [
        check("email", "Please enter a valid Email").isEmail(),
        check("password", "Password is required").exists()
    ], pangolinsController.getById);

module.exports = router;
