var mongoose = require('mongoose');

var pangolinSchema = mongoose.Schema(
    {
        name: {type: String, unique: false, required: true, text: true},
        pseudo: {type: String, unique: true, required: true, index: true, text: true},
        password: {type: String, unique: false, required: true, text: true},
        breed: {type: String, unique: false, text: true},
        address: {type: String, unique: false, text: true},
        phone: {type: String, unique: false, text: true},
        pangolins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pangolin', required: false }],
        weight: {type: Number, required: true},
    });
var pangolin = mongoose.model('Pangolin', pangolinSchema);
module.exports = pangolin;
