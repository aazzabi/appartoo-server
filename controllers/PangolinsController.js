var pangolins = require('../models/Pangolin');
var mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

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
        'breed': 1,
        'address': 1,
        'phone': 1
    })
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

var update = async (req, res, next) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10); //the more you have , the more secure but the more slower
            const updated = {
                name: req.body.name,
                pseudo: req.body.pseudo,
                breed: req.body.breed,
                phone: req.body.phone,
                address: req.body.address,
                weight: req.body.weight,
                password: await bcrypt.hash(req.body.password, salt),
            };
            console.log(req.body, 'BODY1')
            await pangolins.updateOne({_id: req.body._id}, updated);
        } else {
            const updated = {
                name: req.body.name,
                pseudo: req.body.pseudo,
                phone: req.body.phone,
                address: req.body.address,
                breed: req.body.breed,
                weight: req.body.weight,
            };
            console.log(req.body, 'BODY2')
            await pangolins.updateOne({_id: req.body._id}, updated);
        }
        pangolins.find({_id: req.body._id}).then((data) => {
            return res.json(data);
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
};

var addToList = async (req, res, next) => {
    console.log(req.params.idPang);
    const friend = await pangolins.findOne({'_id': req.params.idPang});
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
var removeFromList = async (req, res, next) => {
    const friend = await pangolins.findOne({'_id': req.params.idFriend});
    pangolins.updateOne({'_id': req.params.id}, {"$pull": {"pangolins": friend._id}})
        .then((data) => {
            res.set('Content-Type', 'application/json');
            res.status(202).json({
                status: 202,
                message: 'Friend removed Succesfully'
            });
        })
        .catch(error => {
            res.set('Content-Type', 'application/json');
            console.log(error);
            res.status(500).send({
                status: 500,
                message: 'Error'
            });
        });
};

var getAllUnknownPangolin = async (req, res, next) => {
    var p = await pangolins.findOne({'_id': req.params.id});
    console.log(p.pangolins);
    var list = new Array();
    list = p.pangolins;
    list.push(p);
    pangolins.find({'_id': {'$nin': list}}).then((data) => {
        res.set('Content-Type', 'application/json');
        res.status(202).json(data);
    })
        .catch(error => {
            res.set('Content-Type', 'application/json');
            console.log(error);
            res.status(500).send({
                status: 500,
                message: 'Error'
            });
        });
};
module.exports = {
    getAll,
    getById,
    update,
    addToList,
    removeFromList,
    getAllUnknownPangolin,
};
