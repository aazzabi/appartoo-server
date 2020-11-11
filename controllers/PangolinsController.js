var pangolins = require('../models/Pangolin');
var mongoose = require('mongoose');

var getAll =  (req, res, next) => {
    pangolins.find()
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};
var getById =  (req, res, next) => {
    pangolins.findOne({'_id': req.params.id})
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

module.exports = {
    getAll,
    getById,
};
