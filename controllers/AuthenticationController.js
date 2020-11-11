var pangolins = require('../models/Pangolin');
var mongoose = require('mongoose');
const {check, validationResult} = require("express-validator/check");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var login = async (req, res) => {
    //Check errors in  the body
    const errors = validationResult(req);
    //Bad Request
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {pseudo, password} = req.body;
    try {
        // See if pangolin exists
        let pangolin = await pangolins.findOne({pseudo});
        if (!pangolin) {
            return res.status(400).json({
                status: 400,
                error: "Invalid credentials"
            })
        };
        //See if password matches
        const isMatch = await bcrypt.compare(password, pangolin.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 404,
                error: "Invalid credentials"
            });
        }

        // Return Json WebToken
        const payload = {
            pangolin: {
                id: pangolin.id,
                name: pangolin.name,
                pseudo: pangolin.pseudo,
                breed: pangolin.breed,
                weight: pangolin.weight
            }
        }; //l'emport
        jwt.sign(
            payload,
            config.authentification.secret,
            {expiresIn: 360000},
            (err, token) => {
                if (err) throw err;
                res.json({token,});
            }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).send("server Error");
    }
};

register = async (req, res) => {
    const errors = validationResult(req);
    //Bad Request
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {name, pseudo, password, weight, breed} = req.body;

    try {
        // See if pangolin exists
        let pangolin = await pangolins.findOne({pseudo});
        if (pangolin) {
            return res.status(400).json({
                status: 404,
                error: "Pangolin already exists"
            });
        }
        pangolin = new pangolins({
            name,
            pseudo,
            password,
            weight,
            breed
        });

        // Encrypt Password
        const salt = await bcrypt.genSalt(10); //the more you have , the more secure but the more slower
        pangolin.password = await bcrypt.hash(password, salt);

        // Save pangolin
        await pangolin.save();

        // Return Json WebToken
        const payload = {
            pangolin: {
                name: pangolin.name,
                pseudo: pangolin.pseudo,
                breed: pangolin.breed,
                weight: pangolin.weight
            }
        };
        jwt.sign(
            payload,
            config.authentification.secret,
            {
                expiresIn: 360000
            },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token
                });
            }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 500,
            error: "Server Error"
        });
    }
};

module.exports = {
    login,
    register,
};
