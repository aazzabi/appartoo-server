var pangolins = require('../models/Pangolin');
var mongoose = require('mongoose');

var getAll = (req, res, next) => {
    pangolins.find()
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

var getById = (req, res, next) => {
    pangolins.findOne({'_id': req.params.id}).populate('pangolins', {
        'name': 1,
        'pseudo': 1,
        'weight': 1,
        'breed': 1
    })
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};
var addToList = async (req, res, next) => {
    const friend = await pangolins.findOne({'_id': req.params.idFriend});
    pangolins.updateOne({'_id': req.params.id}, {"$push": {"pangolins": friend}})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json({
                status: 202,
                message: 'Friend Added Succesfully'
            });
        })
        .catch(error => {
            res.set('Content-Type', 'application/json');
            res.status(500).send({
                status: 500,
                message: 'Error'
            });
        });
};

module.exports = {
    getAll,
    getById,
    addToList,
};
